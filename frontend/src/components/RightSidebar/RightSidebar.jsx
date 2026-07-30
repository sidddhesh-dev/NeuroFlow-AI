import "./RightSidebar.css";
import { useNavigate } from "react-router-dom";
import { FileSearch } from "lucide-react";

function RightSidebar() {

    const navigate = useNavigate();

    return (

        <aside className="right-sidebar">

            <section className="context-section">

                <div className="section-header">

                    <h2>Current Context</h2>

                    <button
                        className="change-document-button"
                        onClick={() => navigate("/documents")}
                    >
                        Browse
                    </button>

                </div>

                <div className="empty-context">

                    <div className="empty-context-icon">
                    <FileSearch size={18} />
                    </div>

                    <div className="empty-context-content">

                        <h3>No document selected</h3>

                        <p className="empty-context-line">
                            Browse your documents to start chatting.
                        </p>

                    </div>

                </div>

            </section>

            <section className="chat-history-section">

                <div className="section-header">

                    <h2>Chat History</h2>

                    <button
                        type="button"
                        className="view-all-button"
                    >
                        View all
                    </button>

                </div>

                <div className="chat-list">

                    <button
                        type="button"
                        className="chat-item chat-item-active"
                    >

                        <div className="chat-item-content">

                            <h3>Understanding AI Development</h3>

                        </div>

                        <span className="chat-time">
                            10:30 AM
                        </span>

                    </button>

                    <button
                        type="button"
                        className="chat-item"
                    >

                        <div className="chat-item-content">

                            <h3>Learning Machine Learning</h3>

                        </div>

                        <span className="chat-time">
                            Yesterday
                        </span>

                    </button>

                    <button
                        type="button"
                        className="chat-item"
                    >

                        <div className="chat-item-content">

                            <h3>Python Notes</h3>

                        </div>

                        <span className="chat-time">
                            2 days ago
                        </span>

                    </button>

                </div>

                <button
                    type="button"
                    className="clear-history-button"
                >
                    Clear History
                </button>

            </section>

        </aside>

    );

}

export default RightSidebar;