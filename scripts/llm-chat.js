// LLM Chat Integration for Portfolio

class PortfolioChat {
    constructor() {
        this.isCollapsed = false;
        this.isLoading = false;
        this.resumeData = this.getResumeData();
        this.conversationHistory = [];
        
        this.initializeChat();
        this.setupEventListeners();
    }
    
    getResumeData() {
        return {
            personal: {
                name: "Aviseth Kumar",
                title: "Software Engineer & Digital Craftsman",
                email: "aviseth@example.com",
                phone: "+1 (555) 123-4567",
                linkedin: "linkedin.com/in/aviseth",
                github: "github.com/aviseth",
                location: "San Francisco, CA"
            },
            summary: "Passionate software engineer with a deep appreciation for both cutting-edge technology and timeless design principles. Combines functionality with beauty, creating software that not only works flawlessly but also delights users with thoughtful design. Draws inspiration from architectural marvels, Gothic cathedrals, and Art Nouveau patterns.",
            experience: [
                {
                    title: "Senior Software Engineer",
                    company: "Tech Innovations Inc.",
                    period: "2022 - Present",
                    responsibilities: [
                        "Led development of scalable microservices architecture serving 1M+ users",
                        "Designed and implemented robust API systems with 99.9% uptime",
                        "Mentored junior developers and established coding best practices",
                        "Optimized database performance resulting in 40% faster query response times"
                    ]
                },
                {
                    title: "Full Stack Developer",
                    company: "Digital Dynamics",
                    period: "2020 - 2022",
                    responsibilities: [
                        "Developed responsive web applications using React and Node.js",
                        "Collaborated with UX/UI teams to create intuitive user interfaces",
                        "Implemented automated testing pipelines reducing bugs by 60%",
                        "Integrated third-party APIs and payment processing systems"
                    ]
                }
            ],
            skills: {
                languages: ["JavaScript", "Python", "Java", "TypeScript", "Go", "SQL"],
                frameworks: ["React", "Node.js", "Express", "Django", "Spring Boot", "Vue.js"],
                tools: ["Docker", "Kubernetes", "AWS", "PostgreSQL", "MongoDB", "Redis"]
            },
            projects: [
                {
                    name: "E-Commerce Platform",
                    description: "A comprehensive e-commerce solution built with microservices architecture, featuring real-time inventory management, payment processing, and advanced analytics.",
                    technologies: ["React", "Node.js", "PostgreSQL", "Docker"]
                },
                {
                    name: "AI-Powered Analytics Dashboard",
                    description: "An intelligent dashboard that provides real-time insights using machine learning algorithms, with beautiful data visualizations and predictive analytics.",
                    technologies: ["Python", "Django", "TensorFlow", "D3.js"]
                },
                {
                    name: "Real-time Chat Application",
                    description: "A modern chat application with end-to-end encryption, file sharing, video calls, and collaborative workspace features for teams.",
                    technologies: ["Vue.js", "Socket.io", "MongoDB", "WebRTC"]
                }
            ],
            education: [
                {
                    degree: "Master of Science in Computer Science",
                    institution: "Stanford University",
                    period: "2018 - 2020",
                    details: "Specialized in Machine Learning and Distributed Systems. Thesis on 'Optimizing Large-Scale Data Processing Pipelines'"
                },
                {
                    degree: "Bachelor of Engineering in Software Engineering",
                    institution: "MIT",
                    period: "2014 - 2018",
                    details: "Graduated Magna Cum Laude. President of Computer Science Society. Dean's List for 6 semesters."
                }
            ],
            interests: [
                "Architecture and design (Gothic cathedrals, Art Nouveau, Art Deco)",
                "Software craftsmanship and elegant code design",
                "Machine learning and AI",
                "Open source contributions",
                "Mentoring and knowledge sharing"
            ]
        };
    }
    
    initializeChat() {
        this.chatWidget = document.getElementById('chat-widget');
        this.chatBody = document.getElementById('chat-body');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-button');
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatHeader = document.getElementById('chat-header');
    }
    
    setupEventListeners() {
        // Toggle chat visibility
        this.chatHeader.addEventListener('click', () => this.toggleChat());
        
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize input
        this.chatInput.addEventListener('input', this.autoResizeInput.bind(this));
    }
    
