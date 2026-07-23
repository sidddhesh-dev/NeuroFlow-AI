import "./ChatSection.css"
import { ArrowUp } from "lucide-react";

function ChatSection() {
  return (
    <section className="chat-section">

      <div className="messages-area">

        <div className="chat-empty-state">
          <h2>What can I help you understand?</h2>
          <p>
            Ask questions about your selected documents or start a conversation.
          </p>
        </div>

      </div>


      <div className="chat-input-area">

        <div className="chat-input-box">

          <textarea
            className="chat-input"
            placeholder="Ask anything about your documents..."
            rows="1"
          />

          <div className="chat-input-actions">

            <div className="input-left-actions">

              <button type="button" className="input-action-button" title="Attach file">
              +
              </button>

            </div>
            <button type="button" className="send-button" title="Send message" >
              <ArrowUp />
            </button>

          </div>

        </div>

        <p className="chat-disclaimer">
          NeuroFlow AI can make mistakes. Verify important information.
        </p>

      </div>

    </section>
  )
}

export default ChatSection