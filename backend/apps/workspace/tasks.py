from celery import shared_task
from apps.workspace.services.document_processor import DocumentProcessor


@shared_task
def process_document(document_id):
    """
    Background task for processing uploaded documents.
    """

    return DocumentProcessor.process(document_id)
