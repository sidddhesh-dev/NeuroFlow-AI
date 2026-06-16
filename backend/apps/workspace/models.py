from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):

    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=300)
    content=models.TextField()

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
    # title=models.CharField(max_length=200)
    file=models.FileField(upload_to='documents/')
    uploaded_at=models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='uploaded')
    extracted_data=models.TextField(null=True,blank=True)
    
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
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    document=models.ForeignKey(Document,on_delete=models.CASCADE)
    create_at=models.DateTimeField(auto_now_add=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "document"],
                name="unique_user_document_session"
            )
        ]

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


