from django.conf import settings
from supabase import create_client


class SupabaseStorageService:
    BUCKET_NAME = settings.SUPABASE_STORAGE_BUCKET

    @classmethod
    def _client(cls):
        if not settings.SUPABASE_URL:
            raise RuntimeError("SUPABASE_URL is not configured.")

        if not settings.SUPABASE_SECRET_KEY:
            raise RuntimeError("SUPABASE_SECRET_KEY is not configured.")

        return create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_SECRET_KEY,
        )

    @classmethod
    def upload_file(cls, path, file, content_type=None):
        file.seek(0)
        file_bytes = file.read()

        options = {
            "upsert": "false",
        }

        if content_type:
            options["content-type"] = content_type

        return (
            cls._client()
            .storage
            .from_(cls.BUCKET_NAME)
            .upload(
                path,
                file_bytes,
                file_options=options,
            )
        )

    @classmethod
    def download_file(cls, path):
        return (
            cls._client()
            .storage
            .from_(cls.BUCKET_NAME)
            .download(path)
        )

    @classmethod
    def delete_file(cls, path):
        return (
            cls._client()
            .storage
            .from_(cls.BUCKET_NAME)
            .remove([path])
        )

    @classmethod
    def get_file_size(cls, path):
        data = cls.download_file(path)
        return len(data)