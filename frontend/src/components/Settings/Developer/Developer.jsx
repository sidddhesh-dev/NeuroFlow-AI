import "./Developer.css";

import profilePhoto from "../../../assets/developer/profile.png";
import resumePdf from "../../../assets/developer/resume.pdf";

import neuroflowImage from "../../../assets/developer/NeuroFlow-AI.png";
import jobTrackImage from "../../../assets/developer/JobTrack.png";
import buyNgoImage from "../../../assets/developer/BuyNGo.png";

function Developer() {

    const developer = {

        hero: {

            image: profilePhoto,

            name: "Siddhesh Thorat",

            role: "Backend & AI Software Engineer",

            location: "Pune, Maharashtra, India",

            status: "Open To Work",

        },

        about: {

            title: "About Me",

            description:
                "Backend & AI Software Engineer passionate about building scalable backend systems, AI-powered applications, Retrieval-Augmented Generation (RAG), and production-ready software. NeuroFlow AI represents my journey of learning modern software engineering while building a real-world AI platform from scratch.",

        },

        skills: {

            backend: [
                "Python",
                "Django",
                "Django REST Framework",
                "REST APIs",
            ],

            frontend: [
                "React",
                "JavaScript",
                "HTML",
                "CSS",
            ],

            ai: [
                "Gemini",
                "Prompt Engineering",
                "RAG",
                "ChromaDB",
            ],

            devops: [
                "Docker",
                "Redis",
                "Celery",
                "Git",
            ],

            database: [
                "SQLite",
                "MySQL",
                "PostgreSQL",
            ],

        },

        projects: [

            {

                title: "NeuroFlow AI",

                image: neuroflowImage,

                description:
                    "Production-ready AI workspace featuring document intelligence, RAG, semantic search, conversational AI, authentication, notes, history, and scalable backend architecture.",

                technologies: [
                    "React",
                    "Django",
                    "Gemini",
                    "Docker",
                    "Redis",
                    "Celery",
                ],

                github: "",

                live: "",

                featured: true,

            },

            {

                title: "Job Tracking Application",

                image: jobTrackImage,

                description:
                    "Django-based job tracking system for managing applications and interviews.",

                technologies: [
                    "Python",
                    "Django",
                    "SQLite",
                ],

                github: "",

                live: "",

            },

            {

                title: "BuyNGo",

                image: buyNgoImage,

                description:
                    "E-commerce website integrated with third-party product APIs.",

                technologies: [
                    "Python",
                    "Django",
                    "REST API",
                ],

                github: "",

                live: "",

            },

        ],

        experience: [

            {

                company:
                    "TestYantra Software Solutions Pvt. Ltd.",

                role:
                    "Python Developer Intern",

                duration:
                    "Jan 2025 – Oct 2025",

                responsibilities: [

                    "Developed backend modules using Django.",

                    "Built REST APIs.",

                    "Optimized database queries.",

                    "Implemented CRUD operations.",

                    "Debugged and tested production features.",

                ],

            },

        ],

        education: [

            {

                degree:
                    "Bachelor of Engineering",

                specialization:
                    "Computer Engineering",

                institute:
                    "Bharat College of Engineering",

                duration:
                    "2022 – 2025",

            },

            {

                degree:
                    "Diploma",

                specialization:
                    "Computer Engineering",

                institute:
                    "Government Polytechnic",

                duration:
                    "2019 – 2022",

            },

        ],

        achievements: [

            {

                title:
                    "TCS NQT 2026",

                description:
                    "Qualified TCS Hiring Process.",

            },

            {

                title:
                    "Python Internship",

                description:
                    "Completed internship at TestYantra Software Solutions.",

            },

        ],

        social: {

            github: "",

            linkedin: "",

            portfolio: "",

            leetcode: "",

            hackerrank: "",

            email:
                "mailto:siddheshthorat59@gmail.com",

            resume:
                resumePdf,

        },

    };

    return (

        
         

        <div className="developer-page">

            <h2>

                Developer Portfolio

            </h2>

            <p>

                Portfolio data prepared successfully.
                {developer.hero.name}

            </p>

        </div>

        

        

    );

}

export default Developer;