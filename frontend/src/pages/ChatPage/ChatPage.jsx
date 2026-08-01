import "./ChatPage.css";

import ChatSection from "../../components/ChatSection/ChatSection";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { useLocation } from "react-router-dom";

function ChatPage() {

    const location = useLocation();

    const selectedDocument = location.state;

    return (

        <main className="chat-page">

            <ChatSection
                document={selectedDocument}
            />

            <RightSidebar
                document={selectedDocument}
            />

        </main>

    );

}

export default ChatPage;