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
    def generate_answer(prompt):
        ...

        