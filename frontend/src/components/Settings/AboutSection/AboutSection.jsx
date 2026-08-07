import "./AboutSection.css";

function AboutSection() {

    return (

        <div className="about-section">

            <div className="settings-section-header">

                <h2>About NeuroFlow AI</h2>

                <p>

                    An AI-powered developer workspace for intelligent document interaction,
                    contextual AI conversations, and knowledge management.

                </p>

            </div>

            <div className="about-card">

                <h3>Mission</h3>

                <p>

                    NeuroFlow AI is designed to help developers and learners organize
                    knowledge, interact with documents, and collaborate with AI through
                    a modern workspace. It combines Retrieval-Augmented Generation,
                    intelligent document management, note-taking, workspace search,
                    and contextual conversations into one unified platform.

                </p>

            </div>

            <div className="about-card">

                <h3>Core Features</h3>

                <ul>

                    <li>AI Conversations</li>

                    <li>Document Intelligence</li>

                    <li>Workspace Search</li>

                    <li>Smart Notes</li>

                    <li>History Management</li>

                    <li>JWT Authentication</li>

                </ul>

            </div>

            <div className="about-card">

                <h3>Technology Stack</h3>

                <div className="tech-stack">

                    <span>React</span>
                    <span>Django</span>
                    <span>DRF</span>
                    <span>Redis</span>
                    <span>Celery</span>
                    <span>Docker</span>
                    <span>Gemini</span>
                    <span>OpenAI</span>
                    <span>Groq</span>
                    <span>SQLite</span>

                </div>

            </div>

            <div className="about-card">

                <h3>Project Information</h3>

                <p><strong>Version:</strong> 1.0.0</p>

                <p><strong>Status:</strong> Active Development</p>

                <p><strong>Architecture:</strong> Service-Based Architecture</p>

                <p><strong>Purpose:</strong> Personal Portfolio Project</p>

            </div>

        </div>

    );

}

export default AboutSection;