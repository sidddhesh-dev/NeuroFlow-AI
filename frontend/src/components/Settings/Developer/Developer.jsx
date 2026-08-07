import "./Developer.css";

function Developer() {

    return (

        <div className="developer-section">

            <div className="settings-section-header">

                <h2>Developer</h2>

                <p>

                    Meet the developer behind NeuroFlow AI.

                </p>

            </div>

            <div className="developer-card">

                <h3>Siddhesh Thorat</h3>

                <span>

                    Emerging Full Stack Python Developer

                </span>

                <p>

                    Passionate about building scalable backend systems,
                    AI-powered applications, and production-ready software.
                    NeuroFlow AI is a personal project created to explore
                    modern AI engineering, Retrieval-Augmented Generation,
                    and clean software architecture.

                </p>

            </div>

            <div className="developer-card">

                <h3>Skills</h3>

                <div className="tech-stack">

                    <span>Python</span>
                    <span>Django</span>
                    <span>React</span>
                    <span>Docker</span>
                    <span>Redis</span>
                    <span>Celery</span>
                    <span>REST APIs</span>
                    <span>Git</span>
                    <span>AI</span>
                    <span>RAG</span>

                </div>

            </div>

            <div className="developer-card">

                <h3>Connect</h3>

                <div className="developer-links">

                    <button>Resume</button>

                    <button>GitHub</button>

                    <button>LinkedIn</button>

                    <button>Email</button>

                </div>

            </div>

            <div className="developer-card">

                <h3>Project Vision</h3>

                <p>

                    My goal with NeuroFlow AI is to build a production-ready AI workspace
                    that demonstrates modern backend engineering, scalable architecture,
                    and practical AI integration while continuously evolving with new
                    technologies and real-world use cases.

                </p>

            </div>

        </div>

    );

}

export default Developer;