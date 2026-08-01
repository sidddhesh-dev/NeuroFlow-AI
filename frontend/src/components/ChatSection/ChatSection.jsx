import "./ChatSection.css";

import {
    useState,
    useEffect,
    useRef,
} from "react";

import { useLocation } from "react-router-dom";

import EmptyState from "../Chat/EmptyState/EmptyState";
import ChatMessages from "../Chat/ChatMessages/ChatMessages";
import ChatInput from "../Chat/ChatInput/ChatInput";
import TypingIndicator from "../Chat/TypingIndicator/TypingIndicator";

import { askQuestion } from "../../api/documentApi";

function ChatSection() {

    const location = useLocation();

    const selectedDocument = location.state ?? null;

    const [messages, setMessages] = useState([]);

    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });

    }, [messages, isTyping]);

    console.log("Selected Document:", selectedDocument);
    const handleSend = async (question) => {

        if (!question.trim()) {
            return;
        }

        if (!selectedDocument) {

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: "assistant",
                    content:
                        "Please select a document before starting a conversation.",
                },
            ]);

            return;

        }

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: question,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        setIsTyping(true);

        try {

            const response = await askQuestion(
                selectedDocument.documentId,
                question
            );

            const assistantMessage = {

                id: Date.now() + 1,

                role: "assistant",

                content: response.answer,

            };

            setMessages((prev) => [
                ...prev,
                assistantMessage,
            ]);

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
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

    };

    return (

        <section className="chat-section">

            <div className="messages-area">

                {
                    messages.length === 0 ? (

                        <EmptyState />

                    ) : (

                        <ChatMessages
                            messages={messages}
                        />

                    )
                }

                {
                    isTyping && (

                        <TypingIndicator />

                    )
                }

                <div ref={messagesEndRef}></div>

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