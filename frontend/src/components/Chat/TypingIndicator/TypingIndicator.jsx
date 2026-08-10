import "./TypingIndicator.css";
import { BrainCircuit } from "lucide-react";

function TypingIndicator() {
    return (
        <div className="typing-indicator">
            <div className="typing-header">
                <div className="typing-avatar">
                    <BrainCircuit size={14} />
                </div>

                <span className="typing-author">NeuroFlow AI</span>
            </div>

            <div className="typing-body">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
            </div>
        </div>
    );
}

export default TypingIndicator;