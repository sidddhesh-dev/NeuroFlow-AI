from django.core.cache import cache

class RedisService:
    @staticmethod
    def set(key,value,timeout=3600):
        return cache.set(key=key,value=value)

    @staticmethod
    def get(key):
        return cache.get(key)

    @staticmethod
    def delete(key):
        return cache.delete(key)

    @staticmethod
    def exists(key):
        return cache.has_key(key)

    