from apps.workspace.models import ( ChatSession, Document, Note)

class SearchService:

    @staticmethod
    def search(user, query):
        chats = ( ChatSession.objects.filter( user=user, title__icontains=query).order_by( "-is_pinned", "-updated_at"))

        documents = (
            Document.objects.filter(user=user,file__icontains=query).order_by("-uploaded_at"))
        notes = ( Note.objects.filter( user=user, title__icontains=query) .order_by("-updated_at"))
        
        return {
            "chats": chats,
            "documents": documents,
            "notes": notes,
        }