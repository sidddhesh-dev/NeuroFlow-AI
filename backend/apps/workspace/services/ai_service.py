import os
from google import genai
from dotenv import load_dotenv
import redis
from apps.workspace.services.retrival_service import RetrivalService
from apps.workspace.services.context_service import ContextService
from apps.workspace.services.chat_service import ChatService
from apps.workspace.services.llm_service import LLMService
from apps.workspace.services.summary_service import SummaryService
from apps.workspace.services.cache_keys import generate_cache_key
from apps.workspace.services.redis_service import RedisService





load_dotenv()

class AiService:
    @staticmethod
    def build_prompt(question,context):
        prompt = f"""You are NeuroFlow AI, an intelligent document analysis and question-answering assistant.

            Your primary objective is to provide accurate, grounded, and useful answers based on the supplied context.
            Summarize the following conversation briefly.Preserve important topics and context.

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
    def generate_answer(question, user, document):

        session = ChatService.get_or_create_session(user, document)
        summary = SummaryService.create_summary(session)
        ChatService.save_messages(session, "user", question)
        chat_history = ChatService.get_chat_history(session)
        retrived_context = RetrivalService.retrive_context(
            question,
            document
        )
        context = ContextService.context_builder(
            question=question,
            retrived_context=retrived_context,
            chat_history=chat_history,
            summary=summary.summary
        )
        prompt = AiService.build_prompt(question, context)
        cache_key = generate_cache_key(question)
        cached_answer = RedisService.get(cache_key)
        if cached_answer:
            print("CACHE HIT")
            ChatService.save_messages(
                session,
                "assistant",
                cached_answer
            )
            return cached_answer
        print("CACHE MISS")
        answer = LLMService.generate(prompt)
        RedisService.set(
            cache_key,
            answer,
            timeout=86400
        )
        ChatService.save_messages(
            session,
            "assistant",
            answer
        )
        recent_messages = ChatService.get_chat_history(session)
        summary_text = SummaryService.generate_summary(
            old_summary=summary.summary,
            recent_messages=recent_messages
        )
        SummaryService.update_summary(
            session,
            summary_text
        )
        return answer
        
        
            


        