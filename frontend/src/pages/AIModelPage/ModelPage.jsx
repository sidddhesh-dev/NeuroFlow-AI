import "./ModelPage.css";

function AIModels() {
  return (
    <section className="models-page">

      <div className="models-header">
        <h1>AI Models</h1>

        <p>
          Configure the language models used by NeuroFlow AI.
        </p>
      </div>

      <div className="active-model-panel">

        <div>
          <span className="active-model-label">
            Active Model
          </span>

          <h2>Gemini</h2>

          <p>
            Primary AI provider for conversations and document intelligence.
          </p>
        </div>

        <span className="model-running">
          ● Online
        </span>

      </div>

      <div className="models-section-title">
        Available Providers
      </div>

      <div className="models-grid">

        <div className="ai-model-card model-selected">

          <div className="ai-model-card-header">
            <div className="model-logo">G</div>

            <span className="model-status">
              Active
            </span>
          </div>

          <h3>Google Gemini</h3>

          <p>
            Fast multimodal AI used as NeuroFlow's primary language model.
          </p>

          <button>Selected</button>

        </div>

        <div className="ai-model-card">

          <div className="ai-model-card-header">
            <div className="model-logo">O</div>

            <span className="model-available">
              Available
            </span>
          </div>

          <h3>OpenAI</h3>

          <p>
            Alternative model provider available through NeuroFlow's LLM service.
          </p>

          <button>Use Model</button>

        </div>

        <div className="ai-model-card">

          <div className="ai-model-card-header">
            <div className="model-logo">GR</div>

            <span className="model-available">
              Available
            </span>
          </div>

          <h3>Groq</h3>

          <p>
            High-speed inference provider available as an additional fallback.
          </p>

          <button>Use Model</button>

        </div>

      </div>

    </section>
  );
}

export default AIModels;