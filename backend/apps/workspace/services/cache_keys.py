import hashlib


def generate_cache_key(question) :
    question_hash = hashlib.sha256(
        question.strip().lower().encode()
    ).hexdigest()

    return f"llm:{question_hash}"

def generate_embedding_cache_key(text):
    embedding_hash=hashlib.sha256(text.strip().lower().encode()).hexdigest()
    return f"embedding:{embedding_hash}"
