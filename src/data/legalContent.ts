export interface LegalSection {
  title: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
  subsections?: LegalSection[];
  contact?: boolean;
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}

export const companyDetails = {
  name: "ThynkSpire India Private Limited",
  address:
    "1st Floor, 18/1283, Snehatheeram, Myladikunnummal, Near Health Centre Mayanad, Mayanad, Kozhikode, Kerala – 673008, India",
  website: "www.thynkspire.com",
  email: "support@thynkspire.com",
};

const LAST_UPDATED = "7 October 2026";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: LAST_UPDATED,
  intro: [
    "This Privacy Policy explains how ThynkSpire India Private Limited (“ThynkSpire”, “Company”, “we”, “us”, or “our”) collects, uses, stores, processes, shares, and protects information when you access our website, use our services, or use WhatsApp Business API and related communication services provided or facilitated by us.",
    "Our website is www.thynkspire.com. ThynkSpire India Private Limited is a private limited company registered in India. Our principal place of business is 1st Floor, 18/1283, Snehatheeram, Myladikunnummal, Near Health Centre Mayanad, Mayanad, Kozhikode, Kerala – 673008, India.",
    "By accessing or using our website or services, you acknowledge that you have read and understood this Privacy Policy.",
  ],
  sections: [
    {
      title: "Scope of This Privacy Policy",
      paragraphs: ["This Privacy Policy applies to information processed through:"],
      list: [
        "the ThynkSpire website;",
        "customer registration and account management;",
        "WhatsApp Business API services;",
        "messaging dashboards and communication tools;",
        "WhatsApp campaigns and broadcasts;",
        "contact management;",
        "chatbot and automation services;",
        "team inbox and multi-user features;",
        "API and webhook integrations;",
        "customer support;",
        "billing and subscription management; and",
        "other related services provided by ThynkSpire.",
      ],
    },
    {
      title: "Information We Collect",
      paragraphs: [
        "Depending on how you interact with ThynkSpire, we may collect the following categories of information.",
      ],
      subsections: [
        {
          title: "Account and Business Information",
          paragraphs: [
            "When you register, subscribe, contact us, or use our services, we may collect information such as:",
          ],
          list: [
            "full name",
            "business or company name",
            "business address",
            "email address",
            "telephone/mobile number",
            "designation",
            "GST or billing information",
            "login/account information",
            "WhatsApp Business Account information",
            "Meta Business Account information",
            "other information required to configure or support the service",
          ],
        },
        {
          title: "WhatsApp and Messaging Information",
          paragraphs: ["When using our WhatsApp-related services, information processed may include:"],
          list: [
            "WhatsApp phone numbers",
            "customer/contact phone numbers",
            "contact names and information",
            "message content",
            "message templates",
            "campaign information",
            "incoming and outgoing messages",
            "media and attachments",
            "timestamps",
            "delivery status",
            "read status",
            "conversation history",
            "chatbot interactions",
            "campaign analytics",
            "tags, labels, notes and contact groups",
            "other messaging-related metadata",
          ],
        },
        {
          title: "Information About Your Customers",
          paragraphs: [
            "Businesses using ThynkSpire may upload or otherwise process personal information relating to their customers, prospects, employees, users or other contacts. The business using ThynkSpire is responsible for ensuring that it has an appropriate legal basis, consent or other authorization required to collect and use such information and communicate with those individuals.",
          ],
        },
        {
          title: "Technical and Usage Information",
          paragraphs: ["We may automatically collect technical information including:"],
          list: [
            "IP address",
            "browser type",
            "device information",
            "operating system",
            "login activity",
            "pages visited",
            "date and time of access",
            "referring URLs",
            "application activity",
            "API usage",
            "error and diagnostic information",
            "security and audit logs",
          ],
        },
      ],
    },
    {
      title: "How We Use Information",
      paragraphs: ["We may process information to:"],
      list: [
        "create and manage customer accounts",
        "provide WhatsApp Business API and messaging services",
        "send and receive messages requested by customers",
        "manage contacts, templates and campaigns",
        "operate chatbot and automation functionality",
        "provide team inbox and multi-agent functionality",
        "provide API and webhook integrations",
        "provide customer support",
        "process payments and subscriptions",
        "authenticate users and protect accounts",
        "monitor platform performance",
        "troubleshoot technical problems",
        "detect spam, fraud, abuse and security incidents",
        "comply with applicable laws and regulatory obligations",
        "enforce our Terms and Conditions",
        "improve our products and services",
        "communicate service updates and administrative notices",
        "send promotional communications where permitted by applicable law",
      ],
    },
    {
      title: "WhatsApp Business Platform and Meta",
      paragraphs: [
        "Our WhatsApp API services depend on services and infrastructure provided by third parties, including the WhatsApp Business Platform. Businesses using the WhatsApp Business Solution are subject to applicable WhatsApp and Meta terms, policies and technical requirements. Customers are responsible for ensuring that their WhatsApp messaging activities comply with applicable WhatsApp and Meta requirements, including requirements relating to customer consent, permitted messaging, templates and prohibited activities. ThynkSpire does not control changes made by Meta or WhatsApp to their platforms, pricing, policies, eligibility requirements, message classifications or account restrictions.",
      ],
    },
    {
      title: "Third-Party Technology Provider – Telinfy",
      paragraphs: [
        "ThynkSpire currently uses services provided through Telinfy as part of its WhatsApp API and messaging service infrastructure. Information necessary to provide the services may be transmitted to, processed by, or stored through Telinfy and its underlying infrastructure or service providers. Telinfy maintains its own privacy practices and terms governing its platform. ThynkSpire may change, replace or add technology providers where reasonably necessary to operate, secure or improve the services.",
      ],
    },
    {
      title: "Customer Responsibilities and Consent",
      paragraphs: ["Customers using ThynkSpire to communicate with individuals are responsible for:"],
      list: [
        "obtaining all necessary permissions and consents",
        "providing legally required notices",
        "respecting opt-out requests",
        "maintaining evidence of consent where required",
        "ensuring contact databases are lawfully obtained",
        "complying with applicable privacy, telecommunications and marketing laws",
        "complying with WhatsApp/Meta policies",
      ],
      after: [
        "Customers must not upload purchased, scraped, unlawfully obtained or otherwise unauthorized contact databases to the platform.",
      ],
    },
    {
      title: "How We Share Information",
      paragraphs: ["We may disclose information where reasonably necessary to:"],
      list: [
        "technology and infrastructure providers",
        "WhatsApp/Meta",
        "Telinfy",
        "hosting/cloud providers",
        "payment processors",
        "analytics and security providers",
        "professional advisers",
        "government or regulatory authorities where legally required",
        "other service providers necessary to operate our services",
      ],
    },
    {
      title: "Data Security",
      paragraphs: [
        "We implement reasonable technical and organizational safeguards designed to protect information against unauthorized access, disclosure, alteration, destruction, misuse or loss. These measures may include access controls, authentication mechanisms, encrypted communications, monitoring and other security controls appropriate to the nature of the services.",
        "However, no internet-based service or electronic storage system can be guaranteed to be completely secure. Customers are responsible for protecting passwords, API credentials, access tokens and other authentication information.",
      ],
    },
    {
      title: "Data Retention",
      paragraphs: [
        "We retain personal and business information only for as long as reasonably necessary to provide our services, maintain customer accounts, comply with legal and regulatory obligations, resolve disputes, prevent fraud or abuse, maintain appropriate business records, and enforce contractual agreements.",
        "Certain information may remain in backups, logs or records for a limited period after account deletion where necessary for security, legal, technical or compliance purposes.",
      ],
    },
    {
      title: "Account and Data Deletion",
      paragraphs: [
        "Customers may request account closure or deletion of personal information by contacting ThynkSpire. Depending on the nature of the account and services, deletion may include account information and associated service data, subject to information that must be retained for legal, accounting, fraud prevention, dispute resolution or other legitimate purposes.",
        "Because some services rely on third-party providers, deletion from ThynkSpire systems may also require deletion or deactivation through relevant third-party platforms.",
      ],
    },
    {
      title: "Cookies",
      paragraphs: [
        "Our website may use cookies and similar technologies to maintain sessions, remember preferences, provide website functionality, understand website usage, improve performance, and enhance security.",
        "Users may configure their browsers to block or delete cookies. Some website features may not function properly if cookies are disabled.",
      ],
    },
    {
      title: "Third-Party Websites and Services",
      paragraphs: [
        "Our website or platform may contain links or integrations with third-party services. ThynkSpire is not responsible for the privacy practices, security, availability or content of independent third-party websites and services. Users should review the applicable privacy policies and terms before using them.",
      ],
    },
    {
      title: "International Data Processing",
      paragraphs: [
        "Some third-party service providers or infrastructure used in connection with the services may process information outside the user's state or country. Where applicable, ThynkSpire will take reasonable measures to ensure that such processing is handled in accordance with applicable data-protection requirements.",
      ],
    },
    {
      title: "Children's Privacy",
      paragraphs: [
        "ThynkSpire's business messaging services are intended primarily for businesses and authorized business users and are not intended to knowingly collect personal information directly from children through account registration. Customers using our messaging services are responsible for ensuring their own communications comply with laws applicable to children and minors.",
      ],
    },
    {
      title: "Your Rights",
      paragraphs: [
        "Subject to applicable law, individuals may have rights regarding their personal information, including rights to request access, correction, updating, erasure or other appropriate action concerning their personal information. Requests may be subject to identity verification and applicable legal limitations.",
        "Where ThynkSpire processes information solely on behalf of a business customer, individuals may need to direct their request to the relevant business that controls their information.",
      ],
    },
    {
      title: "Marketing Communications",
      paragraphs: [
        "Where permitted by applicable law, we may communicate with customers about products, services, offers and updates. Users may opt out of promotional communications using available unsubscribe mechanisms or by contacting us. Service-related, security, billing and administrative communications may still be sent where necessary.",
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      paragraphs: [
        "We may revise this Privacy Policy periodically to reflect changes in our services, technology, legal requirements or business practices. The latest version will be published on our website with an updated “Last Updated” date. Continued use of the services following an update will be subject to the updated Privacy Policy to the extent permitted by applicable law.",
      ],
    },
    {
      title: "Contact Us",
      paragraphs: [
        "For questions, privacy concerns, data requests or complaints relating to this Privacy Policy, please contact:",
      ],
      contact: true,
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms and Conditions",
  lastUpdated: LAST_UPDATED,
  intro: [
    "These Terms and Conditions (“Terms”) govern your access to and use of the website, WhatsApp Business API services, messaging platform and related products and services offered or facilitated by ThynkSpire India Private Limited (“ThynkSpire”, “Company”, “we”, “us” or “our”).",
    "By registering for, purchasing, accessing or using our services, you (“Customer”, “Client”, “User”, “you” or “your”) agree to these Terms. If you do not agree to these Terms, you must not use the services.",
  ],
  sections: [
    {
      title: "About ThynkSpire",
      paragraphs: [
        "ThynkSpire India Private Limited is a private limited company registered in India. Our principal place of business is 1st Floor, 18/1283, Snehatheeram, Myladikunnummal, Near Health Centre Mayanad, Mayanad, Kozhikode, Kerala – 673008, India. Website: www.thynkspire.com.",
      ],
    },
    {
      title: "Services",
      paragraphs: ["ThynkSpire provides or facilitates business communication services that may include:"],
      list: [
        "WhatsApp Business API access",
        "WhatsApp messaging",
        "campaign and broadcast functionality",
        "team inbox functionality",
        "multi-agent access",
        "contact management",
        "message template management",
        "chatbot and automation functionality",
        "campaign analytics",
        "API integrations",
        "webhook integrations",
        "related business messaging services",
      ],
    },
    {
      title: "Third-Party Platform – Telinfy",
      paragraphs: [
        "ThynkSpire currently uses Telinfy as an underlying technology/service provider for certain messaging and WhatsApp API functionality. By using ThynkSpire's relevant messaging services, you acknowledge that service delivery may depend on Telinfy and other third-party providers. ThynkSpire may replace, modify or add underlying technology providers at its discretion where reasonably necessary for service delivery.",
      ],
    },
    {
      title: "WhatsApp and Meta Services",
      paragraphs: [
        "Customers using WhatsApp services through ThynkSpire must comply with all applicable WhatsApp Business Terms, WhatsApp Business Messaging Policy, WhatsApp Business Solution Terms, Meta requirements, technical documentation and other applicable platform policies. These requirements may change from time to time.",
      ],
    },
    {
      title: "Account Registration",
      paragraphs: [
        "To access certain services, you may be required to create an account and provide accurate information. You agree to:",
      ],
      list: [
        "provide accurate and current information",
        "maintain confidentiality of login credentials",
        "protect API keys and access tokens",
        "restrict unauthorized account access",
        "promptly notify us of suspected unauthorized use",
        "ensure users accessing your business account are appropriately authorized",
      ],
    },
    {
      title: "Customer Consent and WhatsApp Opt-In",
      paragraphs: [
        "You are solely responsible for ensuring that you have the necessary lawful basis, permissions and customer consent required to send messages. You must not send unsolicited messages or spam.",
        "Where WhatsApp requires user opt-in, you must obtain the required opt-in before initiating communication. You must also honor opt-out, unsubscribe and other requests from recipients.",
      ],
    },
    {
      title: "Acceptable Use",
      paragraphs: [
        "You must use the services only for legitimate and lawful business purposes. You must not use ThynkSpire to:",
      ],
      list: [
        "send spam or unsolicited bulk communications",
        "message users without required consent",
        "harass, threaten or deceive individuals",
        "impersonate another person or organization",
        "distribute malware or malicious content",
        "conduct phishing or fraudulent activity",
        "violate intellectual property rights",
        "process unlawfully obtained personal data",
        "scrape or purchase unauthorized contact databases",
        "circumvent platform security",
        "attempt unauthorized access",
        "interfere with platform operation",
        "violate applicable laws",
        "violate Meta or WhatsApp policies",
        "use the service for otherwise prohibited or unlawful activities",
      ],
    },
    {
      title: "Customer Content",
      paragraphs: [
        "You retain ownership of the content, contact information and other materials you lawfully provide through the services. You grant ThynkSpire and relevant service providers the limited rights necessary to host, transmit, process and otherwise handle such content solely as necessary to provide, secure and support the services and meet applicable legal obligations.",
        "You represent that you have all necessary rights and permissions for information and content uploaded to or processed through the services.",
      ],
    },
    {
      title: "Message Templates and Campaigns",
      paragraphs: [
        "WhatsApp message templates may be subject to approval, categorization, rejection, suspension or modification by Meta/WhatsApp. ThynkSpire does not guarantee that:",
      ],
      list: [
        "a template will be approved",
        "a particular template category will be assigned",
        "a message will be delivered",
        "a recipient will read or respond to a message",
        "WhatsApp will continue to permit a particular messaging practice",
      ],
    },
    {
      title: "Fees and Billing",
      paragraphs: [
        "Certain ThynkSpire services are provided on a paid subscription or usage basis. Fees may include subscription charges, setup or onboarding charges, WhatsApp messaging charges, usage-based charges, third-party charges and taxes.",
        "Applicable pricing will be communicated through our website, quotation, order form, invoice, proposal or other commercial agreement. Third-party charges, including WhatsApp/Meta messaging charges, may change independently of ThynkSpire. Applicable GST and other taxes may be charged as required by law.",
      ],
    },
    {
      title: "Payment",
      paragraphs: [
        "Customers must pay all applicable invoices and charges within the specified payment period. Failure to make payment may result in service restriction, account suspension, messaging suspension or termination. The customer remains responsible for outstanding amounts incurred before suspension or termination.",
      ],
    },
    {
      title: "Refund and Cancellation Policy",
      paragraphs: [
        "Unless otherwise specified in a quotation, order form, plan or written agreement, subscription, setup, activation, integration and usage fees already paid are generally non-refundable once the relevant service has been activated or consumed, except where otherwise required by applicable law.",
        "Charges already incurred for WhatsApp messages or other third-party services are non-refundable once consumed or charged by the relevant provider. Customers may request cancellation of future service renewals in accordance with their applicable subscription or commercial agreement.",
      ],
    },
    {
      title: "Suspension and Termination",
      paragraphs: ["ThynkSpire may restrict, suspend or terminate access where reasonably necessary if:"],
      list: [
        "payments are overdue",
        "these Terms are violated",
        "WhatsApp/Meta policies are violated",
        "spam or abusive messaging is detected",
        "fraudulent or unlawful activity is suspected",
        "account security is compromised",
        "continued service creates legal or security risks",
        "a third-party provider suspends the underlying service",
        "required by law or competent authority",
      ],
      after: [
        "Where reasonably possible, ThynkSpire may provide notice and an opportunity to resolve the issue. Immediate suspension may be applied where necessary for security, legal compliance, fraud prevention or platform-policy enforcement.",
      ],
    },
    {
      title: "Third-Party Suspension",
      paragraphs: [
        "WhatsApp, Meta, Telinfy or another provider may independently restrict, suspend or terminate services or accounts. ThynkSpire cannot guarantee reversal of decisions made independently by third-party providers. Customers are responsible for maintaining compliance with third-party platform requirements.",
      ],
    },
    {
      title: "API and Integration Usage",
      paragraphs: ["Where API credentials, webhooks or integrations are provided, customers must:"],
      list: [
        "keep credentials confidential",
        "implement reasonable security measures",
        "use integrations only for authorized purposes",
        "not share credentials publicly",
        "not circumvent rate limits or security controls",
        "promptly revoke or replace compromised credentials",
      ],
      after: ["ThynkSpire may revoke or rotate credentials where necessary to protect the service."],
    },
    {
      title: "Service Availability",
      paragraphs: [
        "We aim to provide reliable services but do not guarantee uninterrupted or error-free availability. Availability may be affected by:",
      ],
      list: [
        "maintenance",
        "internet/network outages",
        "third-party service failures",
        "WhatsApp or Meta outages",
        "Telinfy service interruptions",
        "telecom/operator failures",
        "software or infrastructure problems",
        "cyber incidents",
        "government restrictions",
        "events outside our reasonable control",
      ],
    },
    {
      title: "Data Protection and Privacy",
      paragraphs: [
        "Use of personal information through the services is governed by the ThynkSpire Privacy Policy and applicable law. Customers are responsible for ensuring that personal information uploaded or processed through their account has been collected lawfully.",
        "Where ThynkSpire processes recipient/customer information on behalf of a business customer, the business customer remains responsible for its own obligations concerning that information under applicable law.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        "Unless otherwise stated, ThynkSpire and/or its licensors own all intellectual property rights relating to ThynkSpire's website, branding, software, documentation and proprietary materials. No provision of these Terms transfers ownership of ThynkSpire intellectual property to the customer.",
        "Third-party trademarks, including WhatsApp, Meta and Telinfy marks, remain the property of their respective owners.",
      ],
    },
    {
      title: "Confidentiality",
      paragraphs: [
        "Each party may receive confidential business, technical or commercial information belonging to the other. The receiving party must use reasonable measures to protect confidential information and must not disclose it except where necessary to provide the services, to authorized personnel or service providers, with the other party's consent, or where disclosure is required by law.",
      ],
    },
    {
      title: "Disclaimer",
      paragraphs: [
        "To the maximum extent permitted by applicable law, services are provided on an “as available” basis. ThynkSpire does not guarantee:",
      ],
      list: [
        "uninterrupted availability",
        "error-free operation",
        "approval of WhatsApp Business Accounts",
        "Meta business verification",
        "WhatsApp template approval",
        "delivery of every message",
        "particular campaign performance",
        "continued availability of third-party features",
        "reinstatement of accounts suspended by third parties",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "To the maximum extent permitted by applicable law, ThynkSpire shall not be liable for indirect, incidental, special, consequential or punitive damages arising from use of or inability to use the services.",
        "This includes, where legally permissible, loss resulting from business interruption, loss of profits, lost opportunities, message-delivery failures, loss of data, third-party platform restrictions, WhatsApp account suspension, or unauthorized use resulting from a customer's failure to secure its credentials.",
        "Nothing in these Terms excludes liability that cannot legally be excluded.",
      ],
    },
    {
      title: "Indemnification",
      paragraphs: [
        "You agree, to the extent permitted by applicable law, to indemnify and hold harmless ThynkSpire, its directors, employees and representatives against claims, losses, liabilities, damages and reasonable costs resulting from:",
      ],
      list: [
        "your unlawful use of the services",
        "violation of these Terms",
        "violation of WhatsApp/Meta policies",
        "unlawful messaging",
        "failure to obtain required recipient consent",
        "infringement of third-party rights",
        "content or data uploaded or transmitted by you",
      ],
    },
    {
      title: "Changes to Third-Party Services",
      paragraphs: [
        "Meta, WhatsApp, Telinfy and other third-party providers may modify their pricing, APIs, features, technical requirements, messaging rules, template categories, eligibility criteria, terms or policies. ThynkSpire may modify its services or charges as reasonably necessary to accommodate such changes.",
      ],
    },
    {
      title: "Changes to These Terms",
      paragraphs: [
        "ThynkSpire may update these Terms periodically. Updated Terms will be published on our website with a revised “Last Updated” date. Where required by applicable law or where changes are material, additional notice may be provided.",
      ],
    },
    {
      title: "Governing Law",
      paragraphs: ["These Terms shall be governed by and construed in accordance with the laws of India."],
    },
    {
      title: "Jurisdiction",
      paragraphs: [
        "Subject to applicable law, disputes arising from these Terms or the services shall be subject to the jurisdiction of the competent courts in Kozhikode, Kerala, India.",
      ],
    },
    {
      title: "Severability",
      paragraphs: [
        "If any provision of these Terms is found invalid or unenforceable, that provision will be interpreted or limited to the minimum extent necessary, and the remaining provisions will continue in effect.",
      ],
    },
    {
      title: "Entire Agreement",
      paragraphs: [
        "These Terms, the Privacy Policy, applicable order forms, quotations, subscription terms and other written agreements between the customer and ThynkSpire constitute the agreement governing the applicable services.",
        "Where a separately executed written agreement expressly conflicts with these Terms, the separately executed agreement will prevail to the extent of the conflict.",
      ],
    },
    {
      title: "Contact Information",
      contact: true,
    },
  ],
};
