from django.db import models
from django.contrib.auth.models import User
import os

class Note(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=300)

    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class Document(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    STATUS_CHOICES = (
    ('uploaded', 'Uploaded'),
    ('processing', 'Processing'),
    ('ready', 'Ready'),
    ('failed', 'Failed'),
    ('not_supported','Not_Supported')
    )
    file=models.FileField(upload_to='documents/')
    uploaded_at=models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='uploaded')
    extracted_data=models.TextField(null=True,blank=True)
    content_hash = models.CharField(max_length=64,unique=False,null=True,blank=True)

    def delete(self, *args, **kwargs):
        if self.file and os.path.isfile(self.file.path):
            os.remove(self.file.path)
        super().delete(*args, **kwargs)
    
    def __str__(self):
        return self.file.name
    
class DocumentChunk(models.Model):
    document=models.ForeignKey(Document,on_delete=models.CASCADE,related_name='chunks')
    chunk_text=models.TextField()
    chunk_id=models.IntegerField()
    created_at=models.DateTimeField(auto_now_add=True)

    embeddings=models.BooleanField(default=False)

    def __str__(self):
        return f" {self.document.id} - chunk {self.chunk_id}"
    
class ChatSession(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    document = models.ForeignKey(Document,on_delete=models.CASCADE,null=True,blank=True)
    title = models.CharField(max_length=120,blank=True, default="")
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)
    is_pinned = models.BooleanField(default=False)

    def __str__(self):
        return self.title if self.title else f"Chat {self.id}"

class ChatHistory(models.Model):
    ROLE_CHOICES=[("user","User"),("assistant","Assistant")]
    session=models.ForeignKey(ChatSession ,on_delete=models.CASCADE)
    role=models.CharField(max_length=20,choices=ROLE_CHOICES)
    content=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)

class ChatSummary(models.Model):
    session=models.ForeignKey(ChatSession,on_delete=models.CASCADE)
    summary=models.TextField()
    updated_at=models.DateTimeField(auto_now_add=True)

class UserSettings(models.Model):

    LANDING_PAGE_CHOICES = [
        ("chat", "Chat"),
        ("documents", "Documents"),
        ("notes", "Notes"),
        ("history", "History"),
    ]
    user = models.OneToOneField( User,on_delete=models.CASCADE,related_name="settings")
    landing_page = models.CharField(max_length=20,choices=LANDING_PAGE_CHOICES,default="chat")
    confirm_before_delete = models.BooleanField(default=True)
    animations = models.BooleanField(default=True)
    conversation_memory = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username
