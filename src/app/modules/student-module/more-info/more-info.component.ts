import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-more-info',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css'
})
export class MoreInfoComponent {

  course_name : string = "";


  

  courses = [
    {
      name: 'MBA in Digital Marketing',
      description: 'Master the skills to leverage digital platforms for marketing success.',
      details:
        'This course covers all aspects of digital marketing, including social media strategies, search engine optimization, and paid advertising. By the end, you will be able to design and execute campaigns that deliver measurable results.',
      features: ['Social Media Marketing', 'SEO & SEM', 'Content Strategy', 'Analytics Tools'],
      duration: '12 Months',
      fee: '₹10,000',
      link: 'https://www.youtube.com/watch?v=jshrMm9Rr8Y'
    },
    {
      name: 'Entrepreneurship and Business Development',
      description: 'Learn to build and scale your own business.',
      details:
        'This course provides a comprehensive guide to starting and managing a successful business. Topics include business planning, market analysis, investor relations, and growth strategies for startups.',
      features: ['Startup Fundamentals', 'Business Planning', 'Investor Relations', 'Growth Strategies'],
      duration: '6 Months',
      fee: '₹7,500',
      link: 'https://www.youtube.com/watch?v=0ofOXdgb46Y'
    },
    {
      name: 'Financial Management and Analysis',
      description: 'Develop expertise in financial decision-making and analysis.',
      details:
        'Dive deep into financial concepts such as budgeting, forecasting, risk assessment, and investment strategies. This course is ideal for aspiring financial analysts and business leaders.',
      features: ['Budgeting', 'Risk Management', 'Investment Strategies', 'Financial Reporting'],
      duration: '8 Months',
      fee: '₹8,000',
      link: 'https://www.youtube.com/watch?v=4VyHShtGq6E'
    },
    {
      name: 'Supply Chain Management',
      description: 'Optimize supply chain processes and logistics.',
      details:
        'This program teaches effective methods for inventory management, procurement, and logistics. Learn how to streamline operations and enhance the efficiency of supply chains globally.',
      features: ['Inventory Management', 'Procurement Strategies', 'Data Analytics', 'Global Logistics'],
      duration: '10 Months',
      fee: '₹9,000',
      link: 'https://www.youtube.com/watch?v=Fquewbx-isk'
    },
    {
      name: 'Business Analytics and Data Science',
      description: 'Harness the power of data to drive business decisions.',
      details:
        'Gain hands-on experience with data analysis tools and techniques to solve real-world business problems. Topics include machine learning, data visualization, and predictive modeling.',
      features: ['Data Visualization', 'Predictive Modeling', 'Machine Learning', 'Big Data Tools'],
      duration: '9 Months',
      fee: '₹11,000',
      link: 'https://www.youtube.com/watch?v=oseHCwDBfSE'
    }
  ];

