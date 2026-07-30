import { useEffect, useState } from "react";
import { getDocuments } from "../api/documentApi";

function useDocuments() {

    const [documents, setDocuments] = useState([]);

    const [currentDocument, setCurrentDocument] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loadDocuments = async () => {

        try {

            setLoading(true);

            const data = await getDocuments();

            setDocuments(data);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load documents.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDocuments();

    }, []);

    return {

        documents,

        currentDocument,

        setCurrentDocument,

        loading,

        error,

        refreshDocuments: loadDocuments

    };

}

export default useDocuments;