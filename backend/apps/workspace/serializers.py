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
        fields=['id','filename','file','filetype','filesize','uploaded_at','status']

    def validate_file(self, value):
        if not value:
            raise serializers.ValidationError('Please uploade a file')
            
        unexcutable_files=['exe', 'dll','bat','msi','scr']
        extensions=value.name.split('.')[-1] 
        if extensions in unexcutable_files:
            raise serializers.ValidationError('file type not allowed')
        
        max_size=100*1024*1024
        if value.size>max_size:
            return serializers.ValidationError("file size exceeds 100 mb")
        
        return value
    
    def get_filename(self, obj):
        return obj.file.name.split('/')[-1]
    
    def get_filetype(self,obj):
        return obj.file.name.split('.')[-1]
    
    def get_filesize(self,obj):
        size = obj.file.size

        if size < 1024:
            return f"{size} B"
    
        elif size < 1024 * 1024:
            return f"{round(size / 1024, 2)} KB"
    
        else:
            return f"{round(size / (1024 * 1024), 2)} MB"


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
        size = obj.file.size
        if size < 1024:
            return f"{size} B"
        elif size < 1024 * 1024:
            return f"{round(size / 1024, 2)} KB"
        else:
            return f"{round(size / (1024 * 1024), 2)} MB"
        
class QuerySerializer(serializers.Serializer):
    question=serializers.CharField()
    def validate_question(self,value):
        value=value.strip()
        if not value:
            raise serializers.ValidationError(
                "Question cannot be empty"
            )
        return value
    
class AnswerSerializer(serializers.Serializer):
    question =serializers.CharField()
    answer=serializers.CharField()
    source_document=serializers.CharField()
    




        



