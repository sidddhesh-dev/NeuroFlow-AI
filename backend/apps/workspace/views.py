from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Note,Document
from rest_framework import status
from apps.workspace.serializers import (NoteSerializer,NoteListSerializer,DocumentSerializer,
                                        DocumentRetriveSerializer,QuerySerializer,ChatSessionSerializer,
                                        SearchChatSerializer,SearchDocumentSerializer,SearchNoteSerializer,
                                        HistorySerializer)
from apps.workspace.permissions import IsOwner
from django.db.models import Q
from apps.workspace.services.ai_service import AiService
from apps.workspace.services.chromadb_service import VectorStoreService
from apps.workspace.tasks import process_document
from apps.workspace.services.chat_service import ChatService
from apps.workspace.models import ChatSession
from apps.workspace.services.search_service import SearchService
from apps.workspace.services.history_service import HistoryService



class NoteCreateApiView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        notes=Note.objects.filter(user=request.user).order_by('-created_at')
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
    
    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():

            document = serializer.save(user=request.user)

            document.status = "processing"
            document.save(update_fields=["status"])

            process_document.delay(document.id)

            return Response(
                {"message": f"File {document.file.name} uploaded successfully. Processing started."},
                status=status.HTTP_201_CREATED
            )

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
        document.file.delete(save=False)
        document.delete()
        return Response({"message":f"Document '{document.file.name}' (ID: {id}) removed successfully."},status=status.HTTP_200_OK)
    
class DocumentAskQuestionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        document = get_object_or_404(Document,id=id)
        self.check_object_permissions(request,document)
        serializer = QuerySerializer( data=request.data)
        serializer.is_valid(raise_exception=True)
        question = serializer.validated_data["question"]
        session_id = serializer.validated_data["session_id"]
        answer = AiService.generate_answer( question=question, user=request.user,document=document, session_id=session_id)
        return Response({ "answer": answer},status=status.HTTP_200_OK)

class ChatSessionCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        session = ChatService.create_session( user=request.user, document=None,)
        serializer = ChatSessionSerializer(session)
        return Response( serializer.data, status=status.HTTP_201_CREATED)


class ChatSessionListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        sessions = ChatSession.objects.filter( user=request.user).order_by("-is_pinned","-created_at")
        serializer = ChatSessionSerializer(sessions, many=True)
        return Response( serializer.data, status=status.HTTP_200_OK)


class ChatSessionDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        session = get_object_or_404(ChatSession, id=id, user=request.user)
        serializer = ChatSessionSerializer(session)
        return Response( serializer.data,status=status.HTTP_200_OK)

    def delete(self, request, id):
        session = get_object_or_404(ChatSession,id=id,user=request.user)
        session.delete()
        return Response({ "message": "Chat deleted successfully."},status=status.HTTP_204_NO_CONTENT)

class ChatSessionRenameView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        session = get_object_or_404(ChatSession, id=id, user=request.user)
        title = request.data.get("title")
        if not title:
            return Response( {"title": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
        session.title = title
        session.save(update_fields=["title", "updated_at"])
        serializer = ChatSessionSerializer(session)
        return Response(serializer.data,status=status.HTTP_200_OK)


class ChatSessionPinView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        session = get_object_or_404(ChatSession, id=id, user=request.user)
        session.is_pinned = True
        session.save( update_fields=[ "is_pinned","updated_at"])
        serializer = ChatSessionSerializer(session)
        return Response( serializer.data, status=status.HTTP_200_OK)


class ChatSessionUnpinView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        session = get_object_or_404(ChatSession, id=id, user=request.user, )
        session.is_pinned = False
        session.save( update_fields=["is_pinned","updated_at"])
        serializer = ChatSessionSerializer(session)
        return Response( serializer.data, status=status.HTTP_200_OK)

class SearchView(APIView):

    permission_classes = [IsAuthenticated]
    def get(self, request):
        query = request.query_params.get("q", "").strip()
        if not query:
            return Response( {"chats": [], "documents": [], "notes": []},status=status.HTTP_200_OK,)
        results = SearchService.search( request.user, query)
        return Response(
            {"chats": SearchChatSerializer( results["chats"], many=True).data,
            "documents": SearchDocumentSerializer( results["documents"], many=True).data,
            "notes": SearchNoteSerializer(results["notes"],many=True).data,
            },status=status.HTTP_200_OK )

class HistoryView(APIView):

    permission_classes = [IsAuthenticated]
    def get(self, request):
        history = HistoryService.get_history(request.user)
        serializer = HistorySerializer(history,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def delete(self, request):
        item_type = request.data.get("type")
        target_id = request.data.get("target_id")
        if not item_type or not target_id:
            return Response(
                { "detail": "type and target_id are required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            HistoryService.delete_history_item(request.user,item_type,target_id)
        except ValueError as error:
            return Response({ "detail": str(error),}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "History item deleted successfully.",},status=status.HTTP_200_OK)