import os
from google import genai
from dotenv import load_dotenv
from apps.workspace.services.retrival_service import RetrivalService
from apps.workspace.services.context_service import ContextService
from apps.workspace.services.chat_service import ChatService


load_dotenv()

class AiService:
    @staticmethod
    def build_prompt(question,context):
        prompt = f"""You are NeuroFlow AI, an intelligent document analysis and question-answering assistant.

            Your primary objective is to provide accurate, grounded, and useful answers based on the supplied context.

            INSTRUCTIONS:

            CONTEXT PRIORITY
            Treat the provided document context as the primary source of truth.
            Carefully analyze all provided context before answering.
            Combine information from multiple context sections when necessary.
            Do not ignore relevant information simply because it appears in different chunks.
            ANSWER QUALITY
            Provide complete and precise answers.
            Explain concepts clearly and naturally.
            When appropriate, include key details, examples, comparisons, and important observations.
            Avoid overly short answers when the context contains sufficient information.
            MULTI-CHUNK REASONING
            Information may be distributed across multiple retrieved chunks.
            Synthesize related information into a single coherent answer.
            Connect concepts when they belong to the same topic.
            HALLUCINATION CONTROL
            Never invent facts that are not supported by the provided context.
            If the answer is partially available in the context, clearly separate:
            Information found in the document.
            General knowledge used to supplement the answer.
            If the answer cannot be found in the context, explicitly state:
            "The requested information was not found in the provided document."
            QUESTION UNDERSTANDING
            Understand the intent behind the user's question.
            Answer the meaning of the question, not only exact keyword matches.
            Consider synonyms and related terminology.
            RESPONSE FORMAT
            Start with the direct answer.
            Then provide supporting explanation.
            Use bullet points when they improve readability.
            Use comparisons and summaries when useful.
            CHAT HISTORY USAGE
            Use chat history when provided.
            Resolve references such as:
            "it"
            "that concept"
            "the previous topic"
            Maintain conversational continuity.
            DOCUMENT GROUNDING
            Prefer document information over general knowledge.
            When document information exists, prioritize it.
            General knowledge should only supplement missing information.
            CONFIDENCE BEHAVIOR
            High confidence: answer directly.
            Medium confidence: answer and mention limitations.
            Low confidence: clearly state that the information is not available in the provided context.
            GOAL
            Your goal is to provide the most accurate, context-aware, grounded, and helpful answer possible while remaining faithful to the supplied document.
            DOCUMENT CONTEXT:
            {context}

            USER QUESTION:
            {question}
            answer :
            """
        return prompt
    
    @staticmethod
    def get_client():
        api_key=os.getenv("GEMINI_API_KEY")
        client=genai.Client(api_key=api_key)
        return client
    
    @staticmethod
    def generate_answer(question,user,document):
        retrived_context=RetrivalService.retrive_context(question,document)
        session=ChatService.get_chat_history(user,document)
        chat_hostory=ChatService.get_chat_history(session)
        context=ContextService.context_builder(question=question,retrived_context=retrived_context,chat_history=chat_hostory)

        prompt=AiService.build_prompt(question,context)
        client=AiService.get_client()
        try:
            response=client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt )
            return response.text
        except Exception as e:
            print(e)
            error = str(e)
            if "429" in error:
                return "Daily AI quota exceeded. Please try again tomorrow."

            if "503" in error:
                return "AI model is currently overloaded. Please try again in a few minutes."

            return "AI service temporarily unavailable."
        
            


        