
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

        
    

