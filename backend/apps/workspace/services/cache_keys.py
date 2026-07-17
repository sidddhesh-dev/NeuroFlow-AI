import hashlib
from apps.workspace.models import Document


def generate_cache_key(question,document_id) :
    question_hash = hashlib.sha256(
        question.strip().lower().encode()
    ).hexdigest()

    return f"llm:{document_id}:{question_hash}"

def generate_embedding_cache_key(text):
    embedding_hash=hashlib.sha256(text.strip().lower().encode()).hexdigest()
    return f"embedding:{embedding_hash}"
