from rest_framework import serializers
from apps.workspace.models import Note


class NoteListSerializer(serializers.ModelSerializer):
    class Meta:
    
        model=Note
        fields=['id','title','preview']




class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=['id','title','content']

