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
    filetype=serializers.SerializerMethodField()
    filesize=serializers.SerializerMethodField()
    class Meta:
        
        model=Document
        fields=['id','filename','filetype','filesize','uploaded_at','status']

    def get_filename(self, obj):
        return obj.file.name.split('/')[-1]
    
    def get_filetype(self,obj):
        return obj.file.name.split('.')[-1]
    
    def get_filesize(self,obj):
        return obj.file.size
    
    def validate_file(self, value):
        unexcutable_files=['exe', 'dll','bat','msi','scr']
        extensions=value.file.name.split('.')[-1] 
        if extensions in unexcutable_files:
            raise serializers.ValidationError('file type not allowed')
        
        max_size=100*1024*1024
        if value.size>max_size:
            return serializers.ValidationError("file size exceeds 100 mb file size")
        
        return value



class DocumentRetriveSerializer(serializers.ModelSerializer):
    filename=serializers.SerializerMethodField()
    filetype=serializers.SerializerMethodField()
    filesize=serializers.SerializerMethodField()
    class Meta:
        model=Document
        fields=['id','filename','file','filetype','filesize','uploaded_at','status']

    def get_filename(self, obj):

        return obj.file.name.split('/')[-1]
    
    def get_filetype(self,obj):
        return obj.file.name.split('.')[-1]
    
    def get_filesize(self,obj):
        return obj.file.size



