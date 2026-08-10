import "./EmptyState.css";
import { BrainCircuit } from "lucide-react";
import { useState } from "react";

const greetings = [
    {
        title: "What's on your mind today?",
        subtitle: "Ask questions, explore ideas, or work with your documents.",
    },
    {
        title: "Let's build something together.",
        subtitle: "Code, research, brainstorm, or solve complex problems.",
    },
    {
        title: "Ready when you are.",
        subtitle: "Upload a document or start a new conversation.",
    },
    {
        title: "Every great idea starts here.",
        subtitle: "Let's turn your thoughts into something useful.",
    },
    {
        title: "What would you like to create?",
        subtitle: "I'm here to help you write, learn, and build.",
    },
    {
        title: "Need help with something?",
        subtitle: "Let's work through it together.",
    },
    {
        title: "Let's make progress today.",
        subtitle: "One conversation at a time.",
    },
    {
        title: "Your AI workspace is ready.",
        subtitle: "Ask anything or start with one of your documents.",
    },
    {
        title: "Let's solve something interesting.",
        subtitle: "From coding to research, I'm ready.",
    },
    {
        title: "Where should we begin?",
        subtitle: "Ask a question or upload your first document.",
    },
];

function EmptyState() {
    const [greeting] = useState(
        () => greetings[Math.floor(Math.random() * greetings.length)]
    );

    return (
        <div className="empty-state">
            <div className="empty-icon">
                <BrainCircuit className="brand-logo" />
            </div>

            <h1 className="empty-title">{greeting.title}</h1>

            <p className="empty-description">{greeting.subtitle}</p>
        </div>
    );
}

export default EmptyState;