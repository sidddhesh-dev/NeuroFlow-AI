import hashlib

from apps.workspace.models import Document, DocumentChunk
from apps.workspace.services.chunk_service import ChunkService
from apps.workspace.services.embedding_service import EmbeddingService
from apps.workspace.services.chromadb_service import VectorStoreService
from rest_framework.response import Response
from rest_framework import status



class DocumentProcessor:

    @staticmethod
    def extract_text(document):
        extension=document.file.name.split('.')[-1].lower()
        if extension  in [ 'txt','html','md']:
            with open(document.file.path,'r',encoding='utf-8') as file :
                data=file.read()
            return data
        elif extension == 'pdf':
            from pypdf import PdfReader

            reader = PdfReader(document.file.path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text

        elif extension == 'docx':
            from docx import Document as DocxDocument

            doc = DocxDocument(document.file.path)
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        elif extension == 'xlsx':
            from openpyxl import load_workbook
            workbook = load_workbook(document.file.path,data_only=True)
            text = ""
            for sheet in workbook.worksheets:
                for row in sheet.iter_rows(values_only=True):
                    row_text = " ".join(str(cell)for cell in row if cell is not None)
                    text += row_text + "\n"
            return text
        elif extension == 'pptx':
            from pptx import Presentation
            presentation = Presentation(document.file.path)
            text = ""
            for slide in presentation.slides:
                for shape in slide.shapes:
                    if hasattr(shape, "text"):
                        text += shape.text + "\n"
            return text
        elif extension == 'csv':
            import csv
            text = ""

            with open(document.file.path, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)

                for row in reader:
                    text += " ".join(row) + "\n"

            return text
        return None
    
    @staticmethod
    def process(document_id):
            document = None
            try:
                document = Document.objects.get(id=document_id)
                text = DocumentProcessor.extract_text(document)
                if not text:
                    document.status = "not_supported"
                    document.save(update_fields=["status"])
                    return
                content_hash = hashlib.sha256(text.encode("utf-8")).hexdigest()
                existing_document = Document.objects.filter(user=document.user,content_hash=content_hash).exclude(id=document.id).exists()
                if existing_document:
                    document.delete()
                    return False
                document.content_hash = content_hash
                document.extracted_data = text
                document.save()
                chunks=ChunkService.create_chunks(text)
                chunk_objects = [ DocumentChunk(
                    document=document,chunk_text=chunk,chunk_id=index) 
                    for index, chunk in enumerate(chunks)]
                DocumentChunk.objects.bulk_create(chunk_objects)
                embeddings = EmbeddingService.generate_embeddings(chunks)
                VectorStoreService.add_chunks(document,chunks,embeddings)
                document.status = 'ready'
                document.save(update_fields=["status"])
                return True
                
            
            except Exception as e:
                print(f"Document Processing Error: {e}")
                document.status = 'failed'
                document.save(update_fields=["status"])
                return False

        
    

