import hashlib


def generate_cache_key(question: str) -> str:
    question_hash = hashlib.sha256(
        question.strip().lower().encode()
    ).hexdigest()

    return f"llm:{question_hash}"