export interface ProgramStat {
  icon: "calendar" | "labs" | "projects" | "internship";
  value: string;
  label: string;
}

export interface ModuleData {
  id: number;
  number: number;
  title: string;
  topics: string[];
  practical: string[];
  tools?: string[];
}

export interface CareerNode {
  id: number;
  role: string;
  x: number;
  y: number;
  labelOffsetX: number;
  labelOffsetY: number;
  rotate?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ToolItem {
  id: number;
  name: string;
  src: string;
}

export interface ProgramDetail {
  id: number;
  slug: string;
  title: string;
  highlightedTitle: string;
  subtitleTag: string;
  description: string;
  image: string;
  duration: string;
  type: string;
  category: "Cyber Security" | "Robotics" | "Startups" | "Marketing";
  stats: ProgramStat[];
  whyLearn: {
    headingHighlight?: string;
    cards: { id: number; title: string; desc: string }[];
    futureSkills: string[];
    eligibilityDegrees: string[];
    eligibilityNote: string;
  };
  internship: {
    duration: string;
    subtitle: string;
    col1: string[];
    col2: string[];
    quote: string;
    badgeText: string;
  };
  modules: ModuleData[];
  roadmapNodes: CareerNode[];
  faqs: FAQItem[];
  cta: {
    prefix: string;
    highlighted: string;
    suffix: string;
    subtitle: string;
    buttonText?: string;
  };
}

export const programsData: ProgramDetail[] = [
  // 1. AI & CYBER SECURITY (COLLEGE STUDENTS)
  {
    id: 1,
    slug: "ai-cyber-security",
    title: "Future Proof Your Career With",
    highlightedTitle: "AI & Cyber Security",
    subtitleTag: "6 Month Industry Oriented Certification Program",
    description:
      "Master Cyber Security with AI through practical training, real-world projects, and industry internships designed for college students.",
    image: "/hero/1.png",
    duration: "6 Months",
    type: "Internship",
    category: "Cyber Security",
    stats: [
      { icon: "calendar", value: "6 Months", label: "live program" },
      { icon: "labs", value: "150+", label: "hands-on labs" },
      { icon: "projects", value: "25+", label: "industry projects" },
      { icon: "internship", value: "1 Month", label: "internship" },
    ],
    whyLearn: {
      headingHighlight: "AI Integrated Cyber Security?",
      cards: [
        {
          id: 1,
          title: "AI Powered Security",
          desc: "Learn how Artificial Intelligence transforms modern cyber defense through automated threat hunting and pattern recognition.",
        },
        {
          id: 2,
          title: "Real Industry Labs",
          desc: "Practice inside simulated enterprise environments, dealing with real attack vectors and sophisticated defense tools.",
        },
        {
          id: 3,
          title: "Industry Internship",
          desc: "Gain practical experience through real-world industry exposure, working on live projects under professional mentorship.",
        },
        {
          id: 4,
          title: "Career Support",
          desc: "Comprehensive assistance including resume building, LinkedIn optimization, mock interviews, and placement assistance.",
        },
      ],
      futureSkills: ["Cloud Security", "SOC Operations", "Threat Hunting", "AI Security", "Automation"],
      eligibilityDegrees: ["B.Tech", "BCA", "MCA", "B.Sc Computer Science", "B.Sc IT", "Diploma Students"],
      eligibilityNote: "Degree Students From Any Stream Interested In Cyber Security",
    },
    internship: {
      duration: "1-Month",
      subtitle: "Bridge the gap between learning and earning with real-world exposure.",
      col1: ["Industry mentor", "Team collaboration", "Internship certificate"],
      col2: ["Live project experience", "Weekly evaluations", "Experience letter*"],
      quote: "Eligible students who successfully complete academic requirements will receive internship opportunities through the institute's industry network, subject to partner company availability and selection processes.",
      badgeText: "JOINED BY 25000+ STUDENTS",
    },
    modules: [
      {
        id: 1,
        number: 1,
        title: "Module 1 — Foundations of Cyber Security",
        topics: [
          "Introduction to Cyber Security",
          "Information Security Principles",
          "CIA Triad",
          "Cyber Threat Landscape",
          "Cyber Crimes & Threat Actors",
          "Malware Analysis Basics",
          "Password Security & MFA",
          "Authentication Methods",
          "Digital Footprints",
          "Cyber Laws & Ethics",
          "Safe Internet Practices",
          "Security Awareness",
        ],
        practical: [
          "Installing a Virtual Lab",
          "Windows Security Configuration",
          "Linux Basics",
          "Creating Secure Password Policies",
          "Malware Identification",
          "Security Awareness Exercises",
        ],
      },
      {
        id: 2,
        number: 2,
        title: "Module 2 — Networking & System Security",
        topics: [
          "Computer Networks Architecture",
          "OSI Model & TCP/IP Stack",
          "Routing & Switching",
          "DNS & DHCP Protocols",
          "Firewalls & Packet Filters",
          "VPN & Secure Tunnels",
          "Email Security Protocols",
          "Web Security Fundamentals",
          "Secure Network Design",
        ],
        practical: [
          "Packet Analysis Using Wireshark",
          "Network Scanning with Nmap",
          "Firewall Rule Configuration",
          "Secure Network Setup",
          "Virtual Networking Labs",
        ],
      },
      {
        id: 3,
        number: 3,
        title: "Module 3 — Linux for Cyber Security",
        topics: [
          "Linux Installation & Arch",
          "Terminal Commands & Pipes",
          "File Permissions & ACLs",
          "User & Group Management",
          "Bash Scripting Automation",
          "SSH Key Authentication",
          "Cron Jobs & Services",
          "Linux Log Investigation",
          "Server Hardening",
        ],
        practical: [
          "Linux Server Administration",
          "User Access Management",
          "Security Hardening",
          "Shell Script Automation",
          "SSH Configuration",
          "Linux Log Investigation",
        ],
      },
      {
        id: 4,
        number: 4,
        title: "Module 4 — Ethical Hacking & Penetration Testing",
        topics: [
          "Ethical Hacking Methodology",
          "Reconnaissance & OSINT",
          "Port Scanning & Enumeration",
          "Vulnerability Assessment",
          "Exploitation Basics",
          "Privilege Escalation",
          "Web Application Security",
          "Wireless Network Security",
        ],
        practical: [
          "Nmap Reconnaissance",
          "Burp Suite Web Proxying",
          "Metasploit Framework",
          "OWASP Top 10 Labs",
          "DVWA Exploitation",
          "Controlled Exploitation Labs",
        ],
      },
      {
        id: 5,
        number: 5,
        title: "Module 5 — Artificial Intelligence in Cyber Security",
        topics: [
          "Introduction to AI & Machine Learning",
          "AI-Powered Threat Detection",
          "AI for Automated Malware Analysis",
          "AI Security Automation & SOAR",
          "AI-Assisted Security Operations",
          "Generative AI Risks & Prompt Injection",
          "LLM Security & Defense",
          "AI Governance & Policy",
        ],
        practical: [
          "AI-Based Threat Analysis",
          "AI-Assisted Log Analysis",
          "Security Automation Workflows",
          "Prompt Injection Testing in Sandbox",
          "AI Security Tool Exploration",
        ],
      },
      {
        id: 6,
        number: 6,
        title: "Module 6 — Security Operations Center (SOC)",
        topics: [
          "SOC Fundamentals & Tiers",
          "Security Monitoring Architecture",
          "Incident Response Lifecycle",
          "SIEM Architecture & Ingestion",
          "Threat Intelligence (CTI)",
          "MITRE ATT&CK Framework",
          "Threat Hunting Playbooks",
          "Incident Detection & Triage",
        ],
        practical: [
          "SIEM Dashboard Configuration",
          "Log Investigation & Querying",
          "Incident Simulation Exercises",
          "Threat Detection Rules",
          "AI-Assisted Threat Hunting",
        ],
        tools: ["Splunk", "Wazuh", "ELK Stack", "ChatGPT", "VirusTotal"],
      },
      {
        id: 7,
        number: 7,
        title: "Module 7 — Cloud Security",
        topics: [
          "Cloud Security Fundamentals",
          "AWS & Azure Security Services",
          "Identity & Access Management (IAM)",
          "Cloud Threat Vectors & Misconfigurations",
          "Cloud Compliance & Posture Management",
          "Secure Cloud Architecture",
          "Cloud Logging & Monitoring",
        ],
        practical: [
          "AWS IAM Least Privilege Setup",
          "Cloud Security Audit Labs",
          "CloudWatch / Sentinel Monitoring",
          "S3 Bucket Hardening",
          "Secure VPC Network Setup",
        ],
      },
      {
        id: 8,
        number: 8,
        title: "Module 8 — Digital Forensics & Incident Investigation",
        topics: [
          "Digital Forensics Fundamentals",
          "Digital Evidence Chain of Custody",
          "Evidence Collection & Preservation",
          "Memory & RAM Analysis",
          "Disk Forensics & Artifacts",
          "Email & Network Forensics",
          "Forensic Report Documentation",
        ],
        practical: [
          "Autopsy Disk Forensics",
          "FTK Imager Image Acquisition",
          "Volatility Memory Investigation",
          "Email Header Analysis",
          "Forensic Case Report Writing",
        ],
      },
      {
        id: 9,
        number: 9,
        title: "Module 9 — Web Security & Bug Bounty Basics",
        topics: [
          "OWASP Top 10 Deep Dive",
          "SQL Injection (SQLi) Prevention",
          "Cross-Site Scripting (XSS)",
          "Authentication & Session Flaws",
          "API Security Testing",
          "Secure Code Review Guidelines",
          "Responsible Disclosure",
        ],
        practical: [
          "OWASP Juice Shop Labs",
          "SQL Injection Exploitation & Defense",
          "Stored & Reflected XSS Labs",
          "JWT & Token Security Testing",
          "API Pentesting with Postman",
        ],
      },
      {
        id: 10,
        number: 10,
        title: "Module 10 — Career Preparation & Industry Readiness",
        topics: [
          "Resume Building & ATS Optimization",
          "LinkedIn & GitHub Portfolio",
          "Cyber Security Career Pathways",
          "Technical & Scenario Interviews",
          "HR Round Preparation",
          "Placement Guidance & Networking",
        ],
        practical: [
          "Resume 1-on-1 Review",
          "Portfolio Project Showcase",
          "Mock Technical Interviews",
          "Group Discussions & Scenario Tests",
        ],
      },
    ],
    roadmapNodes: [
      { id: 1, role: "Cyber Security Analyst", x: 110, y: 430, labelOffsetX: -20, labelOffsetY: -35, rotate: "0deg" },
      { id: 2, role: "SOC Analyst (L1)", x: 260, y: 330, labelOffsetX: -110, labelOffsetY: -35, rotate: "-14deg" },
      { id: 3, role: "Information Security Associate", x: 350, y: 325, labelOffsetX: -30, labelOffsetY: 25, rotate: "0deg" },
      { id: 4, role: "Junior VAPT Analyst", x: 365, y: 210, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 5, role: "Security Operations Associate", x: 495, y: 175, labelOffsetX: 10, labelOffsetY: -32, rotate: "-20deg" },
      { id: 6, role: "Cloud Security Associate", x: 595, y: 275, labelOffsetX: -30, labelOffsetY: 25, rotate: "-12deg" },
      { id: 7, role: "IT Security Support Engineer", x: 755, y: 195, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 8, role: "Security Consultant", x: 870, y: 130, labelOffsetX: -120, labelOffsetY: -35, rotate: "0deg" },
    ],
    faqs: [
      {
        id: 1,
        question: "Who can enroll in this program?",
        answer: "Our programs are designed for college students, recent graduates, IT enthusiasts, and career switchers looking to build in-demand cybersecurity skills from foundational principles to advanced practical applications.",
      },
      {
        id: 2,
        question: "Do I need prior coding or cybersecurity experience?",
        answer: "No prior coding experience is required. We start with foundational terminal commands, networking fundamentals, and computer security concepts before moving into advanced hands-on penetration testing and AI security.",
      },
      {
        id: 3,
        question: "Is the course completely online?",
        answer: "Yes, the entire program is conducted online with live interactive mentor-led classes, virtual browser labs, 24/7 LMS access to recorded sessions, and real-time doubt resolution support.",
      },
      {
        id: 4,
        question: "What is the duration of the program?",
        answer: "The program runs for 6 months, comprising live instructional modules, weekly hands-on practical lab exercises, project reviews, and a 1-month dedicated industry internship.",
      },
      {
        id: 5,
        question: "Will I receive an internship?",
        answer: "Yes, eligible students who successfully complete the coursework and assignments receive a 1-month industry internship opportunity with live project experience, mentorship, and an official experience letter.",
      },
      {
        id: 6,
        question: "Can college students manage this along with semester exams?",
        answer: "Yes! Our class schedules are planned with evening and weekend live classes, and all recordings and lab guides are accessible anytime through our LMS.",
      },
      {
        id: 7,
        question: "Will I receive placement assistance?",
        answer: "Yes, we provide end-to-end career guidance including resume building, LinkedIn optimization, 1-on-1 mock technical and HR interviews, portfolio reviews, and direct hiring partner referrals.",
      },
      {
        id: 8,
        question: "How do I apply?",
        answer: "You can submit your application directly on our website. Our admissions counselor will schedule a quick consultation to guide you through batch timings and onboarding.",
      },
    ],
    cta: {
      prefix: "Ready to Become an",
      highlighted: "AI-Powered",
      suffix: "Cyber Security Professional?",
      subtitle: "Build real skills. Work on real projects. Gain industry exposure. Start your cybersecurity career with confidence.",
      buttonText: "Book Now",
    },
  },

  // 2. WORKING PROFESSIONALS CYBERSECURITY (EXECUTIVE)
  {
    id: 2,
    slug: "working-professionals-cybersecurity",
    title: "Elevate Your Tech Career With",
    highlightedTitle: "AI Integrated Cyber Security",
    subtitleTag: "2 Month Advanced Executive Program for Professionals",
    description:
      "Tailored for working engineers to master next-gen security operations, automated incident response, threat intelligence, and cloud forensics.",
    image: "/hero/2.png",
    duration: "2 Months",
    type: "Internship",
    category: "Cyber Security",
    stats: [
      { icon: "calendar", value: "2 Months", label: "weekend batches" },
      { icon: "labs", value: "80+", label: "advanced labs" },
      { icon: "projects", value: "12+", label: "case studies" },
      { icon: "internship", value: "1-on-1", label: "mentorship" },
    ],
    whyLearn: {
      headingHighlight: "Advanced AI Cyber Security?",
      cards: [
        {
          id: 1,
          title: "Executive Weekend Format",
          desc: "Live interactive Saturday & Sunday sessions designed to fit alongside your demanding work commitments.",
        },
        {
          id: 2,
          title: "Advanced Threat Intelligence",
          desc: "Master automated MITRE ATT&CK mapping, SOAR automation, and real-time adversary emulation.",
        },
        {
          id: 3,
          title: "Cloud & DevSecOps",
          desc: "Implement enterprise Zero-Trust architectures, AWS/Azure Sentinel monitoring, and CI/CD security gates.",
        },
        {
          id: 4,
          title: "Executive Transition",
          desc: "Direct 1-on-1 career strategy sessions and executive resume positioning for Senior, Lead, and CISO track roles.",
        },
      ],
      futureSkills: ["Cloud Forensics", "SIEM/SOAR", "Zero Trust Architecture", "DevSecOps", "Threat Intel"],
      eligibilityDegrees: ["Working IT Engineers", "System Administrators", "Network Engineers", "Software Developers", "Security Analysts"],
      eligibilityNote: "Working Professionals with 1+ Years IT, Networking or Engineering Experience",
    },
    internship: {
      duration: "Executive",
      subtitle: "Accelerate your transition into high-paying enterprise cyber security roles.",
      col1: ["Executive mentorship", "Live incident simulations", "Executive certificate"],
      col2: ["Enterprise case studies", "1-on-1 career strategy", "Peer networking"],
      quote: "Designed for working professionals seeking strategic career elevation into security engineering, threat intelligence, and senior leadership positions.",
      badgeText: "JOINED BY 8000+ WORKING PROFESSIONALS",
    },
    modules: [
      {
        id: 1,
        number: 1,
        title: "Module 1 — Advanced Threat Intelligence & AI SIEM",
        topics: [
          "Enterprise SIEM Architecture",
          "Automated Threat Intelligence (CTI)",
          "MITRE ATT&CK Framework Mapping",
          "AI-Assisted Threat Hunting",
          "Log Ingestion & Correlation at Scale",
        ],
        practical: [
          "Splunk & Wazuh Enterprise Setup",
          "Developing Custom Detection Rules",
          "AI Log Anomaly Detection",
        ],
      },
      {
        id: 2,
        number: 2,
        title: "Module 2 — Cloud Forensics & Incident Response (DFIR)",
        topics: [
          "Cloud Forensic Acquisition",
          "AWS GuardDuty & Azure Sentinel Integration",
          "Memory Dump & Volatility Analysis",
          "Ransomware Incident Containment",
        ],
        practical: [
          "Live Incident Triage in AWS",
          "Automated Sandbox Malware Analysis",
          "DFIR Executive Report Writing",
        ],
      },
      {
        id: 3,
        number: 3,
        title: "Module 3 — Zero Trust & Identity Security (IAM)",
        topics: [
          "Zero Trust Architecture (ZTA)",
          "Privileged Access Management (PAM)",
          "SAML, OAuth & Federated Identity",
          "Multi-Cloud Security Posture",
        ],
        practical: [
          "Configuring Conditional Access Policies",
          "Auditing Enterprise Cloud Permissions",
          "Micro-segmentation Setup",
        ],
      },
      {
        id: 4,
        number: 4,
        title: "Module 4 — DevSecOps & Enterprise Architecture",
        topics: [
          "Shift-Left Security Framework",
          "SAST / DAST in CI/CD Pipelines",
          "Container & Kubernetes Security",
          "Infrastructure as Code (IaC) Scanning",
        ],
        practical: [
          "Integrating Security Scanners in GitHub Actions",
          "Securing Docker & K8s Clusters",
          "Terraform Security Audits",
        ],
      },
      {
        id: 5,
        number: 5,
        title: "Module 5 — Red Teaming & Advanced PenTesting",
        topics: [
          "Adversary Emulation & Evasion",
          "Active Directory Pentesting",
          "Privilege Escalation in Windows Domains",
          "Cloud Infrastructure Exploitation",
        ],
        practical: [
          "BloodHound & Mimikatz Labs",
          "Command & Control (C2) Simulations",
          "Remediation Verification",
        ],
      },
      {
        id: 6,
        number: 6,
        title: "Module 6 — Leadership & CISO Readiness",
        topics: [
          "Cyber Risk Governance & ISO 27001",
          "Security Budgeting & Vendor Assessment",
          "Executive Communication with Board",
          "Interview Prep for Senior Roles",
        ],
        practical: [
          "Executive Board Pitch Simulation",
          "Designing an Enterprise Security Policy",
          "1-on-1 Profile Optimization",
        ],
      },
    ],
    roadmapNodes: [
      { id: 1, role: "Senior SOC Engineer", x: 110, y: 430, labelOffsetX: -20, labelOffsetY: -35, rotate: "0deg" },
      { id: 2, role: "Threat Intel Specialist", x: 260, y: 330, labelOffsetX: -110, labelOffsetY: -35, rotate: "-14deg" },
      { id: 3, role: "Lead Security Architect", x: 350, y: 325, labelOffsetX: -30, labelOffsetY: 25, rotate: "0deg" },
      { id: 4, role: "Cloud Security Engineer", x: 365, y: 210, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 5, role: "Incident Commander", x: 495, y: 175, labelOffsetX: 10, labelOffsetY: -32, rotate: "-20deg" },
      { id: 6, role: "Principal Consultant", x: 595, y: 275, labelOffsetX: -30, labelOffsetY: 25, rotate: "-12deg" },
      { id: 7, role: "Deputy CISO", x: 755, y: 195, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 8, role: "CISO / Security Director", x: 870, y: 130, labelOffsetX: -120, labelOffsetY: -35, rotate: "0deg" },
    ],
    faqs: [
      {
        id: 1,
        question: "How are the classes scheduled for working professionals?",
        answer: "Classes are held exclusively on Saturday and Sunday evenings, leaving your weekdays free. All sessions are recorded in HD and available on LMS.",
      },
      {
        id: 2,
        question: "Can I transition from developer / sysadmin into security?",
        answer: "Yes! This program is specifically engineered to bridge the gap from standard IT/software roles into high-paying cybersecurity and DevSecOps specializations.",
      },
      {
        id: 3,
        question: "Will I get access to real cloud lab environments?",
        answer: "Yes, you will receive hands-on access to pre-configured enterprise sandboxes covering AWS Security, Splunk Enterprise, and AD labs.",
      },
      {
        id: 4,
        question: "Is there 1-on-1 mentorship included?",
        answer: "Yes, each participant receives personalized 1-on-1 strategy sessions with senior security architects for resume restructuring and interview prep.",
      },
      {
        id: 5,
        question: "Can my employer sponsor my enrollment?",
        answer: "Yes, we provide corporate invoices and sponsorship documentation for company learning & development reimbursement.",
      },
      {
        id: 6,
        question: "How is AI integrated into this executive curriculum?",
        answer: "You will master AI-driven SOAR pipelines, automated log anomaly detection with LLMs, and prompt injection threat mitigation.",
      },
      {
        id: 7,
        question: "What certification will I receive upon completion?",
        answer: "You will receive an Executive Certificate in AI Integrated Cyber Security with verified project credentials to showcase on LinkedIn.",
      },
      {
        id: 8,
        question: "How do I secure my seat?",
        answer: "Apply online to schedule an executive admission consultation to review your experience profile and upcoming cohort availability.",
      },
    ],
    cta: {
      prefix: "Ready to Accelerate Your",
      highlighted: "AI-Integrated",
      suffix: "Cyber Security Career?",
      subtitle: "Master high-impact enterprise defense skills on weekends without pausing your current job.",
      buttonText: "Enroll Now",
    },
  },

  // 3. ROBOTICS & IOT
  {
    id: 3,
    slug: "robotics-iot",
    title: "Build The Next Generation of",
    highlightedTitle: "Robotics & IoT",
    subtitleTag: "4 Month Hardware & Embedded Systems Program",
    description:
      "Gain end-to-end practical mastery in microcontrollers, ROS2, sensor fusion, PCB prototyping, and connected IoT smart ecosystems.",
    image: "/hero/3.png",
    duration: "4 Months",
    type: "Internship",
    category: "Robotics",
    stats: [
      { icon: "calendar", value: "4 Months", label: "live build" },
      { icon: "labs", value: "100+", label: "hardware labs" },
      { icon: "projects", value: "15+", label: "robotics kits" },
      { icon: "internship", value: "1 Month", label: "internship" },
    ],
    whyLearn: {
      headingHighlight: "Robotics & IoT?",
      cards: [
        {
          id: 1,
          title: "Hardware & Embedded C",
          desc: "Program microcontrollers (ESP32, ARM) and interface sensors, actuators, and motors with real-time firmware.",
        },
        {
          id: 2,
          title: "ROS2 & Autonomous Bots",
          desc: "Master the Robot Operating System (ROS2) for navigation, path planning, and autonomous mobile robot (AMR) control.",
        },
        {
          id: 3,
          title: "Connected Cloud IoT",
          desc: "Connect physical devices to AWS IoT Core and MQTT brokers for real-time telemetry, dashboards, and remote actuation.",
        },
        {
          id: 4,
          title: "Industry Hardware Capstone",
          desc: "Build production-ready hardware prototypes, PCB schematics, and autonomous robot systems under expert guidance.",
        },
      ],
      futureSkills: ["ROS2", "Embedded C/C++", "IoT Protocols (MQTT)", "Computer Vision", "Edge AI"],
      eligibilityDegrees: ["B.Tech ECE / EEE", "Mechanical Engineering", "B.Tech Mechatronics", "B.Sc Electronics", "Robotics Enthusiasts"],
      eligibilityNote: "Engineering & Science Students Passionate About Hardware & Robotics",
    },
    internship: {
      duration: "1-Month",
      subtitle: "Build real hardware, firmware, and connected IoT solutions with industry mentors.",
      col1: ["Hardware mentor", "Embedded firmware labs", "Internship certificate"],
      col2: ["Live robotics project", "PCB design reviews", "Experience letter*"],
      quote: "Gain real-world experience building intelligent robots, smart embedded prototypes, and IoT cloud systems with top industry hardware teams.",
      badgeText: "JOINED BY 12000+ ROBOTICS BUILDERS",
    },
    modules: [
      {
        id: 1,
        number: 1,
        title: "Module 1 — Foundations of Embedded Systems & C/C++",
        topics: [
          "Embedded C/C++ Fundamentals",
          "Microcontroller Architecture & Registers",
          "GPIO, Timers, Interrupts & PWM",
          "UART, SPI, and I2C Communication",
          "Circuit Design & Power Management",
        ],
        practical: [
          "Firmware Programming on ESP32",
          "Multi-Sensor Interfacing (Temp, Ultrasonic, IMU)",
          "PWM Motor Speed & Direction Control",
        ],
      },
      {
        id: 2,
        number: 2,
        title: "Module 2 — IoT Architecture & Communication Protocols",
        topics: [
          "IoT System Architecture",
          "MQTT, HTTP, CoAP & WebSockets",
          "WiFi & Bluetooth BLE Interfacing",
          "Cloud Telemetry Ingestion",
          "IoT Security & Firmware Encryption",
        ],
        practical: [
          "Building an MQTT Telemetry Broker",
          "Connecting ESP32 to AWS IoT Core",
          "Creating Real-Time Cloud Dashboards",
        ],
      },
      {
        id: 3,
        number: 3,
        title: "Module 3 — Linux for Robotics & ROS2 Basics",
        topics: [
          "Linux OS for Embedded & Robotics",
          "ROS2 Architecture: Nodes, Topics & Services",
          "Publish-Subscribe Communication",
          "URDF Robot Modeling & Simulation",
          "Gazebo Physics Simulator",
        ],
        practical: [
          "Creating Custom ROS2 Packages in C++ & Python",
          "Simulating a 2-Wheel Differential Drive Robot",
          "Teleoperation in Gazebo Simulation",
        ],
      },
      {
        id: 4,
        number: 4,
        title: "Module 4 — Computer Vision & OpenCV for Robotics",
        topics: [
          "Image Processing with OpenCV",
          "Object Detection & Color Tracking",
          "Depth Cameras & Point Clouds (LiDAR)",
          "Visual Odometry & Camera Calibration",
        ],
        practical: [
          "Line Following & Object Tracking Bot",
          "LiDAR 2D Mapping with SLAM",
          "Obstacle Avoidance Algorithms",
        ],
      },
      {
        id: 5,
        number: 5,
        title: "Module 5 — Autonomous Mobile Robots (AMR) & Navigation",
        topics: [
          "SLAM (Simultaneous Localization & Mapping)",
          "Nav2 Navigation Stack in ROS2",
          "Costmaps & Path Planning (A*, Dijkstra)",
          "Sensor Fusion with Kalman Filters",
        ],
        practical: [
          "Autonomous Waypoint Navigation",
          "Indoor Mapping with TurtleBot3 / AMR",
          "Sensor Fusion with IMU + Wheel Encoders",
        ],
      },
      {
        id: 6,
        number: 6,
        title: "Module 6 — Edge AI, Hardware Capstone & Career Readiness",
        topics: [
          "Edge AI & TinyML on Microcontrollers",
          "PCB Prototyping Basics in KiCAD",
          "Hardware Testing & Debugging",
          "Robotics Portfolio & Interview Prep",
        ],
        practical: [
          "Deploying TinyML Gesture Classifier on ESP32",
          "Schematic & PCB Layout Design",
          "Final Industry Capstone Robot Build",
        ],
      },
    ],
    roadmapNodes: [
      { id: 1, role: "Embedded Systems Engineer", x: 110, y: 430, labelOffsetX: -20, labelOffsetY: -35, rotate: "0deg" },
      { id: 2, role: "IoT Solutions Developer", x: 260, y: 330, labelOffsetX: -110, labelOffsetY: -35, rotate: "-14deg" },
      { id: 3, role: "Robotics Software Engineer", x: 350, y: 325, labelOffsetX: -30, labelOffsetY: 25, rotate: "0deg" },
      { id: 4, role: "Automation Specialist", x: 365, y: 210, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 5, role: "Firmware Engineer", x: 495, y: 175, labelOffsetX: 10, labelOffsetY: -32, rotate: "-20deg" },
      { id: 6, role: "ROS Developer", x: 595, y: 275, labelOffsetX: -30, labelOffsetY: 25, rotate: "-12deg" },
      { id: 7, role: "Hardware Design Engineer", x: 755, y: 195, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 8, role: "Lead Robotics Architect", x: 870, y: 130, labelOffsetX: -120, labelOffsetY: -35, rotate: "0deg" },
    ],
    faqs: [
      {
        id: 1,
        question: "Do I need prior robotics or electronics knowledge?",
        answer: "No prior background is required. We start with basic electronics, C/C++ programming, and breadboard circuitry before progressing to ROS2 and autonomous robotics.",
      },
      {
        id: 2,
        question: "Are hardware kits and simulations provided?",
        answer: "Yes, students work with guided simulator environments (Gazebo, Webots, Wokwi) and receive a comprehensive kit list with hands-on lab guidance.",
      },
      {
        id: 3,
        question: "What is ROS2 and why is it important?",
        answer: "ROS2 (Robot Operating System 2) is the industry standard framework used by companies like Tesla, Boston Dynamics, and warehouse robotics leaders for autonomous control.",
      },
      {
        id: 4,
        question: "What is the duration of this program?",
        answer: "The program spans 4 months with live interactive classes, virtual hardware labs, project evaluations, and a 1-month industry internship.",
      },
      {
        id: 5,
        question: "Will I build a complete autonomous robot project?",
        answer: "Yes, as part of the capstone module, you will build and simulate an autonomous mobile robot capable of SLAM mapping and path navigation.",
      },
      {
        id: 6,
        question: "What career roles can I apply for after completing this course?",
        answer: "You can apply for Embedded Engineer, IoT Developer, Robotics Software Developer, Firmware Engineer, and Industrial Automation roles.",
      },
      {
        id: 7,
        question: "Is placement assistance provided?",
        answer: "Yes, we offer complete career assistance including hardware portfolio development, GitHub project reviews, mock technical interviews, and partner referrals.",
      },
      {
        id: 8,
        question: "How do I enroll?",
        answer: "Click Apply Now to register your interest. Our academic team will assist you with batch onboarding and prerequisites.",
      },
    ],
    cta: {
      prefix: "Ready to Build Next-Gen",
      highlighted: "Robotics &",
      suffix: "Smart IoT Systems?",
      subtitle: "Design intelligent machines. Program autonomous bots. Build connected IoT devices from scratch.",
      buttonText: "Book Now",
    },
  },

  // 4. ENTREPRENEURSHIP & INNOVATION (STARTUPS)
  {
    id: 4,
    slug: "entrepreneurship-innovation",
    title: "Transform Groundbreaking Ideas Into",
    highlightedTitle: "Scalable Startups",
    subtitleTag: "3 Month Venture Acceleration & Incubation Program",
    description:
      "From zero to launch—learn product strategy, venture pitching, financial modeling, user acquisition, and investor-ready execution.",
    image: "/hero/4.png",
    duration: "3 Months",
    type: "Internship",
    category: "Startups",
    stats: [
      { icon: "calendar", value: "3 Months", label: "cohort program" },
      { icon: "labs", value: "30+", label: "founder sessions" },
      { icon: "projects", value: "Seed Fund", label: "pitch day" },
      { icon: "internship", value: "Top Tier", label: "incubation" },
    ],
    whyLearn: {
      headingHighlight: "Scalable Startups?",
      cards: [
        {
          id: 1,
          title: "Idea to MVP Launch",
          desc: "Validate market problems, conduct customer discovery, and build functional no-code/low-code MVPs in weeks.",
        },
        {
          id: 2,
          title: "Unit Economics & Finance",
          desc: "Master CAC, LTV, burn rate, financial projections, and build sustainable monetization models.",
        },
        {
          id: 3,
          title: "Investor Pitching",
          desc: "Craft compelling pitch decks, master storytelling, and present to active venture capitalists and angel investors.",
        },
        {
          id: 4,
          title: "Incubation & Mentorship",
          desc: "1-on-1 mentorship with exited founders, VC partners, and legal experts to launch your venture legally and compliantly.",
        },
      ],
      futureSkills: ["No-Code MVPs", "Unit Economics", "Venture Pitching", "Growth Loops", "GTM Strategy"],
      eligibilityDegrees: ["Aspiring Founders", "MBA Students", "Engineering Innovators", "Product Managers", "Early-Stage Creators"],
      eligibilityNote: "Open to Anyone with an Idea or Passion to Build a High-Growth Startup",
    },
    internship: {
      duration: "3-Month",
      subtitle: "Accelerate your startup idea into an investor-ready company with incubation support.",
      col1: ["Founder mentorship", "Pitch deck reviews", "Incubation certificate"],
      col2: ["Investor Pitch Day", "No-code MVP build", "Legal & term sheet support"],
      quote: "Receive incubation support, mentor reviews from successful entrepreneurs, and present your startup to active angel investors on Pitch Day.",
      badgeText: "500+ FOUNDERS & STARTUPS ACCELERATED",
    },
    modules: [
      {
        id: 1,
        number: 1,
        title: "Module 1 — Ideation, Market Sizing & Problem Validation",
        topics: [
          "Identifying Real Market Pain Points",
          "TAM, SAM, SOM Market Sizing",
          "Customer Discovery Interviews",
          "Competitor Moat & Value Proposition Design",
        ],
        practical: [
          "Conducting 20+ Customer Interviews",
          "Lean Canvas Model Workshop",
          "Value Proposition Canvas Creation",
        ],
      },
      {
        id: 2,
        number: 2,
        title: "Module 2 — Rapid MVP Building with No-Code Tools",
        topics: [
          "Minimum Viable Product (MVP) Principles",
          "No-Code Web & App Builders (Webflow, Bubble)",
          "Database Architecture & Automation (Airtable, Zapier)",
          "Payment Gateway Integration (Stripe, Razorpay)",
        ],
        practical: [
          "Building a Live Landing Page with Conversion Funnel",
          "Automating Customer Onboarding Workflows",
          "Launching a Paid Beta Product",
        ],
      },
      {
        id: 3,
        number: 3,
        title: "Module 3 — Go-to-Market (GTM) & Early Traction",
        topics: [
          "GTM Strategy & Channel Selection",
          "Organic Growth Loops & Content Marketing",
          "Cold Outreach & B2B Sales Funnels",
          "Building a Waitlist & Product Hunt Launch",
        ],
        practical: [
          "Executing a Product Hunt Launch Campaign",
          "Setting up Cold Email & LinkedIn Funnels",
          "Acquiring First 100 Paying / Active Users",
        ],
      },
      {
        id: 4,
        number: 4,
        title: "Module 4 — Startup Finance, Unit Economics & Metrics",
        topics: [
          "CAC, LTV, Churn & Payback Period",
          "Building a 3-Year Financial Model",
          "Pricing Strategies (SaaS, Marketplace, D2C)",
          "Burn Rate & Runway Management",
        ],
        practical: [
          "Creating a Dynamic Financial Spreadsheet",
          "Unit Economics Stress Testing",
          "Pricing Experimentation Workshop",
        ],
      },
      {
        id: 5,
        number: 5,
        title: "Module 5 — Pitch Deck & Venture Capital Fundraising",
        topics: [
          "The 10-Slide Pitch Deck Formula",
          "Venture Capital vs Angel vs Bootstrapping",
          "Cap Tables, SAFE Notes & Term Sheets",
          "Storytelling & Handling Investor Objections",
        ],
        practical: [
          "Designing an Investor-Ready Pitch Deck",
          "Simulated VC Pitch Sessions with Feedback",
          "Cap Table Modeling Workshop",
        ],
      },
      {
        id: 6,
        number: 6,
        title: "Module 6 — Legal Structuring, Scaling & Demo Day",
        topics: [
          "Company Incorporation & Founder Agreements",
          "IP Protection & Trademark Basics",
          "Hiring Your First Core Team",
          "Final Demo Day & Investor Introductions",
        ],
        practical: [
          "Drafting Founder Vesting Agreements",
          "Live Demo Day Pitch Presentation",
          "Connecting with Angel Investor Network",
        ],
      },
    ],
    roadmapNodes: [
      { id: 1, role: "Venture Builder", x: 110, y: 430, labelOffsetX: -20, labelOffsetY: -35, rotate: "0deg" },
      { id: 2, role: "Startup Founder", x: 260, y: 330, labelOffsetX: -110, labelOffsetY: -35, rotate: "-14deg" },
      { id: 3, role: "Product Strategist", x: 350, y: 325, labelOffsetX: -30, labelOffsetY: 25, rotate: "0deg" },
      { id: 4, role: "Growth Lead", x: 365, y: 210, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 5, role: "Innovation Manager", x: 495, y: 175, labelOffsetX: 10, labelOffsetY: -32, rotate: "-20deg" },
      { id: 6, role: "Venture Fellow", x: 595, y: 275, labelOffsetX: -30, labelOffsetY: 25, rotate: "-12deg" },
      { id: 7, role: "Entrepreneur in Residence", x: 755, y: 195, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 8, role: "Seed-Funded CEO", x: 870, y: 130, labelOffsetX: -120, labelOffsetY: -35, rotate: "0deg" },
    ],
    faqs: [
      {
        id: 1,
        question: "Do I need an existing startup idea to join?",
        answer: "Not necessarily. We teach structured ideation frameworks to discover validated, high-demand problems, or you can team up with co-founders in the cohort.",
      },
      {
        id: 2,
        question: "Do you take equity in my startup?",
        answer: "No, Thynkspire does not take any equity or ownership in your startup for participating in this acceleration program.",
      },
      {
        id: 3,
        question: "Will I get to pitch to real angel investors and VCs?",
        answer: "Yes, graduating founders pitch their ventures on Demo Day in front of active angel investors, micro-VCs, and accelerator partners.",
      },
      {
        id: 4,
        question: "Can solo founders join?",
        answer: "Yes, both solo founders and co-founding teams can join. We also facilitate peer networking for founder matchmaking.",
      },
      {
        id: 5,
        question: "What is the duration of the program?",
        answer: "The program spans 3 months, taking you step-by-step from problem validation to MVP build, marketing launch, and Demo Day pitch.",
      },
      {
        id: 6,
        question: "Do I need technical coding skills to build the product?",
        answer: "No, we teach modern no-code platforms (Bubble, Webflow, Airtable) that enable anyone to build functional products without code.",
      },
      {
        id: 7,
        question: "Is there legal and incorporation guidance included?",
        answer: "Yes, we provide legal templates, founder agreements, cap table structuring, and incorporation support.",
      },
      {
        id: 8,
        question: "How do I apply for the next cohort?",
        answer: "Submit your application online. Our admissions panel reviews your motivation and schedules a brief discovery call.",
      },
    ],
    cta: {
      prefix: "Ready to Turn Your Vision into a",
      highlighted: "High-Growth",
      suffix: "Scalable Startup?",
      subtitle: "Validate ideas, build your MVP, master unit economics, and pitch to active seed investors.",
      buttonText: "Apply Now",
    },
  },

  // 5. DIGITAL MARKETING & AI
  {
    id: 5,
    slug: "digital-marketing",
    title: "Drive Explosive Growth With Modern",
    highlightedTitle: "Digital Marketing & AI",
    subtitleTag: "3 Month Growth Engineering & Automation Program",
    description:
      "Master SEO, performance marketing, viral content systems, conversion rate optimization, and automated AI marketing funnels.",
    image: "/hero/5.png",
    duration: "3 Months",
    type: "Internship",
    category: "Marketing",
    stats: [
      { icon: "calendar", value: "3 Months", label: "growth sprints" },
      { icon: "labs", value: "50+", label: "live campaigns" },
      { icon: "projects", value: "10+", label: "ad platforms" },
      { icon: "internship", value: "1 Month", label: "internship" },
    ],
    whyLearn: {
      headingHighlight: "Digital Marketing & AI?",
      cards: [
        {
          id: 1,
          title: "Performance Marketing",
          desc: "Run real live budget campaigns on Meta Ads, Google Search & LinkedIn with high ROAS and conversion tracking.",
        },
        {
          id: 2,
          title: "AI Search & Modern SEO",
          desc: "Master programmatic SEO, AI search engine optimization (Perplexity, ChatGPT), and technical site auditing.",
        },
        {
          id: 3,
          title: "Viral Content & Funnels",
          desc: "Build automated multi-step email workflows, WhatsApp marketing funnels, and viral short-form video hooks.",
        },
        {
          id: 4,
          title: "Agency & Brand Placements",
          desc: "Portfolio-driven placement support targeting leading growth agencies, fast-growing startups, and global brands.",
        },
      ],
      futureSkills: ["Performance Ads", "AI Search & SEO", "Marketing Automation", "Conversion Optimization", "Viral Storytelling"],
      eligibilityDegrees: ["BBA / MBA", "B.Com", "BA Mass Communication", "Any Degree Graduates", "Freelancers & Creators"],
      eligibilityNote: "Creative Minds and Growth Seekers Looking to Dominate Modern Marketing",
    },
    internship: {
      duration: "1-Month",
      subtitle: "Execute live ad campaigns, growth experiments, and viral content with leading brands.",
      col1: ["Live ad spend budget", "Growth mentor", "Internship certificate"],
      col2: ["Real brand campaigns", "Portfolio case studies", "Experience letter*"],
      quote: "Work on live brand campaigns, optimize real ad spend budgets, and graduate with a verified growth marketing case study portfolio.",
      badgeText: "JOINED BY 15000+ GROWTH MARKETERS",
    },
    modules: [
      {
        id: 1,
        number: 1,
        title: "Module 1 — Growth Foundations & AI Brand Positioning",
        topics: [
          "Modern Digital Marketing Landscape",
          "Buyer Personas & Customer Journey Mapping",
          "Brand Storytelling & Copywriting Psychology",
          "AI Tools for Content Creation & Research",
        ],
        practical: [
          "Building Customer Personas with AI",
          "Crafting High-Converting Copy Hooks",
          "Competitive Landscape Audit",
        ],
      },
      {
        id: 2,
        number: 2,
        title: "Module 2 — Advanced SEO & AI Search Engine Strategy",
        topics: [
          "Technical SEO & Core Web Vitals",
          "Keyword Research & Semantic Topic Clusters",
          "On-Page & Off-Page Link Building",
          "Optimizing for AI Search (ChatGPT, Perplexity, Gemini)",
        ],
        practical: [
          "SEMrush & Ahrefs Keyword Analysis",
          "On-Page SEO Optimization on Live CMS",
          "Creating AI-Search Optimized Content",
        ],
      },
      {
        id: 3,
        number: 3,
        title: "Module 3 — Performance Marketing (Meta, Google & LinkedIn Ads)",
        topics: [
          "Meta Ads Manager: Audiences, Pixels & CBO",
          "Google Ads: Search, Display & Performance Max",
          "LinkedIn Ads for B2B Lead Gen",
          "Ad Creative Testing & ROAS Optimization",
        ],
        practical: [
          "Setting up Meta Pixel & Conversions API",
          "Running Live Google Search Ad Campaign",
          "A/B Testing Ad Creatives & Copies",
        ],
      },
      {
        id: 4,
        number: 4,
        title: "Module 4 — Viral Social Media & Content Distribution",
        topics: [
          "Short-Form Video Algorithms (Reels, TikTok, Shorts)",
          "Content Calendars & Viral Hook Frameworks",
          "Influencer Marketing & Brand Collaborations",
          "Community Building on Discord & LinkedIn",
        ],
        practical: [
          "Scripting & Editing Viral Short-Form Videos",
          "Influencer Outreach Campaign Setup",
          "Organic LinkedIn Growth Strategy",
        ],
      },
      {
        id: 5,
        number: 5,
        title: "Module 5 — Marketing Automation, CRM & Email Funnels",
        topics: [
          "Email Marketing Architecture & Deliverability",
          "Automated Drip Sequences & Abandoned Cart Recovery",
          "WhatsApp Marketing & Chatbot Funnels",
          "HubSpot & Mailchimp CRM Workflows",
        ],
        practical: [
          "Building a 5-Part Automated Email Welcome Series",
          "Configuring WhatsApp Business API Automations",
          "Lead Scoring & CRM Pipeline Setup",
        ],
      },
      {
        id: 6,
        number: 6,
        title: "Module 6 — GA4 Analytics, CRO & Career Readiness",
        topics: [
          "Google Analytics 4 (GA4) Tracking & Custom Events",
          "Google Tag Manager (GTM) Implementation",
          "Conversion Rate Optimization (CRO) & Heatmaps",
          "Portfolio Case Studies & Interview Preparation",
        ],
        practical: [
          "Setting up GA4 Custom Conversions with GTM",
          "Hotjar Heatmap Analysis & Landing Page Redesign",
          "Compiling a 5-Page Live Campaign Portfolio",
        ],
      },
    ],
    roadmapNodes: [
      { id: 1, role: "Performance Marketing Specialist", x: 110, y: 430, labelOffsetX: -20, labelOffsetY: -35, rotate: "0deg" },
      { id: 2, role: "SEO & Growth Strategist", x: 260, y: 330, labelOffsetX: -110, labelOffsetY: -35, rotate: "-14deg" },
      { id: 3, role: "Social Media Growth Lead", x: 350, y: 325, labelOffsetX: -30, labelOffsetY: 25, rotate: "0deg" },
      { id: 4, role: "Content Marketing Manager", x: 365, y: 210, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 5, role: "Media Buyer", x: 495, y: 175, labelOffsetX: 10, labelOffsetY: -32, rotate: "-20deg" },
      { id: 6, role: "CRM & Automation Lead", x: 595, y: 275, labelOffsetX: -30, labelOffsetY: 25, rotate: "-12deg" },
      { id: 7, role: "Digital Marketing Lead", x: 755, y: 195, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
      { id: 8, role: "Chief Marketing Officer (CMO)", x: 870, y: 130, labelOffsetX: -120, labelOffsetY: -35, rotate: "0deg" },
    ],
    faqs: [
      {
        id: 1,
        question: "Do I get to run real ad campaigns with actual budget?",
        answer: "Yes, our practical modules include live ad spend budgets where you configure, launch, and optimize live Meta and Google ad campaigns.",
      },
      {
        id: 2,
        question: "Do I need technical coding knowledge for digital marketing?",
        answer: "No coding background is needed. We guide you step-by-step through user-friendly marketing tools, dashboards, and no-code automation platforms.",
      },
      {
        id: 3,
        question: "Which industry certifications are included?",
        answer: "You will earn official certifications including Google Ads, Google Analytics (GA4), HubSpot Inbound Marketing, and Thynkspire Program Certification.",
      },
      {
        id: 4,
        question: "What is the duration of this program?",
        answer: "The program is 3 months long, featuring weekly live interactive classes, hands-on campaign assignments, and a 1-month industry internship.",
      },
      {
        id: 5,
        question: "How is AI used in this digital marketing program?",
        answer: "You will master AI-powered copywriting, automated audience research, predictive analytics, and optimizing content for next-gen AI search engines.",
      },
      {
        id: 6,
        question: "Will I get placement assistance?",
        answer: "Yes, our dedicated placement team helps you build a verified campaign portfolio, conducts mock interviews, and refers you to top growth agencies.",
      },
      {
        id: 7,
        question: "Are live class recordings available?",
        answer: "Yes, all live sessions are recorded and uploaded to the LMS along with marketing templates, checklists, and prompt libraries.",
      },
      {
        id: 8,
        question: "How do I apply?",
        answer: "Click Apply Now on our website. Our admissions counselor will connect with you to review cohort timings and enrollment details.",
      },
    ],
    cta: {
      prefix: "Ready to Master",
      highlighted: "AI-Powered",
      suffix: "Digital Marketing & Growth?",
      subtitle: "Run live high-ROI campaigns. Master viral distribution. Scale businesses with AI-automated marketing funnels.",
      buttonText: "Book Now",
    },
  },
];

export function getProgramBySlug(slug: string): ProgramDetail | undefined {
  return programsData.find((p) => p.slug === slug);
}

export function getDefaultProgram(): ProgramDetail {
  return programsData[0]; // AI & Cyber Security
}

