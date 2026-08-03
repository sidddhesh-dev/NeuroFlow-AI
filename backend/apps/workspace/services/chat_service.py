from django.shortcuts import get_object_or_404

from apps.workspace.models import ChatSession, ChatHistory


class ChatService:

    @staticmethod
    def create_session(user, document=None):
        return ChatSession.objects.create( user=user, document=document,)

    @staticmethod
    def get_session(user, session_id):
        return get_object_or_404( ChatSession, id=session_id, user=user,)

    @staticmethod
    def attach_document(session, document):
        if session.document is None:
            session.document = document
            session.save(update_fields=["document"])
        return session
    
    @staticmethod
    def save_messages(session, role, content):
        return ChatHistory.objects.create(session=session, role=role,content=content,)

    @staticmethod
    def get_chat_history(session):
        messages = (ChatHistory.objects.filter(session=session).order_by("-created_at")[:10])
        messages = reversed(messages)
        history = []
        for message in messages:
            history.append(f"{message.role}: {message.content}")
        return "\n".join(history)