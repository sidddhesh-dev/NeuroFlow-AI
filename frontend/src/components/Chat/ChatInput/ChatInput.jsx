import "./ChatInput.css";

import { useState } from "react";
import { Plus, ArrowUp } from "lucide-react";

function ChatInput({ onSend }) {

    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!message.trim()) {
            return;
        }
        onSend(message);
        setMessage("");

    };

    return (

        <form
            className="chat-input-form"
            onSubmit={handleSubmit}
        >

            <button
                type="button"
                className="attachment-button"
            >
                <Plus size={18} />
            </button>

            <textarea
                className="chat-input"
                placeholder="Message NeuroFlow AI..."
                rows={1}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />

            <button
                type="submit"
                className="send-button"
                disabled={!message.trim()}
            >
                <ArrowUp size={18} />
            </button>

        </form>

    );

}

export default ChatInput;