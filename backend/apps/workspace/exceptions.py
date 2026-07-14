class RetryableProcessingError(Exception):
    """Temporary failure. Safe to retry."""
    pass


class NonRetryableProcessingError(Exception):
    """Permanent failure. Do not retry."""
    pass