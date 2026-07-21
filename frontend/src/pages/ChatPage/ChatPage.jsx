import "./ChatPage.css";
import ChatSection from "../../components/ChatSection/ChatSection";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

function ChatPage() {
  return (
    <div className="chat-page">

      <div className="chat-area">

        <ChatSection />

      </div>
      
        <RightSidebar />

    </div>
  );
}

export default ChatPage;