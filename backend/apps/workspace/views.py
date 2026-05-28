from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Note,Document
from rest_framework import status
from apps.workspace.serializers import NoteSerializer,NoteListSerializer,DocumentSerializer
from apps.workspace.permissions import IsOwner
from django.db.models import Q


class NoteCreateApiView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        notes=Note.objects.filter(user=request.user).order_by('-id')
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
        document=Document.objects.filter(user=request.user).order_by('-id')
        serializer=DocumentSerializer(document,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=DocumentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DocumentDetailView(APIView):
    permission_classes=[IsAuthenticated,IsOwner]

    def get(self,request,id):
        document=get_object_or_404(Document,id=id)
        self.check_object_permissions(request,document)
        serializer=DocumentSerializer(document)
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
        document.delete()
        return Response({"message":"Document removed successfully"},status=status.HTTP_200_OK)
    


    



    

        
    


