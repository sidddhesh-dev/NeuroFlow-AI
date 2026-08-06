from apps.workspace.models import (ChatSession,Document,Note)
from django.shortcuts import get_object_or_404


class HistoryService:

    @staticmethod
    def get_history(user):
        history = []
        chats = ChatSession.objects.filter(user=user)
        for chat in chats:
            history.append({
                "id": chat.id,
                "target_id": chat.id,
                "type": "chat",
                "title": chat.title or "Untitled Chat",
                "created_at": chat.created_at,
                "updated_at": chat.updated_at})
            
        documents = Document.objects.filter(user=user)
        for document in documents:
            history.append({
                "id": document.id,
                "target_id": document.id,
                "type": "document",
                "title": document.file.name.split("/")[-1],
                "created_at": document.uploaded_at,
                "updated_at": document.uploaded_at})
            
        notes = Note.objects.filter(user=user)
        for note in notes:
            history.append({
                "id": note.id,
                "target_id": note.id,
                "type": "note",
                "title": note.title or "Untitled Note",
                "created_at": note.created_at,
                "updated_at": note.updated_at,})
        history.sort(key=lambda item: item["updated_at"],reverse=True)
        return history

    @staticmethod
    def delete_history_item(user, item_type, target_id):

        if item_type == "chat":
            chat = get_object_or_404( ChatSession, id=target_id,
                user=user)
            chat.delete()
            return
        if item_type == "document":
            document = get_object_or_404( Document, id=target_id,user=user)
            document.delete()
            return
        if item_type == "note":
            note = get_object_or_404(Note, id=target_id, user=user)
            note.delete()
            return
        raise ValueError("Invalid history type.")