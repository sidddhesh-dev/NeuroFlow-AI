import string
class QueryEngine:

    STOP_WORDS = {"what","is","are","the","a","an","was","were","tell","me","about"}
    @staticmethod
    def answer_question(document, question):
        text = document.extracted_data
        if not text:
            return "Extracted Data Not Found"
        sentences = text.split('.')
        question_words = []
        for word in question.lower().split():
            cleaned_word = word.strip(string.punctuation)
            if (
                cleaned_word
                and cleaned_word not in QueryEngine.STOP_WORDS
            ):
                question_words.append(cleaned_word)
        print("Question Words:", question_words)

        for sentence in sentences:
            print("Checking Sentence:", sentence)

            sentence_lower = sentence.lower()

            for word in question_words:
                print("Checking Word:", word)

                if word in sentence_lower:
                    print("MATCH FOUND")
                    return sentence.strip()
        return "No relevant information found."