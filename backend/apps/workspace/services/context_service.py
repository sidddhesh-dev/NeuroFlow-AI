from apps.workspace.services.retrival_service import RetrivalService
from apps.workspace.models import Document


class ContextService:
    @staticmethod
    def context_builder(question,retrived_context,chat_history=None,workspace_context=None):
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