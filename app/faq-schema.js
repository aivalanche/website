export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is LabFlow?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "LabFlow is an AI-Assisted Lab Engineer that unifies instrumentation control, Python/LabVIEW scripting, and high-resolution dashboards into a single desktop experience. It enables engineers and scientists to automate laboratory workflows, reduce experiment time, and accelerate R&D cycles."
            }
        },
        {
            "@type": "Question",
            "name": "How does OpticFlow accelerate optical design?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "OpticFlow accelerates optical design through differentiable ray tracing and gradient-based optimization. It automates optomechanical workflows, eliminating weeks of back-and-forth between optical and mechanical design. Engineers can go from concept to prototype in hours rather than weeks by automating repetitive tasks and enabling rapid exploration of the design space."
            }
        },
        {
            "@type": "Question",
            "name": "What is Sfera used for?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sfera is a Parametric Models Optimizer for BSIM4 and semiconductor design. It uses advanced Bayesian optimization and evolutionary algorithms to dramatically accelerate model fitting for CMOS processes. This tool is essential for semiconductor engineers who need to optimize circuit models for accuracy and performance across multiple parameters and operating conditions."
            }
        },
        {
            "@type": "Question",
            "name": "Can AIvalanche tools integrate with my existing workflows?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all AIvalanche tools are designed for seamless integration with industry-standard workflows. LabFlow works with existing Python and LabVIEW scripts, OpticFlow can export to Zemax OpticStudio and other CAD systems, and Sfera produces standard SPICE models compatible with all major circuit simulators. Our focus is on enhancing your existing processes rather than replacing them."
            }
        },
        {
            "@type": "Question",
            "name": "Do I need special hardware to run AIvalanche software?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "While our software can benefit from GPU acceleration, all our tools are designed to run effectively on standard engineering workstations. For larger computational tasks, we offer cloud computation options that can scale with your needs without requiring special on-premises hardware. Contact us for specific system requirements for each product."
            }
        }
    ]
}; 