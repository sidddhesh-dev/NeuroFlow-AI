import "./HelpFeedback.css";

import {

    BookOpen,

    Bug,

    Lightbulb,

    Mail,

    Globe,

    Shield,

    FileText,

} from "lucide-react";

function HelpFeedback() {

    return (

        <section className="help-feedback">

            <div className="help-header">

                <h2>

                    Help & Feedback

                </h2>

                <p>

                    Find documentation, report issues and learn more about NeuroFlow AI.

                </p>

            </div>

            <div className="help-card">

                <div className="help-item">

                    <BookOpen size={18} />

                    <div>

                        <h3>Documentation</h3>

                        <p>

                            User guides and developer documentation.

                        </p>

                    </div>

                    <button disabled>

                        Coming Soon

                    </button>

                </div>

                <div className="help-item">

                    <Bug size={18} />

                    <div>

                        <h3>Report a Bug</h3>

                        <p>

                            Found a problem? Send us a bug report.

                        </p>

                    </div>

                    <button disabled>

                        Coming Soon

                    </button>

                </div>

                <div className="help-item">

                    <Lightbulb size={18} />

                    <div>

                        <h3>Request a Feature</h3>

                        <p>

                            Suggest improvements for NeuroFlow AI.

                        </p>

                    </div>

                    <button disabled>

                        Coming Soon

                    </button>

                </div>

                <div className="help-item">

                    <Mail size={18} />

                    <div>

                        <h3>Contact Support</h3>

                        <p>

                            Reach the NeuroFlow development team.

                        </p>

                    </div>

                    <button disabled>

                        Coming Soon

                    </button>

                </div>

                <div className="help-item">

                    <Globe size={18} />

                    <div>

                        <h3>GitHub Repository</h3>

                        <p>

                            View the NeuroFlow AI source code.

                        </p>

                    </div>

                    <button disabled>

                        Private

                    </button>

                </div>

                <div className="help-item">

                    <Shield size={18} />

                    <div>

                        <h3>Privacy Policy</h3>

                        <p>

                            Learn how your information is handled.

                        </p>

                    </div>

                    <button disabled>

                        Coming Soon

                    </button>

                </div>

                <div className="help-item">

                    <FileText size={18} />

                    <div>

                        <h3>Version</h3>

                        <p>

                            NeuroFlow AI v1.0.0

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default HelpFeedback;