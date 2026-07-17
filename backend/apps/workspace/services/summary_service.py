from apps.workspace.models import ChatSummary,ChatHistory
from apps.workspace.services.llm_service import LLMService

class SummaryService:
    @staticmethod
    def get_or_create_summary(session):
        summary,created=ChatSummary.objects.get_or_create(session=session)
        return summary

    @staticmethod
    def generate_summary(old_summary, recent_messages):
        prompt = f"""
        You are updating an existing conversation summary.
        Current Summary:
        {old_summary}
        Recent Messages:
        {recent_messages}
        Requirements:
        - Preserve important facts.
        - Preserve user goals.
        - Preserve unresolved questions.
        - Remove repetition.
        - Keep the summary under 300 words.
    """
        summary = LLMService.generate(prompt)

        return summary
    
    @staticmethod
    def update_summary(session,summary_text):
        summary=SummaryService.get_or_create_summary(session)
        summary.summary=summary_text
        summary.save()
        return summary
    
    @staticmethod
    def should_update_summary(session):
        message_count = ChatHistory.objects.filter(
            session=session
        ).count()

        return message_count % 10 == 0

        