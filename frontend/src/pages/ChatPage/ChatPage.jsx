import "./ChatPage.css";

import { useLocation } from "react-router-dom";

import ChatSection from "../../components/ChatSection/ChatSection";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

function ChatPage() {

    const location = useLocation();

    const sessionId = location.state?.sessionId ?? null;

    const selectedDocument = location.state?.document ?? location.state ?? null;

    return (

        <main className="chat-page">

            <ChatSection
                sessionId={sessionId}
                selectedDocument={selectedDocument}
            />

            <RightSidebar
                document={selectedDocument}
            />

        </main>

    );

}

export default ChatPage;