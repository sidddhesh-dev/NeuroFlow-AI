

class DocumentProcessor:

    @staticmethod
    def extract_text(document):
        extensions=document.file.name.split('.')[-1].lower()
        if extensions  in ['html','txt','md']:
            with open(document.file.path,'r',encoding='utf-8') as file :
                data=file.read()
            return data

        return None
    

