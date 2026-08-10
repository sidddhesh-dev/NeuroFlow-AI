import "./ChatMessage.css";
import { BrainCircuit, User } from "lucide-react";

function ChatMessage({ message }) {
    const isUser = message.role === "user";

    return (
        <article
            className={`chat-message ${
                isUser ? "user-message" : "assistant-message"
            }`}
        >
            {!isUser && (
                <div className="message-avatar">
                    <BrainCircuit size={18} />
                </div>
            )}

            <div className="message-content">
                <div className="message-header">
                    {!isUser && (
                        <span className="message-author">
                            NeuroFlow AI
                        </span>
                    )}
                </div>

                <div className="message-body">
                    {message.content}
                </div>
            </div>

            {isUser && (
                <div className="message-avatar">
                    <User size={18} />
                </div>
            )}
        </article>
    );
}

export default ChatMessage;