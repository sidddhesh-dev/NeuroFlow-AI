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
    filename = serializers.SerializerMethodField()
    class Meta:
        
        model=Document
        fields=['id','filename','uploaded_at']

    def get_filename(self, obj):
        return obj.file.name.split('/')[-1]

class DocumentRetriveSerializer(serializers.ModelSerializer):
    filename=serializers.SerializerMethodField()
    class Meta:
        model=Document
        fields=['id','filename','file','uploaded_at']

    def get_filename(self, obj):

        return obj.file.name.split('/')[-1]



