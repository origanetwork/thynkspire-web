export interface KeyPoint {
  title: string;
  desc: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  linkedinUrl?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  image: string;
  heroImage?: string;
  author: Author;
  paragraphs: {
    intro: string[];
    sectionHeading: string;
    sectionIntro: string;
    keyPoints: KeyPoint[];
    conclusion: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "cybersecurity-data-privacy-workshop",
    title: "Industry-Oriented Cybersecurity & Data Privacy Workshop for College Students",
    subtitle: "Empowering the next generation of engineers with hands-on threat simulation, ethical hacking fundamentals, and enterprise data protection strategies.",
    category: "Cyber Security",
    date: "June 10, 2026",
    image: "/hero/b1.jpg",
    author: {
      name: "Marcus Vance",
      role: "Lead Security Architect, ThynkEdge",
      avatar: "/blog/marcus-vance.jpg",
      linkedinUrl: "https://linkedin.com",
    },
    paragraphs: {
      intro: [
        "Today's academic curriculum often leaves a notable gap between theoretical network principles and the real-world demands of modern security operations centers (SOCs). As cyber threats grow increasingly automated and pervasive, academic institutions must equip students with practical, defensive capabilities before they enter the workforce.",
        "Our recent hands-on workshop brought together students, faculty, and industry veterans for an intensive deep dive into offensive reconnaissance, blue-team defensive architectures, and strict enterprise data compliance methodologies.",
      ],
      sectionHeading: "Hands-on Threat Defense & SOC Simulations",
      sectionIntro: "Rather than relying on abstract slide presentations, participants engaged in live simulated sandboxes to diagnose and remediate active attack vectors in real-time.",
      keyPoints: [
        {
          title: "Threat Modeling & Packet Forensics:",
          desc: "Students dissected live Wireshark traces, uncovering payload injections, spoofed DNS queries, and anomalous exfiltration attempts across enterprise subnets.",
        },
        {
          title: "Zero-Day Vulnerability Patching:",
          desc: "Participants applied emergency security patches under strict simulated downtime constraints, learning the delicate balance between system availability and cryptographic integrity.",
        },
        {
          title: "Data Privacy & Regulatory Frameworks:",
          desc: "A thorough review of global compliance standards including GDPR, CCPA, and India's Digital Personal Data Protection (DPDP) Act, emphasizing privacy-by-design software development.",
        },
      ],
      conclusion: [
        "The workshop concluded with a 3-hour Capture The Flag (CTF) tournament where teams defended simulated corporate infrastructure against live automated adversary emulations.",
        "By bridging academia with frontline industry challenges, Thynkspire continues to nurture agile, high-caliber security talent capable of safeguarding critical digital infrastructure.",
      ],
    },
  },
  {
    id: 2,
    slug: "how-ai-is-transforming-cybersecurity",
    title: "How AI is Transforming Cybersecurity",
    subtitle: "As cyber threats evolve into sophisticated automated attacks, artificial intelligence has emerged not just as a tool, but as the foundational defense architecture of the modern digital enterprise.",
    category: "AI & Technology",
    date: "March 20, 2026",
    image: "/hero/b2.jpg",
    heroImage: "/blog/blog.jpeg",
    author: {
      name: "Dr. Elena Rostova",
      role: "Head of Threat Intelligence, ThynkEdge",
      avatar: "/blog/elena-rostova.jpg",
      linkedinUrl: "https://linkedin.com",
    },
    paragraphs: {
      intro: [
        "The landscape of digital security has fundamentally shifted. Gone are the days when static firewalls and signature-based antivirus software could provide adequate protection. Today's threat actors utilize automated tools, polymorphic malware, and sophisticated social engineering tactics that bypass traditional defenses with alarming ease. In this high-stakes environment, artificial intelligence (AI) and machine learning (ML) have become critical imperatives.",
      ],
      sectionHeading: "The Shift from Reactive to Predictive",
      sectionIntro: "Historically, cybersecurity was a reactive discipline. A threat was identified, a signature was created, and systems were updated to block future occurrences. This model is fatally flawed in an era of zero-day exploits. AI flips this paradigm by enabling predictive security.",
      keyPoints: [
        {
          title: "Behavioral Analysis:",
          desc: "Rather than looking for known bad code, AI establishes baselines of normal network behavior and flags anomalies in real-time.",
        },
        {
          title: "Automated Response:",
          desc: "When a threat is detected, AI systems can isolate compromised endpoints instantly, minimizing lateral movement before a human analyst even receives an alert.",
        },
        {
          title: "Phishing Detection:",
          desc: "Advanced natural language processing (NLP) models analyze email context and sender behavior to intercept sophisticated spear-phishing attempts that bypass standard filters.",
        },
      ],
      conclusion: [
        "While AI empowers defenders, it also equips adversaries. Cybercriminals are now leveraging generative AI to craft highly convincing phishing lures, write polymorphic malware that evades detection, and automate the discovery of vulnerabilities at scale. This creates an ongoing \"arms race\" between defensive AI and offensive AI.",
        "To maintain the upper hand, organizations must continuously train their models on diverse, high-quality datasets and employ \"red teaming\" exercises where ethical hackers use adversarial AI techniques to test the resilience of existing defenses.",
      ],
    },
  },
  {
    id: 3,
    slug: "thynkx-2026-quiz-experience",
    title: "THYNK X 2026 - A Quiz Experience Like Never Before",
    subtitle: "Igniting intellectual curiosity, rapid-fire logic, and interdisciplinary problem-solving across collegiate innovators nationwide.",
    category: "Events",
    date: "June 10, 2026",
    image: "/hero/b3.jpg",
    author: {
      name: "Sarah Jenkins",
      role: "Director of Experiential Programs, Thynkspire",
      avatar: "/blog/sarah-jenkins.jpg",
      linkedinUrl: "https://linkedin.com",
    },
    paragraphs: {
      intro: [
        "THYNK X 2026 redefined conventional academic quizzes into an electrifying, multi-stage arena designed to challenge both rapid cognitive agility and deep analytical mastery. Over 1,500 students from more than 120 institutions assembled to test their mettle across technology, business intelligence, and future innovations.",
        "The event pushed beyond conventional trivia, requiring teams to construct algorithmic proofs, decode live cryptographic ciphers, and present rapid strategy briefs before an esteemed jury of industry veterans.",
      ],
      sectionHeading: "Beyond Trivia: Engineering Mindsets in Action",
      sectionIntro: "The competition architecture was structured into three progressive rounds that evaluated distinct vectors of intellectual dexterity.",
      keyPoints: [
        {
          title: "Algorithmic Speed Rounds:",
          desc: "Teams solved live computational puzzles and logical optimization queries with millisecond-accuracy buzzer tracking.",
        },
        {
          title: "Live Interactive Leaderboards:",
          desc: "Real-time score synchronizations and dynamic difficulty escalations kept contestants and thousands of live stream viewers on the edge of their seats.",
        },
        {
          title: "Mentorship & Incubation Grants:",
          desc: "Finalists earned direct access to Thynkspire's incubation mentorship network along with merit grants to kickstart their own tech innovations.",
        },
      ],
      conclusion: [
        "THYNK X 2026 proved that when learning is blended with competitive excitement and high-stakes problem-solving, students unlock extraordinary levels of creativity and grit.",
        "We congratulate all participants and look forward to expanding the THYNK X circuit to an even wider national audience in the upcoming academic year.",
      ],
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getDefaultPost(): BlogPost {
  return blogPosts[1]; // Default featured: How AI is Transforming Cybersecurity
}