    toggleChat() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.isCollapsed) {
            this.chatBody.classList.add('collapsed');
            this.chatToggle.innerHTML = '<span class="toggle-icon">⌃</span>';
        } else {
            this.chatBody.classList.remove('collapsed');
            this.chatToggle.innerHTML = '<span class="toggle-icon">⌄</span>';
        }
    }
    
    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isLoading) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Show loading
        this.showLoading();
        
        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.hideLoading();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideLoading();
            this.addMessage("I apologize, but I'm having trouble processing your request right now. Please try asking about Aviseth's experience, skills, education, or projects.", 'bot');
        }
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        // Add to conversation history
        this.conversationHistory.push({ role: sender === 'user' ? 'user' : 'assistant', content });
        
        this.scrollToBottom();
    }
    
    showLoading() {
        this.isLoading = true;
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot-message loading-message';
        loadingDiv.innerHTML = '<div class="message-content"><div class="loading"></div> Thinking...</div>';
        this.chatMessages.appendChild(loadingDiv);
        this.scrollToBottom();
    }
    
    hideLoading() {
        this.isLoading = false;
        const loadingMessage = this.chatMessages.querySelector('.loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }
    
    async getAIResponse(userMessage) {
        // Local AI response based on resume data
        return this.generateLocalResponse(userMessage);
    }
    
    generateLocalResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Experience related questions
        if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('career')) {
            return this.getExperienceResponse();
        }
        
        // Skills related questions
        if (message.includes('skill') || message.includes('technology') || message.includes('programming') || message.includes('language')) {
            return this.getSkillsResponse();
        }
        
        // Education related questions
        if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('college') || message.includes('study')) {
            return this.getEducationResponse();
        }
        
        // Projects related questions
        if (message.includes('project') || message.includes('portfolio') || message.includes('built') || message.includes('created')) {
            return this.getProjectsResponse();
        }
        
        // Personal/About questions
        if (message.includes('about') || message.includes('who') || message.includes('background') || message.includes('interests')) {
            return this.getAboutResponse();
        }
        
        // Contact questions
        if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
            return this.getContactResponse();
        }
        
        // Leadership and achievements
        if (message.includes('leadership') || message.includes('achieve') || message.includes('accomplish') || message.includes('mentor')) {
            return this.getLeadershipResponse();
        }
        
        // Technical depth questions
        if (message.includes('architecture') || message.includes('design') || message.includes('system') || message.includes('microservice')) {
            return this.getTechnicalResponse();
        }
        
        // Default response with suggestions
        return this.getDefaultResponse();
    }
    
    getExperienceResponse() {
        const exp = this.resumeData.experience;
        return `Aviseth has ${exp.length} major professional experiences:

🔹 **Current Role**: ${exp[0].title} at ${exp[0].company} (${exp[0].period})
   • Leading scalable microservices for 1M+ users
   • Achieved 99.9% API uptime
   • Mentored junior developers
   • Improved database performance by 40%

🔹 **Previous Role**: ${exp[1].title} at ${exp[1].company} (${exp[1].period})
   • Built responsive web applications with React/Node.js
   • Reduced bugs by 60% through automated testing
   • Integrated payment systems and third-party APIs

Aviseth brings a unique perspective combining technical expertise with design sensibility, drawing inspiration from architectural movements like Art Deco and Gothic design.`;
    }
    
    getSkillsResponse() {
        const skills = this.resumeData.skills;
        return `Aviseth has extensive technical expertise across multiple domains:

💻 **Programming Languages**: ${skills.languages.join(', ')}

🚀 **Frameworks & Libraries**: ${skills.frameworks.join(', ')}

🛠️ **Tools & Technologies**: ${skills.tools.join(', ')}

Aviseth particularly excels in full-stack development, microservices architecture, and creating scalable systems. Their approach combines modern technology with thoughtful design principles, ensuring both functionality and user delight.`;
    }
    
    getEducationResponse() {
        const edu = this.resumeData.education;
        return `Aviseth has an impressive educational background:

🎓 **${edu[0].degree}**
   📍 ${edu[0].institution} (${edu[0].period})
   📋 ${edu[0].details}

🎓 **${edu[1].degree}**
   📍 ${edu[1].institution} (${edu[1].period})
   📋 ${edu[1].details}

This strong academic foundation in computer science, combined with specialization in Machine Learning and Distributed Systems, provides the theoretical depth behind Aviseth's practical expertise.`;
    }
    
    getProjectsResponse() {
        const projects = this.resumeData.projects;
        return `Aviseth has built several impressive projects:

🛍️ **E-Commerce Platform**
   A comprehensive solution with microservices architecture, real-time inventory, and analytics.
   Tech: React, Node.js, PostgreSQL, Docker

📊 **AI-Powered Analytics Dashboard**
   Intelligent dashboard with ML algorithms, beautiful visualizations, and predictive analytics.
   Tech: Python, Django, TensorFlow, D3.js

💬 **Real-time Chat Application**
   Modern chat app with encryption, file sharing, video calls, and team collaboration.
   Tech: Vue.js, Socket.io, MongoDB, WebRTC

Each project demonstrates Aviseth's ability to combine cutting-edge technology with user-focused design.`;
    }
    
    getAboutResponse() {
        return `Aviseth Kumar is a passionate Software Engineer & Digital Craftsman who brings a unique perspective to technology:

🎨 **Design Philosophy**: Believes in combining functionality with beauty, creating software that works flawlessly while delighting users with thoughtful design.

🏛️ **Inspiration Sources**: Draws from architectural marvels including Gothic cathedrals, Art Nouveau patterns, and Art Deco geometries, which influence their approach to software design.

💡 **Core Values**: 
   • Software craftsmanship and elegant code
   • Bridging classical design with contemporary technology
   • Mentoring and knowledge sharing
   • Continuous learning and curiosity

🌟 **Unique Approach**: Like master artisans of the Art Deco era, Aviseth creates solutions that are both technically robust and aesthetically pleasing.`;
    }
    
    getContactResponse() {
        const contact = this.resumeData.personal;
        return `You can reach Aviseth through multiple channels:

📧 **Email**: ${contact.email}
📱 **Phone**: ${contact.phone}
💼 **LinkedIn**: ${contact.linkedin}
👨‍💻 **GitHub**: ${contact.github}
📍 **Location**: ${contact.location}

Aviseth is always open to discussing interesting projects, collaboration opportunities, or sharing insights about software engineering and design. Feel free to reach out!`;
    }
    
    getLeadershipResponse() {
        return `Aviseth demonstrates strong leadership and mentoring capabilities:

👥 **Team Leadership**: Currently leads development teams in creating scalable microservices architecture serving over 1 million users.

🎯 **Mentorship**: Actively mentors junior developers and has established coding best practices across teams.

🏆 **Academic Achievement**: Served as President of Computer Science Society during undergraduate studies and maintained Dean's List status for 6 semesters.

📈 **Performance Impact**: Delivered measurable results including 40% improvement in database performance and 60% reduction in bugs through automated testing.

🌟 **Vision**: Combines technical leadership with design thinking, inspiring teams to create software that's both functional and beautiful.`;
    }
    
    getTechnicalResponse() {
        return `Aviseth excels in system architecture and technical design:

🏗️ **Microservices Architecture**: Expert in designing and implementing scalable microservices that serve millions of users with 99.9% uptime.

🔧 **API Design**: Creates robust, well-documented APIs that are both performant and developer-friendly.

📊 **Database Optimization**: Achieved 40% performance improvements through strategic database design and query optimization.

🔒 **System Reliability**: Implements comprehensive testing pipelines and monitoring systems to ensure production stability.

🎨 **Design-Driven Development**: Applies architectural design principles (inspired by Art Deco and Gothic styles) to create elegant, maintainable code structures.

☁️ **Cloud & DevOps**: Proficient with containerization, Kubernetes orchestration, and AWS cloud services.`;
    }
    
    getDefaultResponse() {
        const suggestions = [
            "Ask about Aviseth's work experience",
            "Inquire about technical skills and expertise",
            "Learn about educational background",
            "Explore featured projects and achievements",
            "Discover leadership and mentoring experience",
            "Get contact information",
            "Learn about design philosophy and interests"
        ];
        
        return `I'm here to help you learn about Aviseth Kumar! Here are some things you can ask me:

${suggestions.map(s => `• ${s}`).join('\n')}

Feel free to ask specific questions about any aspect of Aviseth's background, experience, or expertise. I'm designed to provide detailed, helpful information for potential employers and collaborators.`;
    }
    
    autoResizeInput() {
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = this.chatInput.scrollHeight + 'px';
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PortfolioChat();
});

// Add some helpful context responses for common questions
const contextResponses = {
    greeting: "Hello! I'm here to help you learn about Aviseth Kumar. What would you like to know?",
    farewell: "Thank you for your interest in Aviseth! Feel free to reach out directly using the contact information provided.",
    clarification: "Could you be more specific? I can help with questions about experience, skills, education, projects, or contact information."
};