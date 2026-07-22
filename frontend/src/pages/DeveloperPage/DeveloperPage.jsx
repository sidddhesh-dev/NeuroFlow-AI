import "./DeveloperPage.css";

function Developer() {
  return (
    <main className="developer-page">

      <nav className="developer-nav">

        <div className="developer-brand">
          <span>N</span>
          NeuroFlow AI
        </div>

        <button>
          Back to NeuroFlow
        </button>

      </nav>

      <section className="developer-hero">

        <div className="developer-profile">

          <div className="developer-avatar-large">
            S
          </div>

          <span className="developer-eyebrow">
            Developer
          </span>

          <h1>Siddhesh Thorat</h1>

          <h2>
            Full Stack Python Developer
          </h2>

          <p>
            Building backend systems, intelligent AI workflows and practical full-stack applications with Python, Django and React.
          </p>

          <div className="developer-actions">
            <button className="developer-primary-button">
              View GitHub
            </button>

            <button className="developer-secondary-button">
              Contact
            </button>
          </div>

        </div>

      </section>

      <section className="developer-information">

        <div className="developer-about">

          <span className="developer-section-label">
            About
          </span>

          <h2>
            Building NeuroFlow AI
          </h2>

          <p>
            NeuroFlow AI is an AI-powered knowledge workspace built as a full-stack engineering project. It combines document intelligence, retrieval-augmented generation, conversational AI and production-oriented backend architecture.
          </p>

        </div>

        <div className="developer-skills">

          <span className="developer-section-label">
            Technology
          </span>

          <div className="skill-list">
            <span>Python</span>
            <span>Django</span>
            <span>Django REST Framework</span>
            <span>React</span>
            <span>Redis</span>
            <span>Celery</span>
            <span>Docker</span>
            <span>RAG</span>
            <span>Vector Search</span>
            <span>LLM Integration</span>
          </div>

        </div>

      </section>

      <footer className="developer-footer">
        <span>NeuroFlow AI</span>
        <span>Designed & built by Siddhesh Thorat</span>
      </footer>

    </main>
  );
}

export default Developer;