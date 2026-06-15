from pypdf import PdfReader
from docx import Document as DocxDocument
from openpyxl import load_workbook
from pptx import Presentation
import csv

class DocumentProcessor:

    @staticmethod
    def extract_text(document):
        extension=document.file.name.split('.')[-1].lower()
        if extension  in [ 'txt','html','md']:
            print("FILE EXTENSION:", extension)
            with open(document.file.path,'r',encoding='utf-8') as file :
                data=file.read()
            return data
        elif extension == 'pdf':
            reader = PdfReader(document.file.path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text

        elif extension == 'docx':
            doc = DocxDocument(document.file.path)
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        elif extension == 'xlsx':
            workbook = load_workbook(document.file.path,data_only=True)
            text = ""
            for sheet in workbook.worksheets:
                for row in sheet.iter_rows(values_only=True):
                    row_text = " ".join(str(cell)for cell in row if cell is not None)
                    text += row_text + "\n"
            return text
        elif extension == 'pptx':
            presentation = Presentation(document.file.path)
            text = ""
            for slide in presentation.slides:
                for shape in slide.shapes:
                    if hasattr(shape, "text"):
                        text += shape.text + "\n"
            return text
        elif extension == 'csv':
            text = ""

            with open(document.file.path, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)

                for row in reader:
                    text += " ".join(row) + "\n"

            return text
        return None

        
    

