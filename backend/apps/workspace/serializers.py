from rest_framework import serializers
from apps.workspace.models import Note,Document,ChatSession,ChatHistory


class NoteListSerializer(serializers.ModelSerializer):

    preview = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = [
            "id",
            "title",
            "preview",
            "created_at",
        ]

    def get_preview(self, obj):
        return obj.content[:80]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=['id','title','content','created_at']

    

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
    question = serializers.CharField()
    session_id = serializers.IntegerField()
    def validate_question(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError( "Question cannot be empty")
        return value
    
class AnswerSerializer(serializers.Serializer):
    question =serializers.CharField()
    answer=serializers.CharField()
    source_document=serializers.CharField()



class ChatHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ChatHistory
        fields = ["id","role","content","created_at"]

class ChatSessionSerializer(serializers.ModelSerializer):

    document_name = serializers.SerializerMethodField()
    messages = ChatHistorySerializer( source="chathistory_set", many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = [
            "id","title","document","document_name","created_at","updated_at","messages","is_pinned"]

    def get_document_name(self, obj):
        if obj.document:
            return obj.document.file.name.split("/")[-1]
        return None

class SearchChatSerializer(serializers.ModelSerializer):

    document_name = serializers.SerializerMethodField()
    class Meta:
        model = ChatSession
        fields = [ "id", "title", "is_pinned", "updated_at", "document_name",]

    def get_document_name(self, obj):

        if obj.document:
            return obj.document.file.name.split("/")[-1]
        return None


class SearchDocumentSerializer(serializers.ModelSerializer):

    file_name = serializers.SerializerMethodField()
    class Meta:
        model = Document
        fields = [ "id", "file_name", "status", "uploaded_at"]

    def get_file_name(self, obj):
        return obj.file.name.split("/")[-1]


class SearchNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [ "id", "title", "updated_at"]


class HistorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    target_id = serializers.IntegerField()
    type = serializers.CharField()
    title = serializers.CharField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()