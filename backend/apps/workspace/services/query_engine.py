class QueryEngine:
    @staticmethod
    def answer_question(document,question):
        text=document.extracted_data
        if not text:
            return "Extracted Data Not Found"
        sentences=text.split('.')
        question_word=question.lower().split()
        for sentence in sentences:
            sentence_lower=sentence.lower()
            for word in question_word:
                if word in sentence_lower:
                    return sentence.strip()
            
            

    