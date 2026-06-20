from apps.workspace.models import *
from apps.workspace.services.llm_service import LLMService

class SummaryService:
    @staticmethod
    def create_summary(session):
        summary,created=ChatSummary.objects.get_or_create(session=session)
        return summary
    
    @staticmethod
    def generate_summary(old_summary, recent_messages):
        prompt = f"""
    Current summary:
    {old_summary}
    Recent conversation:
    {recent_messages}
    Update the summary.
    Preserve:
    - Important topics discussed
    - Key conclusions
    - User preferences and context
    Keep the summary concise.
    """
        summary = LLMService.generate(prompt)

        return summary
    
    @staticmethod
    def update_summary(session,summary_text):
        summary=SummaryService.create_summary(session)
        summary.summary=summary_text
        summary.save()
        return summary
    
    
    
    
    
        