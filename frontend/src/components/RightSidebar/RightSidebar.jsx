import "./RightSidebar.css"
import { Check } from "lucide-react";


function RightSidebar() {
  return (
    <aside className="right-sidebar">

      <section className="context-section">

        <div className="section-header">
          <h2>Documents in Context</h2>
  
          <button  className="add-document">+ add</button>
          
        </div>

        <div className="context-documents">

          <div className="context-document">
            <div className="document-icon">DOC</div>

            <div className="document-info">
              <h3>AI Development.pdf</h3>
              <p>12 pages • 1.2 MB</p>
            </div>

            <span className="document-status "> <Check  className="check-button"/></span>
          </div>

        </div>

      </section>


      <section className="chat-history-section">

        <div className="section-header">
          <h2>Chat History</h2>

          <button type="button" className="view-all-button">
            View all
          </button>
        </div>

        <div className="chat-list">

          <button type="button" className="chat-item chat-item-active">
            <div className="chat-item-content">
              <h3>Understanding AI Development</h3>
            </div>

            <span className="chat-time">10:30 AM</span>
          </button>


          <button type="button" className="chat-item">
            <div className="chat-item-content">
              <h3>Learning Machine Learning</h3>
            </div>

            <span className="chat-time">Yesterday</span>
          </button>


          <button type="button" className="chat-item">
            <div className="chat-item-content">
              <h3>Python Notes</h3>
            </div>

            <span className="chat-time">2 days ago</span>
          </button>

        </div>


        <button type="button" className="clear-history-button">
          Clear History
        </button>

      </section>

    </aside>
  )
}

export default RightSidebar