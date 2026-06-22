from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from .models import Note,Document,DocumentChunk
from rest_framework import status
from apps.workspace.serializers import NoteSerializer,NoteListSerializer,DocumentSerializer,DocumentRetriveSerializer,QuerySerializer
from apps.workspace.permissions import IsOwner
from django.db.models import Q
from apps.workspace.services.document_processor import DocumentProcessor 
from apps.workspace.services.chunk_service import ChunkService
from apps.workspace.services.ai_service import AiService
from apps.workspace.services.embedding_service import EmbeddingService
from apps.workspace.services.chromadb_service import VectorStoreService
import hashlib




class NoteCreateApiView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        notes=Note.objects.filter(user=request.user).order_by('-uploaded_at')
        search=request.GET.get('search')
        if search:
            notes=notes.filter(
                Q(title__icontains=search) |
                Q(content__icontains=search)
            )
        serializer=NoteListSerializer(notes,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=NoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class NoteDetailApiView(APIView):
    permission_classes=[IsAuthenticated,IsOwner]

    def get(self,request,id):
        note=get_object_or_404(Note,id=id)
        self.check_object_permissions(request,note)
        serializer=NoteSerializer(note)
        return Response(serializer.data)

    def put(self,request,id):
        note=get_object_or_404(Note,id=id)
        self.check_object_permissions(request,note)
        serializer=NoteSerializer(note,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        note=get_object_or_404(Note,id=id)
        self.check_object_permissions(request,note)
        note.delete()
        return Response({"message":"Note deleted successfully"},status=status.HTTP_200_OK)
    

class DocumentCreateView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        document=Document.objects.filter(user=request.user).order_by('-uploaded_at')
        serializer=DocumentSerializer(document,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=DocumentSerializer(data=request.data)
        
        if serializer.is_valid():
            document=serializer.save(user=request.user)
            document.status="processing"
            document.save()
        
            try:
                text = DocumentProcessor.extract_text(document)
                if text:
                    content_hash = hashlib.sha256(text.encode("utf-8")).hexdigest()
                    existing_document = Document.objects.filter(user=request.user,content_hash=content_hash).exclude(id=document.id).exists()
                    if existing_document:
                        document.delete()
                        return Response(
                            {"message": "Document already uploaded."},
                        status=status.HTTP_400_BAD_REQUEST)
                    document.content_hash = content_hash
                    document.extracted_data = text
                    chunks=ChunkService.create_chunks(text)
                    for index, chunk in enumerate(chunks):
                        DocumentChunk.objects.create(document=document,chunk_text=chunk,chunk_id=index)
                    embeddings = EmbeddingService.generate_embeddings(chunks)
                    VectorStoreService.add_chunks(document,chunks,embeddings)
                    document.status = 'ready'

                else:
                    document.status = 'not_supported'
            
            except Exception as e:
                print("EXTRACTION ERROR:", e)
                document.status = 'failed'

            document.save()
            
            return Response({"message":"file uploaded successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DocumentDetailView(APIView):
    permission_classes=[IsAuthenticated,IsOwner]

    def get(self,request,id):
        document=get_object_or_404(Document,id=id)
        self.check_object_permissions(request,document)
        serializer=DocumentRetriveSerializer(document)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def put(self,request,id):
        document=get_object_or_404(Document,id=id)
        self.check_object_permissions(request,document)
        serializer=DocumentSerializer(document,data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        document=get_object_or_404(Document,id=id)
        self.check_object_permissions(request,document)
        VectorStoreService.delete_vector(document)
        document.delete()
        return Response({"message":"Document removed successfully"},status=status.HTTP_200_OK)
    
class DocumentAskQuestionView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,id):
        document=get_object_or_404(Document,id=id)
        self.check_object_permissions(request,document)
        serializer=QuerySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        question=serializer.validated_data["question"]
        answer=AiService.generate_answer(question,request.user,document)
        return Response({"answer":answer},status=status.HTTP_200_OK)


    


    



    

        
    


