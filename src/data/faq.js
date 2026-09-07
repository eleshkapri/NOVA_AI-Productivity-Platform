export const faqData = [
  {
    id: 'faq-1',
    question: 'How does NOVA connect with our existing tools like GitHub and Linear?',
    answer:
      'NOVA connects via standard OAuth 2.0 and official webhooks. Setup takes under 60 seconds. You simply grant read/write access to your designated repositories or issue boards. NOVA never requires administrative repo deletion permissions.',
  },
  {
    id: 'faq-2',
    question: 'Will our proprietary code or issue data be used to train public AI models?',
    answer:
      'Never. We hold strict zero-data retention agreements with our model inference providers. Your source code, issue discussions, and PR diffs are processed in ephemeral memory and discarded immediately after generation. We are fully SOC2 Type II certified and GDPR compliant.',
  },
  {
    id: 'faq-3',
    question: 'How accurate is the AI in estimating story points and sprint velocity?',
    answer:
      'NOVA analyzes your team’s past 6 completed sprints, PR merge velocities, and historical cycle times to calibrate its estimation engine. On average, teams experience a 94% accuracy rate in sprint completion predictions within their first three sprint cycles.',
  },
  {
    id: 'faq-4',
    question: 'Can I test NOVA without entering a credit card?',
    answer:
      'Yes! Our Starter plan is completely free forever for individual developers with up to 3 repositories. You can also start a 14-day full-access trial of the Pro tier without entering any credit card or billing details.',
  },
  {
    id: 'faq-5',
    question: 'How does the monthly vs. annual billing discount work?',
    answer:
      'Choosing annual billing provides an immediate 20% discount across all paid seats. You are billed once per year with full flexibility to add or remove seats dynamically as your engineering team scales.',
  },
  {
    id: 'faq-6',
    question: 'Can we deploy NOVA on-premises or within our private AWS/GCP VPC?',
    answer:
      'Yes. For Enterprise tier customers with stringent regulatory requirements (e.g. banking, healthcare, defense), we provide Dockerized and Kubernetes-ready self-hosted deployments inside your own private cloud or isolated VPC.',
  },
];
