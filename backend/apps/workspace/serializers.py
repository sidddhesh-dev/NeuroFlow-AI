from rest_framework import serializers
from apps.workspace.models import Note,Document


class NoteListSerializer(serializers.ModelSerializer):
    class Meta:
    
        model=Note
        fields=['id','title','preview']




class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=['id','title','content']


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Document
        fields=['id','file','uploaded_at']



