from apps.workspace.models import ChatSession,ChatHistory


class ChatService:
    @staticmethod
    def create_session(user,document):
        session=ChatSession.objects.create(
            user=user,
            document=document
        )
        return session
    
    @staticmethod
    def save_messages(session,role,content):
        message=ChatHistory.objects.create(
            session=session,
            role=role,
            content=content
        )
        return message
    
    @staticmethod
    def get_chat_history(session):
        messages=ChatHistory.objects.filter(session=session).order_by('-created_at')[:10]
        messages=reversed(messages)
        return messages
    
    @staticmethod
    def get_or_cteate_session(user,document):
        session,created=ChatSession.objects.get_or_create(
            user=user,
            document=document
        )
        return session