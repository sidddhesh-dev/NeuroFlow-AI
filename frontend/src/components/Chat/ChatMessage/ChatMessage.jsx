import "./ChatMessage.css";

import { BrainCircuit, User } from "lucide-react";

function ChatMessage({ message }) {

    const isUser = message.role === "user";

    return (

        <article className="chat-message">

            <div className="message-header">

                <div className="message-avatar">

                    {isUser ? (
                        <User size={14} />
                    ) : (
                        <BrainCircuit size={14} />
                    )}

                </div>

                <span className="message-author">

                    {isUser ? "You" : "NeuroFlow AI"}

                </span>

            </div>

            <div className="message-body">

                {message.content}

            </div>

        </article>

    );

}

export default ChatMessage;