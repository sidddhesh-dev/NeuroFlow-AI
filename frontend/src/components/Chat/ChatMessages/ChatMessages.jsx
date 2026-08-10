import "./ChatMessages.css";
import ChatMessage from "../ChatMessage/ChatMessage";

function ChatMessages({ messages }) {
    return (
        <section className="chat-messages">
            {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
        </section>
    );
}

export default ChatMessages;