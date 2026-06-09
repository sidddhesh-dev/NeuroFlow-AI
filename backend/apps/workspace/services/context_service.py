from apps.workspace.services.retrival_service import RetrivalService
from apps.workspace.services.chat_service import ChatService
from apps.workspace.models import *


class ContextService:
    @staticmethod
    def context_builder(question,retrived_context,chat_history=None,workspace_context=None):
        chat_hostory=ChatService.get_or_cteate_session(user,document)
        
        context = f"""
            WORKSPACE CONTEXT:
            {workspace_context or ""}

            CHAT HISTORY:
            {chat_history or ""}

            DOCUMENT CONTEXT:
            {retrived_context}

            QUESTION:
            {question}
            """

        return context