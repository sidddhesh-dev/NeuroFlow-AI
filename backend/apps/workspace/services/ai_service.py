import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

class AiService:
    @staticmethod
    def build_prompt(question,context):
        prompt = f"""You are NeuroFlow AI.
                Use the provided context as your primary source of information.
                If the answer exists in the context, answer using the context.
                If the answer is not present in the context, clearly mention that the information was not found in the document and
                then provide a brief answer using your general knowledge.
                
                Context:
                {context}
                
                Question:
                {question}
                
                Answer:
                """
        return prompt
    
    @staticmethod
    def get_client():
        api_key=os.getenv("GEMINI_API_KEY")
        client=genai.Client(api_key=api_key)
        return client
    
    @staticmethod
    def generate_answer(question,context):
        prompt=AiService.build_prompt(question,context)
        client=AiService.get_client()
        response=client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt )
        return response.text


        