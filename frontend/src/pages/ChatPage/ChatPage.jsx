import "./ChatPage.css";

import { useNavigate, useLocation, useParams } from "react-router-dom";

import ChatSection from "../../components/ChatSection/ChatSection";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

import { useChatHistoryQuery } from "../../hooks/useChatHistoryQuery";
import { useChatSessionQuery } from "../../hooks/useChatSessionQuery";

function ChatPage() {

    const navigate = useNavigate();

    const location = useLocation();

    const { sessionId } = useParams();

    const currentSessionId = sessionId
        ? Number(sessionId)
        : null;

    const {
        data: history = [],
        isLoading: historyLoading,
        error: historyError,
    } = useChatHistoryQuery();

    const {
        data: session,
        isLoading: sessionLoading,
    } = useChatSessionQuery(currentSessionId);

    const selectedDocument = session?.document
        ? {
              documentId: session.document,
              documentName: session.document_name,
          }
        : location.state
        ? {
              documentId: location.state.documentId,
              documentName: location.state.documentName,
          }
        : null;

    function handleSelectChat(id) {

        navigate(`/chat/${id}`);

    }

    return (

        <main className="chat-page">

            <ChatSection
              key={`${currentSessionId ?? "new"}-${selectedDocument?.documentId ?? "none"}`}
              sessionId={currentSessionId}
              selectedDocument={selectedDocument}
              initialMessages={session?.messages ?? []}
              isLoading={sessionLoading}
            />

            <RightSidebar
                document={selectedDocument}
                history={history}
                currentSessionId={currentSessionId}
                onSelectChat={handleSelectChat}
                isLoading={historyLoading}
                error={historyError}
            />

        </main>

    );

}

export default ChatPage;