import { useState } from "react";

import "./ChatPage.css";

import EmptyState from "../../components/Chat/EmptyState/EmptyState";
import ChatInput from "../../components/Chat/ChatInput/ChatInput";
import ChatMessages from "../../components/Chat/ChatMessages/ChatMessages";
import TypingIndicator from "../../components/Chat/TypingIndicator/TypingIndicator";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

function ChatPage() {

    const [messages, setMessages] = useState([]);

    const [isTyping] = useState(false);;

    const handleSend = (text) => {

        const userMessage = {

            id: Date.now(),

            role: "user",

            content: text,

        };

        setMessages((prev) => [...prev, userMessage]);

        /*
            Backend integration comes here later.

            setIsTyping(true)

            POST /chat/

            setMessages(...assistant message...)

            setIsTyping(false)
        */

    };

    return (

        <main className="chat-page">

            <div className="chat-container">

                <div className="chat-content">

                    {messages.length === 0 ? (

                        <EmptyState />

                    ) : (

                        <ChatMessages
                            messages={messages}
                        />

                    )}

                    {isTyping && (

                        <TypingIndicator />

                    )}

                </div>

                <div className="chat-input-section">

                    <ChatInput
                        onSend={handleSend}
                    />

                    <p className="chat-disclaimer">
                        NeuroFlow AI can make mistakes. Please verify important information.
                    </p>

                </div>

            </div>

            <RightSidebar />

        </main>

    );

}

export default ChatPage;