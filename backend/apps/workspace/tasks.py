from celery import shared_task
from apps.workspace.services.chromadb_service import VectorStoreService

@shared_task
def add(x,y):
    return x+y

@shared_task
def multiply(a,b):
    return a*b
