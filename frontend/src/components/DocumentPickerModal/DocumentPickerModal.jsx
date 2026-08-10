import "./ChatSection.css";
import { useEffect, useRef, useState } from "react";

import EmptyState from "../Chat/EmptyState/EmptyState";
import ChatMessages from "../Chat/ChatMessages/ChatMessages";
import ChatInput from "../Chat/ChatInput/ChatInput";
import TypingIndicator from "../Chat/TypingIndicator/TypingIndicator";

import { askQuestion } from "../../api/documentApi";

function ChatSection({
    sessionId,
    selectedDocument,
    initialMessages = [],
}) {
    const [messages, setMessages] = useState(() => initialMessages);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, isTyping]);

    async function handleSend(question) {
        if (!question.trim()) return;

        if (!selectedDocument) {
            setMessages((previous) => [
                ...previous,
                {
                    id: Date.now(),
                    role: "assistant",
                    content:
                        "Please select a document before starting a conversation.",
                },
            ]);
            return;
        }

        setMessages((previous) => [
            ...previous,
            {
                id: Date.now(),
                role: "user",
                content: question,
            },
        ]);

        setIsTyping(true);

        try {
            const response = await askQuestion(
                selectedDocument.documentId,
                question,
                sessionId
            );

            setMessages((previous) => [
                ...previous,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    content: response.answer,
                },
            ]);
        } catch {
            setMessages((previous) => [
                ...previous,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    content:
                        "Something went wrong while generating the response.",
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    }

    return (
        <section className="chat-section">
            <div className="messages-area">
                {messages.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ChatMessages messages={messages} />
                )}

                {isTyping && <TypingIndicator />}

                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <ChatInput
                    onSend={handleSend}
                    disabled={isTyping}
                />

                <p className="chat-disclaimer">
                    NeuroFlow AI can make mistakes. Verify important information.
                </p>
            </div>
        </section>
    );
}

export default ChatSection;