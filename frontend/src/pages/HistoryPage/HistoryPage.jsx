import "./HistoryPage.css";

import { useNavigate } from "react-router-dom";

import { useHistoryQuery } from "../../hooks/useHistoryQuery";
import { Trash2 } from "lucide-react";
import { useDeleteHistoryMutation } from "../../hooks/useDeleteHistoryMutation";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";


import {
    MessageCircle,
    FileText,
    NotebookPen,
    ArrowRight,
} from "lucide-react";

function History() {

    const navigate = useNavigate();
    const deleteHistoryMutation = useDeleteHistoryMutation();

    const { confirmDelete } = useDeleteConfirmation();

    const {

        data: history = [],

        isLoading,

        error,

    } = useHistoryQuery();

    function handleContinue(item) {

        if (item.type === "chat") {

            navigate(`/chat/${item.target_id}`);

            return;

        }

        if (item.type === "document") {

            navigate("/documents", {

                state: {

                    documentId: item.target_id,

                },

            });

            return;

        }

        if (item.type === "note") {

            navigate("/notes", {

                state: {

                    noteId: item.target_id,

                },

            });

        }

    }

    function getIcon(type) {

        switch (type) {

            case "chat":

                return <MessageCircle size={17} />;

            case "document":

                return <FileText size={17} />;

            case "note":

                return <NotebookPen size={17} />;

            default:

                return null;

        }

    }

    function getLabel(type) {

        switch (type) {

            case "chat":

                return "Chat";

            case "document":

                return "Document";

            case "note":

                return "Note";

            default:

                return "";

        }

    }

    function formatDate(date) {

        return new Date(date).toLocaleString([], {

            dateStyle: "medium",

            timeStyle: "short",

        });

    }

    async function handleDelete(item) {

    const confirmed = await confirmDelete(

        `Delete this ${item.type}?`

    );

    if (!confirmed) {

        return;

    }

    deleteHistoryMutation.mutate({

        type: item.type,

        targetId: item.target_id,

    });

}

    return (

        <section className="history-page">

            <div className="history-header">

                <div>

                    <h1>History</h1>

                    <p>

                        Continue your previous work.

                    </p>

                </div>

                <button className="clear-all-history">

                    Clear History

                </button>

            </div>

            <div className="history-toolbar">

              

            </div>

            <div className="history-list">

                {isLoading && (

                    <p className="history-message">

                        Loading history...

                    </p>

                )}

                {error && (

                    <p className="history-message">

                        Failed to load history.

                    </p>

                )}

                {!isLoading &&
                    !error &&
                    history.length === 0 && (

                        <p className="history-message">

                            No history found.

                        </p>

                    )}

                {!isLoading &&
                    !error &&
                    history.map((item) => (

                        <div
                            key={`${item.type}-${item.id}`}
                            className="history-card"
                        >

                            <div className="history-card-icon">

                                {getIcon(item.type)}

                            </div>

                            <div className="history-card-main">

                                <span className="history-type">

                                    {getLabel(item.type)}

                                </span>

                                <h3>

                                    {item.title}

                                </h3>

                                <span className="history-date">

                                    {formatDate(item.updated_at)}

                                </span>

                            </div>

                            <button
                                className="history-continue-button"
                                onClick={() =>
                                    handleContinue(item)
                                }
                            >

                                Continue

                                <ArrowRight size={14} />

                            </button>
                            <button
                                className="history-delete-button"
                                onClick={() =>
                                    handleDelete(item)
                                }
                            >
                            
                                <Trash2 size={15} />
                              
                            </button>

                        </div>

                    ))}

            </div>

        </section>

    );

}

export default History;