  aiCourses = [
    {
      name: "Introduction to Artificial Intelligence",
      description: "Learn the basics of AI, including fundamental concepts, techniques, and applications.",
      details: "This beginner-friendly course covers AI history, machine learning basics, and ethical considerations.",
      features: [
        "Comprehensive introduction to AI concepts",
        "Hands-on Python projects",
        "Covers supervised and unsupervised learning"
      ],
      duration: "6 weeks",
      fee: "₹300",
      link: "https://example.com/introduction-to-ai"
    },
    {
      name: "Machine Learning with Python",
      description: "Master machine learning algorithms using Python and scikit-learn.",
      details: "Explore regression, classification, clustering, and neural networks with practical projects.",
      features: [
        "In-depth coverage of ML algorithms",
        "Real-world datasets and case studies",
        "Introduction to deep learning concepts"
      ],
      duration: "8 weeks",
      fee: "₹400",
      link: "https://example.com/machine-learning-python"
    },
    {
      name: "Deep Learning with TensorFlow",
      description: "Specialize in deep learning with hands-on TensorFlow projects and neural network design.",
      details: "Learn about convolutional, recurrent, and generative adversarial networks.",
      features: [
        "Advanced deep learning techniques",
        "Practical TensorFlow applications",
        "Focus on image and text data processing"
      ],
      duration: "10 weeks",
      fee: "₹500",
      link: "https://example.com/deep-learning-tensorflow"
    },
    {
      name: "Natural Language Processing (NLP)",
      description: "Gain expertise in processing and analyzing human language using advanced NLP techniques.",
      details: "Learn about sentiment analysis, chatbots, and machine translation.",
      features: [
        "Hands-on NLP projects",
        "Introduction to transformer models",
        "Applications in text and voice data"
      ],
      duration: "7 weeks",
      fee: "₹350",
      link: "https://example.com/nlp-course"
    },
    {
      name: "AI for Robotics",
      description: "Explore how AI powers robotics with path planning, computer vision, and control systems.",
      details: "Learn to design intelligent robots that interact with their environments.",
      features: [
        "Focus on real-world robotics applications",
        "Simulation and robotics frameworks",
        "Covers SLAM and reinforcement learning"
      ],
      duration: "9 weeks",
      fee: "₹450",
      link: "https://example.com/ai-for-robotics"
    },
    {
      name: "AI Ethics and Governance",
      description: "Understand the ethical challenges and governance policies in AI development and deployment.",
      details: "Focus on ethical decision-making and accountability in AI systems.",
      features: [
        "Case studies on AI ethics",
        "Legal implications of AI",
        "Frameworks for responsible AI development"
      ],
      duration: "4 weeks",
      fee: "₹200",
      link: "https://example.com/ai-ethics"
    }
  ];
  cybersecurityCourses = [
    {
      name: "Introduction to Cybersecurity",
      description: "Learn the fundamentals of cybersecurity and how to protect systems and networks from cyber threats.",
      details: "This beginner-friendly course covers basic cybersecurity concepts, terminologies, and tools.",
      features: [
        "Basics of cybersecurity and cryptography",
        "Introduction to threat modeling",
        "Hands-on practice with secure systems"
      ],
      duration: "6 weeks",
      fee: "₹250",
      link: "https://example.com/intro-to-cybersecurity"
    },
    {
      name: "Ethical Hacking and Penetration Testing",
      description: "Become a certified ethical hacker and learn penetration testing techniques.",
      details: "Focus on ethical hacking methodologies and tools for identifying vulnerabilities.",
      features: [
        "Network and web application penetration testing",
        "Hands-on Kali Linux labs",
        "Preparation for CEH certification"
      ],
      duration: "8 weeks",
      fee: "₹400",
      link: "https://example.com/ethical-hacking"
    },
    {
      name: "Network Security Essentials",
      description: "Master the skills to secure enterprise networks and prevent cyberattacks.",
      details: "This course covers firewalls, intrusion detection, and advanced networking security protocols.",
      features: [
        "Focus on securing network architecture",
        "Best practices for firewall configuration",
        "Introduction to intrusion detection systems"
      ],
      duration: "7 weeks",
      fee: "₹350",
      link: "https://example.com/network-security"
    },
    {
      name: "Advanced Cyber Threat Intelligence",
      description: "Specialize in identifying, analyzing, and responding to advanced cyber threats.",
      details: "Explore advanced threat intelligence strategies and proactive defense mechanisms.",
      features: [
        "Techniques to analyze malware",
        "Cyber threat intelligence tools and platforms",
        "Focus on proactive defense strategies"
      ],
      duration: "9 weeks",
      fee: "₹500",
      link: "https://example.com/threat-intelligence"
    },
    {
      name: "Cloud Security Fundamentals",
      description: "Learn to secure cloud-based systems and protect sensitive data in the cloud.",
      details: "This course covers cloud architecture, compliance, and risk management.",
      features: [
        "AWS and Azure security best practices",
        "Focus on data encryption and compliance",
        "Case studies on cloud breaches"
      ],
      duration: "6 weeks",
      fee: "₹300",
      link: "https://example.com/cloud-security"
    },
    {
      name: "Cybersecurity Risk Management",
      description: "Develop skills to identify, assess, and mitigate cybersecurity risks in organizations.",
      details: "Learn frameworks like NIST, ISO, and SOC for effective risk management.",
      features: [
        "Risk management frameworks and tools",
        "Strategies for organizational resilience",
        "Focus on governance, risk, and compliance (GRC)"
      ],
      duration: "5 weeks",
      fee: "₹280",
      link: "https://example.com/risk-management"
    }
  ];
  astrophysicsCourses = [
    {
      name: "Introduction to Astrophysics",
      description: "Learn the fundamental concepts of astrophysics, including stars, galaxies, and cosmology.",
      details: "This beginner-level course explores the structure and evolution of the universe.",
      features: [
        "Basics of star formation and evolution",
        "Introduction to galaxies and dark matter",
        "Hands-on simulations using astrophysics tools"
      ],
      duration: "6 weeks",
      fee: "₹300",
      link: "https://example.com/intro-to-astrophysics"
    },
    {
      name: "The Science of Black Holes",
      description: "Dive deep into the fascinating world of black holes and their impact on the universe.",
      details: "Learn about event horizons, gravitational waves, and black hole mergers.",
      features: [
        "In-depth coverage of black hole physics",
        "Einstein's theory of relativity",
        "Focus on observational techniques"
      ],
      duration: "8 weeks",
      fee: "₹400",
      link: "https://example.com/science-of-black-holes"
    },
    {
      name: "Space Exploration and Satellite Technology",
      description: "Discover how humans explore space and the role of satellites in modern science.",
      details: "Covers space missions, satellite design, and space industry trends.",
      features: [
        "History of space exploration",
        "Basics of satellite communication",
        "Hands-on project designing a nanosatellite"
      ],
      duration: "7 weeks",
      fee: "₹350",
      link: "https://example.com/space-exploration"
    },
    {
      name: "Cosmology: The Study of the Universe",
      description: "Explore the origin, evolution, and ultimate fate of the universe.",
      details: "Learn about the Big Bang theory, cosmic inflation, and dark energy.",
      features: [
        "Deep dive into cosmological models",
        "Observational astronomy techniques",
        "Introduction to large-scale structure formation"
      ],
      duration: "10 weeks",
      fee: "₹500",
      link: "https://example.com/cosmology"
    },
    {
      name: "Exoplanets and the Search for Life",
      description: "Study the discovery of exoplanets and the search for extraterrestrial life.",
      details: "Covers detection methods, habitability criteria, and ongoing missions.",
      features: [
        "Techniques to discover exoplanets",
        "Study of planetary atmospheres",
        "Focus on astrobiology and habitability zones"
      ],
      duration: "6 weeks",
      fee: "₹320",
      link: "https://example.com/exoplanets"
    },
    {
      name: "Astronomy with Data Science",
      description: "Learn how data science techniques are revolutionizing modern astronomy.",
      details: "Combine programming, data analysis, and astronomy to uncover cosmic phenomena.",
      features: [
        "Python-based data analysis tools",
        "Hands-on with real telescope datasets",
        "Applications in time-domain astronomy"
      ],
      duration: "8 weeks",
      fee: "₹450",
      link: "https://example.com/astronomy-data-science"
    }
  ];
  biotechnologyCourses = [
    {
      name: "Introduction to Biotechnology",
      description: "Learn the fundamental principles of biotechnology, including genetic engineering and molecular biology.",
      details: "Covers foundational concepts in biotech and applications in medicine, agriculture, and environment.",
      features: [
        "Basics of DNA and RNA manipulation",
        "Biotechnology in healthcare and agriculture",
        "Hands-on lab simulations"
      ],
      duration: "6 weeks",
      fee: "₹300",
      link: "https://example.com/intro-to-biotechnology"
    },
    {
      name: "Bioinformatics and Computational Biology",
      description: "Explore computational tools to analyze biological data and uncover genetic insights.",
      details: "Focus on genome sequencing, protein structure analysis, and big data in biology.",
      features: [
        "Python and R for bioinformatics",
        "Introduction to genomics and proteomics",
        "Hands-on with biological datasets"
      ],
      duration: "8 weeks",
      fee: "₹400",
      link: "https://example.com/bioinformatics"
    },
    {
      name: "Genetic Engineering and CRISPR Technology",
      description: "Master genetic engineering techniques with a focus on CRISPR-Cas9 technology.",
      details: "Learn to design, modify, and edit genetic material for research and therapeutic applications.",
      features: [
        "In-depth CRISPR-Cas9 training",
        "Focus on gene editing and genome therapy",
        "Ethical considerations in genetic engineering"
      ],
      duration: "7 weeks",
      fee: "₹450",
      link: "https://example.com/genetic-engineering"
    },
    {
      name: "Biotechnology in Medicine",
      description: "Understand how biotechnology is transforming medicine with innovations in drug discovery and diagnostics.",
      details: "Covers monoclonal antibodies, vaccines, and personalized medicine.",
      features: [
        "Techniques for biopharmaceutical development",
        "Focus on personalized medicine and diagnostics",
        "Case studies of biotech companies"
      ],
      duration: "9 weeks",
      fee: "₹500",
      link: "https://example.com/biotech-medicine"
    },
    {
      name: "Systems Biology and Omics Technologies",
      description: "Gain expertise in systems biology and omics technologies like genomics, transcriptomics, and metabolomics.",
      details: "Focus on high-throughput techniques for studying biological systems holistically.",
      features: [
        "Introduction to omics data integration",
        "Focus on systems-level analysis of cells",
        "Applications in disease research and therapy"
      ],
      duration: "10 weeks",
      fee: "₹480",
      link: "https://example.com/systems-biology"
    },
    {
      name: "Biotech Entrepreneurship and Innovation",
      description: "Learn how to start and manage a biotechnology company, from idea generation to commercialization.",
      details: "Explore biotech funding, patenting, and product development strategies.",
      features: [
        "Focus on biotech startup ecosystem",
        "Case studies of successful biotech ventures",
        "Guidance on funding and patents"
      ],
      duration: "5 weeks",
      fee: "₹250",
      link: "https://example.com/biotech-entrepreneurship"
    }
  ];
  telemedicineCourses = [
    {
      name: "Introduction to Telemedicine",
      description: "Understand the basics of telemedicine and its impact on modern healthcare systems.",
      details: "Covers the history, applications, and benefits of telemedicine for remote healthcare delivery.",
      features: [
        "Introduction to telemedicine platforms",
        "Benefits and limitations of telemedicine",
        "Overview of patient-provider interactions"
      ],
      duration: "4 weeks",
      fee: "₹200",
      link: "https://example.com/intro-to-telemedicine"
    },
    {
      name: "Remote Patient Monitoring Systems",
      description: "Learn about technologies for monitoring patient health remotely in real-time.",
      details: "Focus on wearable devices, sensors, and software for effective remote monitoring.",
      features: [
        "Introduction to wearable health devices",
        "Real-time health data analysis",
        "Case studies of remote patient monitoring systems"
      ],
      duration: "6 weeks",
      fee: "₹300",
      link: "https://example.com/remote-patient-monitoring"
    },
    {
      name: "Telehealth Implementation and Management",
      description: "Master the process of implementing and managing telehealth services in clinical settings.",
      details: "Learn strategies for launching and scaling telehealth solutions.",
      features: [
        "Guidelines for telehealth system setup",
        "Focus on legal and compliance aspects",
        "Integration with existing healthcare systems"
      ],
      duration: "8 weeks",
      fee: "₹400",
      link: "https://example.com/telehealth-implementation"
    },
    {
      name: "Digital Health Technologies and Innovation",
      description: "Explore the latest technologies powering digital health, including AI and mobile health apps.",
      details: "Covers the intersection of technology, healthcare delivery, and patient engagement.",
      features: [
        "AI in healthcare decision-making",
        "Mobile health applications",
        "Focus on patient engagement tools"
      ],
      duration: "7 weeks",
      fee: "₹350",
      link: "https://example.com/digital-health-tech"
    }
  ];
  fineArtsCourses = [
    {
      name: "Introduction to Fine Arts",
      description: "Explore the fundamentals of fine arts, including drawing, painting, and sculpture.",
      details: "Covers basic techniques and tools to build your artistic skills from the ground up.",
      features: [
        "Introduction to artistic mediums",
        "Hands-on exercises in drawing and painting",
        "Guidance from experienced instructors"
      ],
      duration: "6 weeks",
      fee: "₹250",
      link: "https://example.com/intro-to-fine-arts"
    },
    {
      name: "Digital Art and Design",
      description: "Learn to create stunning digital artwork using industry-standard software.",
      details: "Focus on Photoshop, Illustrator, and digital drawing techniques.",
      features: [
        "Introduction to digital tools",
        "Advanced techniques for digital illustration",
        "Portfolio creation guidance"
      ],
      duration: "8 weeks",
      fee: "₹400",
      link: "https://example.com/digital-art-design"
    },
    {
      name: "Creative Sculpture Techniques",
      description: "Master the art of sculpture using clay, wood, and mixed media.",
      details: "Hands-on training in creating three-dimensional art pieces.",
      features: [
        "Focus on clay modeling and carving",
        "Introduction to mixed media sculptures",
        "Final project showcase"
      ],
      duration: "7 weeks",
      fee: "₹350",
      link: "https://example.com/sculpture-techniques"
    },
    {
      name: "Graphic Design Essentials",
      description: "Develop essential graphic design skills for branding, marketing, and visual storytelling.",
      details: "Learn typography, color theory, and layout design for various projects.",
      features: [
        "Focus on Adobe Illustrator and Canva",
        "Real-world graphic design projects",
        "Build a professional design portfolio"
      ],
      duration: "10 weeks",
      fee: "₹450",
      link: "https://example.com/graphic-design-essentials"
    },
    {
      name: "Painting Mastery: Acrylic and Watercolors",
      description: "Delve into advanced painting techniques using acrylics and watercolors.",
      details: "Focus on techniques, color blending, and composition to create stunning artworks.",
      features: [
        "Hands-on acrylic painting techniques",
        "Watercolor blending and layering",
        "Focus on landscape and abstract art"
      ],
      duration: "9 weeks",
      fee: "₹400",
      
      link: "https://example.com/painting-mastery"
    },
    {
      name: "Fashion Design Basics",
      description: "Learn the fundamentals of fashion design, from sketching to creating your first garment.",
      details: "Focus on fashion illustration, fabric selection, and pattern making.",
      features: [
        "Introduction to fashion sketching",
        "Fabric selection and pattern-making",
        "Hands-on garment creation project"
      ],
      duration: "12 weeks",
      fee: "₹500",
      link: "https://example.com/fashion-design-basics"
    }
  ];
  networkSecurityCourses = [
    {
      name: "Introduction to Network Security",
      description: "Learn the fundamentals of network security, including basic principles and threat prevention techniques.",
      details: "Covers network layers, protocols, and the essential defenses against common network attacks.",
      features: [
        "Understanding of network layers and protocols",
        "Basic network defense mechanisms",
        "Introduction to firewalls and VPNs"
      ],
      duration: "5 weeks",
      fee: "₹250",
      link: "https://example.com/intro-to-network-security"
    },
    {
      name: "Designing Secure Network Architectures",
      description: "Learn how to design a secure network from the ground up, including risk management and threat modeling.",
      details: "Focus on creating resilient and secure networks for enterprises, including implementation of security controls.",
      features: [
        "Building secure network infrastructures",
        "Risk analysis and threat modeling",
        "Integration of security controls and systems"
      ],
      duration: "8 weeks",
      fee: "₹400",
      link: "https://example.com/designing-secure-network-architectures"
    },
    {
      name: "Advanced Firewall and Intrusion Detection Systems",
      description: "Dive deeper into advanced firewall configurations and intrusion detection/prevention systems.",
      details: "Learn how to configure and manage next-gen firewalls and IDS/IPS systems to protect network environments.",
      features: [
        "Advanced firewall configurations",
        "Intrusion detection and prevention",
        "Hands-on lab exercises"
      ],
      duration: "6 weeks",
      fee: "₹300",
      link: "https://example.com/advanced-firewall-ids"
    },
    {
      name: "Network Security Risk Management",
      description: "Understand the principles of risk management in network security, including risk assessment and mitigation strategies.",
      details: "Focus on identifying vulnerabilities, conducting risk assessments, and mitigating risks with strategic security measures.",
      features: [
        "Risk assessment methodologies",
        "Mitigation strategies for network vulnerabilities",
        "Security audits and compliance"
      ],
      duration: "7 weeks",
      fee: "₹350",
      link: "https://example.com/network-security-risk-management"
    },
    {
      name: "VPNs and Secure Communication Protocols",
      description: "Learn about Virtual Private Networks (VPNs) and other secure communication protocols used in network security.",
      details: "Focus on the implementation and management of VPNs, IPsec, SSL/TLS, and other encryption protocols for secure communication.",
      features: [
        "VPN implementation and management",
        "Understanding IPsec and SSL/TLS protocols",
        "Hands-on setup of secure communication systems"
      ],
      duration: "6 weeks",
      fee: "₹280",
      link: "https://example.com/vpns-secure-communication-protocols"
    },
    {
      name: "Cyber Threat Intelligence and Network Security",
      description: "Learn how to use cyber threat intelligence to enhance network security and protect against sophisticated attacks.",
      details: "Focus on integrating threat intelligence into network security strategies and responding to advanced persistent threats (APTs).",
      features: [
        "Integrating threat intelligence into security frameworks",
        "Analyzing and mitigating advanced persistent threats",
        "Tools for real-time network security monitoring"
      ],
      duration: "9 weeks",
      fee: "₹450",
      link: "https://example.com/cyber-threat-intelligence"
    }
  ];
  
}


