export const translations = {
  de: {
    nav: {
      features: 'Funktionen',
      howItWorks: 'So funktioniert\'s',
      useCases: 'Anwendungsfälle',
      faq: 'FAQ',
      waitlist: 'Warteliste',
      joinWaitlist: 'Auf die Warteliste',
    },
    hero: {
      badge: 'KI-Agent für Unternehmen',
      title: 'Ihr fähigster',
      titleHighlight: 'Kollege.',
      subtitle: 'Ein KI-Mitarbeiter, der Aufgaben automatisiert, Code schreibt, sich mit Ihren Tools verbindet und Dinge erledigt — nicht nur Fragen beantwortet.',
      cta: 'Auf die Warteliste',
      ctaSecondary: 'Mehr erfahren',
      trustedBy: 'Entwickelt für deutsche Unternehmen',
    },
    features: {
      badge: 'WARUM AIVALANCHE',
      title: 'Mehr als ein Chatbot.',
      titleHighlight: 'Ein echter Kollege.',
      subtitle: 'AIvalanche ist kein gewöhnlicher KI-Assistent. Es ist ein persistenter Agent, der in Ihrem Slack, Teams oder WhatsApp lebt und echte Arbeit erledigt.',
      items: [
        {
          title: 'Persistenter Agent',
          description: 'Läuft wochenlang im Hintergrund. Verfolgt Projekte, erinnert an Deadlines und hält Ihr Team auf dem Laufenden — ohne Aufforderung.',
          icon: 'brain',
        },
        {
          title: 'Proaktiv von Natur aus',
          description: 'Wartet nicht auf Befehle. AIvalanche erkennt Probleme, schlägt Lösungen vor und handelt eigenständig — wie ein erfahrener Mitarbeiter.',
          icon: 'zap',
        },
        {
          title: '3.000+ Integrationen',
          description: 'Verbindet sich mit Salesforce, HubSpot, Linear, Jira, SAP, Slack, Teams und mehr. Wenn Ihr Tool nicht dabei ist, baut AIvalanche eine Integration.',
          icon: 'plug',
        },
        {
          title: 'Lebt in Ihrem Chat',
          description: 'Kein neues Tool, keine neue App. AIvalanche arbeitet direkt in Slack, Microsoft Teams oder WhatsApp — dort, wo Ihr Team bereits kommuniziert.',
          icon: 'messageSquare',
        },
        {
          title: 'DSGVO-Konform',
          description: 'Isolierte Rechenumgebungen. Ihre Daten werden verschlüsselt und niemals für Training verwendet. Vollständig DSGVO-konform.',
          icon: 'shield',
        },
        {
          title: 'Eigener Arbeitsbereich',
          description: 'Jeder Agent hat seinen eigenen Computer in der Cloud. Er schreibt und führt Code aus, browst im Web und erledigt echte Aufgaben.',
          icon: 'monitor',
        },
      ],
    },
    chatDemo: {
      badge: 'IN AKTION',
      title: 'So arbeitet AIvalanche',
      titleHighlight: 'in Ihrem Team.',
      conversations: [
        {
          platform: 'Slack',
          messages: [
            { role: 'user', name: 'Lisa M.', text: '@AIvalanche Kannst du bitte ein Linear-Ticket erstellen? Wir müssen die Landing Page mit mehr Pricing-Details aktualisieren.' },
            { role: 'agent', text: 'Ich habe ein Linear-Ticket für das Growth-Team vorbereitet:\n\nTitel: Landing Page mit Pricing-Details aktualisieren\n\nBeschreibung:\n• Detaillierte Preisaufschlüsselung hinzufügen\n• Preisstufen und Feature-Vergleich\n• Pricing-Informationen sichtbarer machen' },
          ],
        },
        {
          platform: 'Teams',
          messages: [
            { role: 'user', name: 'Thomas K.', text: 'Was hat sich gestern an unserem Backend geändert? Bleib auf hohem Level.' },
            { role: 'agent', text: 'Backend-Änderungen gestern — 8 Deployments\n\nPerformance & Speed\n• Refactoring der Snooze-Funktionalität\n• App-Performance verbessert\n\nKI & Automationen\n• BCC-Split-Feature implementiert\n• Automations-Prompts optimiert\n\nFrontend/UI\n• Neue Tooltip- und Checkbox-Komponenten\n• Landing Page Updates' },
          ],
        },
        {
          platform: 'WhatsApp',
          messages: [
            { role: 'user', name: 'Sarah B.', text: 'Stimmt etwas mit unseren Google Ads diese Woche nicht?' },
            { role: 'agent', text: 'Euer Google Ads CPA ist diese Woche um 23% gestiegen. Ich habe die Kampagnen analysiert — die "Enterprise"-Anzeigengruppe underperformt.\n\nIch empfehle:\n1. Budget von Enterprise zu SMB verschieben\n2. Neue Ad-Varianten testen\n3. Negative Keywords aktualisieren\n\nSoll ich das direkt umsetzen?' },
          ],
        },
      ],
    },
    useCases: {
      badge: 'ANWENDUNGSFÄLLE',
      title: 'Was AIvalanche für',
      titleHighlight: 'Ihr Team leisten kann.',
      items: [
        {
          title: 'Marketing Ops',
          description: 'Kampagnen-Tracking, Content-Erstellung, Social Media Monitoring, Wettbewerbsanalyse und automatisiertes Reporting.',
          examples: ['Google Ads analysieren', 'Blog-Beiträge erstellen', 'Wettbewerber überwachen', 'Reports generieren'],
        },
        {
          title: 'Sales Ops',
          description: 'CRM-Pflege, Lead-Scoring, Pipeline-Updates, Meeting-Vorbereitung und automatisierte Follow-ups.',
          examples: ['CRM aktualisieren', 'Leads qualifizieren', 'Angebote erstellen', 'Follow-ups senden'],
        },
        {
          title: 'Engineering',
          description: 'Code-Reviews, Deployment-Monitoring, Ticket-Management, Dokumentation und technische Recherche.',
          examples: ['Jira-Tickets erstellen', 'Deployments überwachen', 'Docs aktualisieren', 'Code analysieren'],
        },
        {
          title: 'HR & Operations',
          description: 'Onboarding-Workflows, Urlaubsverwaltung, Policy-Fragen, Team-Koordination und Prozessautomatisierung.',
          examples: ['Onboarding starten', 'Urlaub verwalten', 'Policies erklären', 'Meetings planen'],
        },
      ],
    },
    faq: {
      badge: 'HÄUFIGE FRAGEN',
      title: 'Alles was Sie wissen müssen.',
      items: [
        {
          q: 'Was genau ist AIvalanche?',
          a: 'AIvalanche ist ein KI-Mitarbeiter, der in Slack, Microsoft Teams oder WhatsApp lebt. Es hat seinen eigenen Computer in der Cloud, auf dem es Code schreibt und ausführt, um Aufgaben zu erledigen. Es ist kein Chatbot — es ist ein Kollege, der echte Arbeit leistet.',
        },
        {
          q: 'Wie unterscheidet sich AIvalanche von ChatGPT?',
          a: 'Die meisten KI-Tools generieren nur Text. AIvalanche führt aus. Es hat einen persistenten Arbeitsbereich, verbindet sich mit Ihren echten Tools und führt Aktionen durch — E-Mails senden, CRMs aktualisieren, Apps bauen, Reports erstellen. Sie kopieren keine Outputs — AIvalanche erledigt die Arbeit end-to-end.',
        },
        {
          q: 'Was kann AIvalanche konkret tun?',
          a: 'Wiederkehrende Workflows automatisieren. Daten aus mehreren Tools zusammenführen. Web-Apps bauen und deployen. Dokumente erstellen und bearbeiten. Im Web recherchieren. Wettbewerberanalysen erstellen. Reports generieren. Alles, was Sie beschreiben können, kann AIvalanche wahrscheinlich programmieren und ausführen.',
        },
        {
          q: 'Mit welchen Tools verbindet sich AIvalanche?',
          a: 'Über 3.000 — darunter Salesforce, HubSpot, Linear, Notion, Jira, Stripe, GitHub, Google Drive, SAP, Slack, Microsoft Teams und mehr. Wenn Ihr Tool nicht unterstützt wird, baut AIvalanche eine eigene Integration.',
        },
        {
          q: 'Sind meine Daten sicher?',
          a: 'Ja. Jeder Nutzer erhält eine isolierte Rechenumgebung. AIvalanche greift nur auf Tools zu, die Sie explizit verbinden. Daten werden bei der Übertragung und im Ruhezustand verschlüsselt. Wir trainieren nicht mit Ihren Daten. Vollständig DSGVO-konform.',
        },
        {
          q: 'Hat AIvalanche Zugriff auf alle meine Slack/Teams-Nachrichten?',
          a: 'AIvalanche sieht nur Kanäle, zu denen es eingeladen wurde. Sie kontrollieren, wo AIvalanche lesen und antworten kann. Es merkt sich den Kontext, um hilfreich zu sein, aber Sie können es jederzeit aus jedem Kanal entfernen.',
        },
        {
          q: 'Wie lernt AIvalanche mein Team kennen?',
          a: 'AIvalanche liest Konversationen in den Kanälen, denen es beitritt, beobachtet Workflows und baut über die Zeit eine Wissensbasis auf. Es dokumentiert Gelerntes in "Skills" — internen Notizen, die es referenziert, um effektiver mit Ihrem Team zusammenzuarbeiten.',
        },
        {
          q: 'Kann AIvalanche Fehler machen?',
          a: 'Ja. AIvalanche ist fähig, aber nicht unfehlbar. Es überprüft seine Arbeit doppelt und fragt vor riskanten Aktionen wie dem Senden von E-Mails oder dem Deployen in Produktion um Bestätigung. Sie behalten die Kontrolle.',
        },
        {
          q: 'Wie lange dauert das Setup?',
          a: 'Minuten. Installieren Sie AIvalanche in Slack oder Teams, verbinden Sie die gewünschten Tools und beginnen Sie mit der Zusammenarbeit. AIvalanche übernimmt das Onboarding selbst — es stellt sich vor und fragt, wobei es helfen kann.',
        },
        {
          q: 'Können mehrere Personen AIvalanche nutzen?',
          a: 'Ja. AIvalanche arbeitet in Ihrem gesamten Workspace. Jeder kann @AIvalanche erwähnen. Es behält den Kontext über das gesamte Team bei und respektiert dabei individuelle Präferenzen.',
        },
        {
          q: 'Funktioniert AIvalanche auch außerhalb von Slack?',
          a: 'Slack und Teams sind AIvalanches Zuhause, aber seine Arbeit reicht überall hin — es verbindet sich mit externen Tools, deployt Apps ins Web und kann E-Mails in Ihrem Namen senden. Sie interagieren über den Chat; AIvalanche arbeitet quer über Ihren Stack.',
        },
        {
          q: 'Wie komme ich auf die Warteliste?',
          a: 'Tragen Sie Ihre E-Mail-Adresse auf dieser Seite ein und wir melden uns bei Ihnen, sobald ein Platz frei wird. Unternehmen aus dem DACH-Raum werden bevorzugt eingeladen.',
        },
      ],
    },
    waitlist: {
      badge: 'JETZT STARTEN',
      title: 'Bereit, Ihren fähigsten Kollegen einzustellen?',
      subtitle: 'Tragen Sie sich auf die Warteliste ein und gehören Sie zu den ersten Unternehmen, die AIvalanche nutzen.',
      placeholder: 'Ihre Geschäfts-E-Mail',
      cta: 'Auf die Warteliste',
      success: 'Erfolgreich eingetragen!',
      successSub: 'Wir melden uns bald bei Ihnen.',
      privacyNote: 'Kein Spam. Jederzeit abbestellbar. Ihre Daten sind sicher.',
    },
    footer: {
      description: 'Ein KI-Mitarbeiter, der in Ihrem Chat lebt. Automatisiert Aufgaben, verbindet Tools und erledigt echte Arbeit für Ihr Team.',
      navigation: 'Navigation',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      terms: 'AGB',
      imprint: 'Impressum',
      contact: 'Kontakt',
      copyright: '© 2025 AIvalanche. Alle Rechte vorbehalten.',
    },
  },
  en: {
    nav: {
      features: 'Features',
      howItWorks: 'How it works',
      useCases: 'Use Cases',
      faq: 'FAQ',
      waitlist: 'Waitlist',
      joinWaitlist: 'Join Waitlist',
    },
    hero: {
      badge: 'AI Agent for Enterprise',
      title: 'Your most capable',
      titleHighlight: 'colleague.',
      subtitle: 'An AI coworker that automates tasks, writes code, connects to your tools, and gets things done — not just answers questions.',
      cta: 'Join the Waitlist',
      ctaSecondary: 'Learn more',
      trustedBy: 'Built for German enterprises',
    },
    features: {
      badge: 'WHY AIVALANCHE',
      title: 'More than a chatbot.',
      titleHighlight: 'A real colleague.',
      subtitle: 'AIvalanche is not an ordinary AI assistant. It\'s a persistent agent that lives in your Slack, Teams, or WhatsApp and does real work.',
      items: [
        {
          title: 'Persistent Agent',
          description: 'Runs for weeks in the background. Tracks projects, reminds about deadlines, and keeps your team updated — without being prompted.',
          icon: 'brain',
        },
        {
          title: 'Proactive by Default',
          description: 'Doesn\'t wait for commands. AIvalanche identifies problems, suggests solutions, and acts independently — like an experienced team member.',
          icon: 'zap',
        },
        {
          title: '3,000+ Integrations',
          description: 'Connects to Salesforce, HubSpot, Linear, Jira, SAP, Slack, Teams, and more. If your tool isn\'t there, AIvalanche builds an integration.',
          icon: 'plug',
        },
        {
          title: 'Lives in Your Chat',
          description: 'No new tool, no new app. AIvalanche works directly in Slack, Microsoft Teams, or WhatsApp — where your team already communicates.',
          icon: 'messageSquare',
        },
        {
          title: 'GDPR-Compliant',
          description: 'Isolated compute environments. Your data is encrypted and never used for training. Fully GDPR-compliant.',
          icon: 'shield',
        },
        {
          title: 'Own Workspace',
          description: 'Each agent has its own computer in the cloud. It writes and runs code, browses the web, and completes real tasks.',
          icon: 'monitor',
        },
      ],
    },
    chatDemo: {
      badge: 'IN ACTION',
      title: 'How AIvalanche works',
      titleHighlight: 'in your team.',
      conversations: [
        {
          platform: 'Slack',
          messages: [
            { role: 'user', name: 'Lisa M.', text: '@AIvalanche Can you create a Linear ticket? We need to update the landing page with more pricing details.' },
            { role: 'agent', text: 'I\'ve prepared a Linear ticket for the Growth team:\n\nTitle: Update landing page with pricing details\n\nDescription:\n• Add detailed pricing breakdown\n• Include pricing tiers and feature comparison\n• Make pricing information more visible' },
          ],
        },
        {
          platform: 'Teams',
          messages: [
            { role: 'user', name: 'Thomas K.', text: 'What changed in our backend yesterday? Keep it high level.' },
            { role: 'agent', text: 'Backend changes yesterday — 8 deployments\n\nPerformance & Speed\n• Snooze functionality refactored\n• App performance improved\n\nAI & Automations\n• BCC split feature implemented\n• Automation prompts optimized\n\nFrontend/UI\n• New tooltip and checkbox components\n• Landing page updates' },
          ],
        },
        {
          platform: 'WhatsApp',
          messages: [
            { role: 'user', name: 'Sarah B.', text: 'Anything off with our Google Ads this week?' },
            { role: 'agent', text: 'Your Google Ads CPA jumped 23% this week. I\'ve analyzed the campaigns — the "Enterprise" ad group is underperforming.\n\nI recommend:\n1. Shift budget from Enterprise to SMB\n2. Test new ad variants\n3. Update negative keywords\n\nShall I implement this right away?' },
          ],
        },
      ],
    },
    useCases: {
      badge: 'USE CASES',
      title: 'What AIvalanche can do',
      titleHighlight: 'for your team.',
      items: [
        {
          title: 'Marketing Ops',
          description: 'Campaign tracking, content creation, social media monitoring, competitive analysis, and automated reporting.',
          examples: ['Analyze Google Ads', 'Create blog posts', 'Monitor competitors', 'Generate reports'],
        },
        {
          title: 'Sales Ops',
          description: 'CRM management, lead scoring, pipeline updates, meeting prep, and automated follow-ups.',
          examples: ['Update CRM', 'Qualify leads', 'Create proposals', 'Send follow-ups'],
        },
        {
          title: 'Engineering',
          description: 'Code reviews, deployment monitoring, ticket management, documentation, and technical research.',
          examples: ['Create Jira tickets', 'Monitor deployments', 'Update docs', 'Analyze code'],
        },
        {
          title: 'HR & Operations',
          description: 'Onboarding workflows, PTO management, policy questions, team coordination, and process automation.',
          examples: ['Start onboarding', 'Manage PTO', 'Explain policies', 'Schedule meetings'],
        },
      ],
    },
    faq: {
      badge: 'FAQ',
      title: 'Everything you need to know.',
      items: [
        {
          q: 'What exactly is AIvalanche?',
          a: 'AIvalanche is an AI coworker that lives in Slack, Microsoft Teams, or WhatsApp. It has its own computer in the cloud where it writes and runs code to complete tasks. It\'s not a chatbot — it\'s a colleague that does real work.',
        },
        {
          q: 'How is AIvalanche different from ChatGPT?',
          a: 'Most AI tools generate text. AIvalanche executes. It has a persistent workspace, connects to your actual tools, and performs actions — sending emails, updating CRMs, building apps, generating reports. You don\'t copy-paste outputs. AIvalanche does the work end-to-end.',
        },
        {
          q: 'What can AIvalanche actually do?',
          a: 'Automate recurring workflows. Pull data from multiple tools. Build and deploy web apps. Create and edit documents. Browse the web. Research competitors. Generate reports. Anything you can describe, AIvalanche can probably code and execute.',
        },
        {
          q: 'What tools does AIvalanche connect to?',
          a: 'Over 3,000 — including Salesforce, HubSpot, Linear, Notion, Jira, Stripe, GitHub, Google Drive, SAP, Slack, Microsoft Teams, and more. If your tool isn\'t supported, AIvalanche can build a custom integration.',
        },
        {
          q: 'Is my data secure?',
          a: 'Yes. Each user gets an isolated compute environment. AIvalanche only accesses tools you explicitly connect. Data is encrypted in transit and at rest. We don\'t train on your data. Fully GDPR-compliant.',
        },
        {
          q: 'Does AIvalanche have access to all my messages?',
          a: 'AIvalanche only sees channels it\'s invited to. You control where it reads and responds. It remembers context to be helpful, but you can remove it from any channel at any time.',
        },
        {
          q: 'How does AIvalanche learn about my team?',
          a: 'AIvalanche reads conversations in channels it joins, observes workflows, and builds a knowledge base over time. It documents what it learns in "skills" — internal notes it references to work more effectively with your team.',
        },
        {
          q: 'Can AIvalanche make mistakes?',
          a: 'Yes. AIvalanche is capable, not infallible. It double-checks its work and asks for confirmation before high-stakes actions like sending emails or deploying to production. You stay in control.',
        },
        {
          q: 'How long does setup take?',
          a: 'Minutes. Install AIvalanche in Slack or Teams, connect the tools you want, and start working. AIvalanche handles onboarding itself — it\'ll introduce itself and ask what you need help with.',
        },
        {
          q: 'Can multiple people use AIvalanche?',
          a: 'Yes. AIvalanche works across your workspace. Anyone can mention @AIvalanche. It maintains context about the whole team while respecting individual preferences.',
        },
        {
          q: 'Does AIvalanche work outside of Slack?',
          a: 'Slack and Teams are AIvalanche\'s home, but its work extends everywhere — it connects to external tools, deploys apps to the web, and can send emails on your behalf. You interact via chat; AIvalanche works across your stack.',
        },
        {
          q: 'How do I get on the waitlist?',
          a: 'Enter your email address on this page and we\'ll reach out once a spot opens up. Companies in the DACH region are prioritized.',
        },
      ],
    },
    waitlist: {
      badge: 'GET STARTED',
      title: 'Ready to hire your most capable colleague?',
      subtitle: 'Join the waitlist and be among the first companies to use AIvalanche.',
      placeholder: 'Your business email',
      cta: 'Join the Waitlist',
      success: 'Successfully signed up!',
      successSub: 'We\'ll be in touch soon.',
      privacyNote: 'No spam. Unsubscribe anytime. Your data is safe.',
    },
    footer: {
      description: 'An AI coworker that lives in your chat. Automates tasks, connects tools, and does real work for your team.',
      navigation: 'Navigation',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      imprint: 'Imprint',
      contact: 'Contact',
      copyright: '© 2025 AIvalanche. All rights reserved.',
    },
  },
}
