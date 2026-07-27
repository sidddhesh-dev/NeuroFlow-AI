import "./SearchModal.css";

import { Search, X, MessageCircle } from "lucide-react";

function SearchModal({ isOpen, onClose }) {

    if (!isOpen) return null;

    return (

        <div className="search-overlay" onClick={onClose}>

            <div
                className="search-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="search-header">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search chats, documents..."
                        autoFocus
                    />

                    <button
                        className="close-search"
                        onClick={onClose}
                    >
                        <X size={18}/>
                    </button>

                </div>

                <div className="search-body">

                    <h4>Recent Search</h4>

                    <div className="search-item">
                        <MessageCircle size={18}/>
                        <span>Docker Interview Prep</span>
                    </div>

                    <div className="search-item">
                        <MessageCircle size={18}/>
                        <span>NeuroFlow AI Phase 6</span>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default SearchModal;