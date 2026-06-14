import os
from google import genai
from openai import OpenAI
from groq import Groq
from dotenv import load_dotenv
from apps.workspace.services.chat_service import ChatService


class LLMService:
    @staticmethod
    def get_gemini_client():
        api_key=os.getenv("GEMINI_API_KEY")
        client=genai.Client(api_key=api_key)
        return client
    
    @staticmethod
    def get_openAi_client():
        api_key=os.getenv("OPENAI_API_KEY")
        client=OpenAI.Client(api_key=api_key)
        return client

    @staticmethod
    def get_groq_client():
        api_key=os.getenv("GROQ_API_KEY")
        client=Groq.Client(api_key=api_key)
        return client
    
    @staticmethod
    def generate_gemini(prompt):
        client = LLMService.get_gemini_client()
        response=client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt )
        return response.text

        
        
        
    @staticmethod
    def generate_openAI(prompt):
        client=LLMService.get_openAi_client()

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
            {"role": "user", "content": prompt}])
        return response.choices[0].message.content
       
            
    @staticmethod
    def generate_groq(prompt):
        client=LLMService.get_groq_client()
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": prompt}])
        return response.choices[0].message.content
        

    @staticmethod
    def generate(prompt, provider="gemini"):

        try:
            return LLMService.generate_gemini(prompt)

        except Exception as e:
            print("Gemini failed:", e)

        try:
            return LLMService.generate_openai(prompt)

        except Exception as e:
            print("OpenAI failed:", e)

        try:
            return LLMService.generate_groq(prompt)

        except Exception as e:
            print("Groq failed:", e)

        return "AI service temporarily unavailable."
        