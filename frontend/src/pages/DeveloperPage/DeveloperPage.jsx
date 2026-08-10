import "./DeveloperPage.css";

import profilePhoto from "../../assets/developer/profile.png";
import resumePdf from "../../assets/developer/resume.pdf";
import neuroflowImage from "../../assets/developer/neuroflow-ai.png";
import buyngoImage from "../../assets/developer/buyngo.png";
import jobTrackImage from "../../assets/developer/jobtrack.png";

function Developer() {
    const developer = {
        name: "Siddhesh Thorat",
        role: "Backend & AI Software Engineer",
        location: "Pune, Maharashtra, India",
        photo: profilePhoto,
        summary:
            "Backend and AI-focused software developer with hands-on experience building web applications, REST APIs, AI-powered workflows, and production-oriented backend systems. I work primarily with Python and Django, with experience across React, Redis, Celery, Docker, RAG pipelines, vector search, and LLM integration. I enjoy turning complex application requirements into clean, maintainable systems and building practical AI products that solve real problems.",
        links: {
            github: "https://github.com/sidddhesh-dev",
            linkedin: "https://www.linkedin.com/in/siddhesh-thorat-494123373/",
            naukri: "https://www.naukri.com/mnjuser/profile",
            resume: resumePdf,
        },
        skills: [
            "Python",
            "Django",
            "Django REST Framework",
            "Django ORM",
            "SQL",
            "SQLite",
            "React",
            "JavaScript",
            "HTML",
            "CSS",
            "REST APIs",
            "API Integration",
            "JWT Authentication",
            "RAG",
            "LLM Integration",
            "Sentence Transformers",
            "Vector Search",
            "ChromaDB",
            "Redis",
            "Celery",
            "Docker",
            "Git",
            "GitHub",
        ],
        projects: [
            {
                title: "NeuroFlow AI",
                image: neuroflowImage,
                description:
                    "AI-powered knowledge workspace combining document intelligence, Retrieval-Augmented Generation, conversational AI, semantic search, and production-oriented backend architecture.",
                technologies: [
                    "Python",
                    "Django",
                    "React",
                    "RAG",
                    "ChromaDB",
                    "Redis",
                    "Celery",
                    "Docker",
                ],
                github: "https://github.com/sidddhesh-dev/NeuroFlow-AI",
                live: "",
            },
            {
                title: "BuyNGo",
                image: buyngoImage,
                description:
                    "Django-based e-commerce application with product management, product browsing, and third-party product API integration.",
                technologies: [
                    "Python",
                    "Django",
                    "REST API",
                    "HTML",
                    "CSS",
                ],
                github: "https://github.com/sidddhesh-dev/BuyNGo",
                live: "",
            },
            {
                title: "Job Tracking Application",
                image: jobTrackImage,
                description:
                    "Django-based application for managing and tracking job applications and related hiring activities.",
                technologies: [
                    "Python",
                    "Django",
                    "HTML",
                    "CSS",
                    "SQLite",
                ],
                github: "https://github.com/sidddhesh-dev/job_tracking_application",
                live: "",
            },
        ],
        experience: [
            {
                role: "Python Developer Intern",
                company: "TestYantra Software Solutions Pvt. Ltd.",
                duration: "Jan 2025 – Oct 2025",
                description:
                    "Worked on backend development using Python and Django, including REST API development, CRUD operations, database query optimization, debugging, and testing.",
            },
        ],
        education: [
            {
                degree: "Bachelor of Engineering",
                field: "Computer Engineering",
                institution: "University of Mumbai",
                duration: "October 2022 – June 2025",
            },
            {
                degree: "Diploma",
                field: "Computer Engineering",
                institution: "Government Polytechnic Awasari Kh. Pune",
                duration: "June 2019 – June 2022",
            },
        ],
        achievements: [
            {
                title: "TCS NQT 2026",
                description:
                    "Qualified for the TCS hiring process through the TCS National Qualifier Test.",
            },
            {
                title: "Production-Oriented AI Project",
                description:
                    "Built NeuroFlow AI as a full-stack AI engineering project incorporating RAG, document processing, background tasks, Redis, Celery, Docker, and multiple LLM providers.",
            },
        ],
        contact: {
            location: "Pune, Maharashtra, India",
            phone: "+91 8830875465",
            email: "siddhesh.s.thorat14@gmail.com",
        },
    };

    return (
        <main className="developer-page">
            <nav className="developer-nav">
                <div className="developer-brand">
                    <span>N</span>
                    <strong>NeuroFlow AI</strong>
                </div>

                <a href="/chat" className="developer-back-button">
                    Back to NeuroFlow
                </a>
            </nav>

            <section className="developer-hero">
                <div className="developer-photo-wrapper">
                    <img
                        src={developer.photo}
                        alt={developer.name}
                        className="developer-photo"
                    />
                </div>

                <div className="developer-hero-content">
                    <span className="developer-eyebrow">DEVELOPER</span>

                    <h1>{developer.name}</h1>

                    <h2>{developer.role}</h2>

                    <p className="developer-location">
                        {developer.location}
                    </p>

                    <p className="developer-summary">
                        {developer.summary}
                    </p>

                    <div className="developer-links">
                        {developer.links.github && (
                            <a
                                href={developer.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        )}

                        {developer.links.linkedin && (
                            <a
                                href={developer.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        )}

                        {developer.links.naukri && (
                            <a
                                href={developer.links.naukri}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Naukri
                            </a>
                        )}

                        <a
                            href={developer.links.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </section>

            <section className="developer-section">
                <div className="developer-section-header">
                    <span className="developer-section-label">SKILLS</span>
                    <h2>Technical Skills</h2>
                </div>

                <div className="developer-skills">
                    {developer.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                    ))}
                </div>
            </section>

            <section className="developer-section">
                <div className="developer-section-header">
                    <span className="developer-section-label">ABOUT</span>
                    <h2>About Me</h2>
                </div>

                <p className="developer-description">
                    {developer.summary}
                </p>
            </section>

            <section className="developer-section">
                <div className="developer-section-header">
                    <span className="developer-section-label">PROJECTS</span>
                    <h2>Featured Projects</h2>
                </div>

                <div className="developer-projects">
                    {developer.projects.map((project) => (
                        <article
                            className="developer-project-card"
                            key={project.title}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                            />

                            <div className="developer-project-content">
                                <h3>{project.title}</h3>

                                <p>{project.description}</p>

                                <div className="developer-project-tech">
                                    {project.technologies.map((technology) => (
                                        <span key={technology}>
                                            {technology}
                                        </span>
                                    ))}
                                </div>

                                <div className="developer-project-links">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    )}

                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Live Project
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="developer-section">
                <div className="developer-section-header">
                    <span className="developer-section-label">EXPERIENCE</span>
                    <h2>Professional Experience</h2>
                </div>

                <div className="developer-experience">
                    {developer.experience.map((item) => (
                        <article
                            className="developer-experience-card"
                            key={`${item.company}-${item.role}`}
                        >
                            <h3>{item.role}</h3>
                            <span>{item.company}</span>
                            <small>{item.duration}</small>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="developer-section">
                <div className="developer-section-header">
                    <span className="developer-section-label">EDUCATION</span>
                    <h2>Education</h2>
                </div>

                <div className="developer-education">
                    {developer.education.map((item) => (
                        <article
                            className="developer-education-card"
                            key={item.degree}
                        >
                            <h3>{item.degree}</h3>
                            <p>{item.field}</p>

                            {item.institution && (
                                <span>{item.institution}</span>
                            )}

                            {item.duration && (
                                <small>{item.duration}</small>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            <section className="developer-section">
                <div className="developer-section-header">
                    <span className="developer-section-label">
                        ACHIEVEMENTS
                    </span>
                    <h2>Achievements</h2>
                </div>

                <div className="developer-achievements">
                    {developer.achievements.map((item) => (
                        <article
                            className="developer-achievement-card"
                            key={item.title}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="developer-section developer-contact">
                <div className="developer-section-header">
                    <span className="developer-section-label">CONTACT</span>
                    <h2>Let's Connect</h2>
                </div>

                <div className="developer-contact-info">
                    <div>
                        <span>Location</span>
                        <p>{developer.contact.location}</p>
                    </div>

                    <div>
                        <span>Phone</span>
                        <p>{developer.contact.phone}</p>
                    </div>

                    <div>
                        <span>Email</span>
                        <p>{developer.contact.email}</p>
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