class QueryEngine:
    @staticmethod
    def answer_question(document,question):
        text=document.extracted_data
        if not text:
            return "Extracted Data Not Found"
        return text
    