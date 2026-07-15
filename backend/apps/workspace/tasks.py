from celery import shared_task
import logging

from apps.workspace.services.document_processor import DocumentProcessor
from apps.workspace.exceptions import (
    RetryableProcessingError,
    NonRetryableProcessingError,
)

logger = logging.getLogger(__name__)

MAX_RETRIES = 3
RETRY_DELAY = 10


@shared_task(bind=True)
def process_document(self, document_id):
    try:
        return DocumentProcessor.process(document_id)

    except RetryableProcessingError as e:

        logger.warning(
            f"Retry {self.request.retries + 1}/{MAX_RETRIES} "
            f"for document {document_id}: {e}"
        )

        try:
            DocumentProcessor.cleanup_artifacts(document_id)
        except Exception as cleanup_error:
            logger.warning(
                f"Artifact cleanup failed for document "
                f"{document_id}: {cleanup_error}")

        if self.request.retries >= MAX_RETRIES:
            logger.error(
                f"Maximum retry attempts exceeded for document {document_id}")
            DocumentProcessor.update_status(document_id, "failed")
            return False

        raise self.retry(
            exc=e,
            countdown=RETRY_DELAY * (2 ** self.request.retries),)
    except NonRetryableProcessingError as e:
        logger.error(
            f"Permanent failure while processing document "
            f"{document_id}: {e}")

        DocumentProcessor.update_status(document_id, "failed")
        return False