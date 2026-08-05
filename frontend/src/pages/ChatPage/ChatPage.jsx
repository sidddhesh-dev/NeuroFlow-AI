import "./ChatPage.css";

import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

import ChatSection from "../../components/ChatSection/ChatSection";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

import { useChatHistoryQuery } from "../../hooks/useChatHistoryQuery";
import { useChatSessionQuery } from "../../hooks/useChatSessionQuery";

import { useRenameChatMutation } from "../../hooks/useRenameChatMutation";
import { usePinChatMutation } from "../../hooks/usePinChatMutation";
import { useDeleteChatMutation } from "../../hooks/useDeleteChatMutation";

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

    const renameMutation = useRenameChatMutation();

    const pinMutation = usePinChatMutation();

    const deleteMutation = useDeleteChatMutation();

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

    async function handleRenameChat(chat) {

        const title = window.prompt(
            "Rename chat",
            chat.title
        );

        if (!title) {
            return;
        }

        renameMutation.mutate({
            sessionId: chat.id,
            title,
        });

    }

    function handlePinChat(chat) {

        pinMutation.mutate({
            sessionId: chat.id,
            isPinned: chat.is_pinned,
        });

    }

    function handleDeleteChat(chat) {

        const confirmed = window.confirm(
            "Delete this chat?"
        );

        if (!confirmed) {
            return;
        }

        deleteMutation.mutate(chat.id, {

            onSuccess: () => {

                if (currentSessionId === chat.id) {

                    navigate("/chat");

                }

            },

        });

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
                onRenameChat={handleRenameChat}
                onPinChat={handlePinChat}
                onDeleteChat={handleDeleteChat}
                isLoading={historyLoading}
                error={historyError}
            />

        </main>

    );

}

export default ChatPage;