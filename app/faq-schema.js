export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Labflow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Labflow is an AI agent for electronic test and measurement. You describe an experiment in plain English — "sweep VGS from 0 to 3.2 V on the Keithley 2400, capture Id" — and Labflow compiles the brief into typed SCPI, validates it against your bench safety policy, drives the instruments, watches the waveform, flags anomalies, and writes the lab notebook.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which lab instruments does Labflow support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Labflow ships 42 drivers across 11 vendors covering oscilloscopes, source-measure units (Keithley 2400/2450/2461, Keysight B2901A/B2912A), function and arbitrary waveform generators (Rigol DG1022Z/DG4202, Siglent SDG2042X, Keysight 33500B, Tektronix AFG31000), programmable power supplies (R&S NGE100/NGE103B, Keysight E36312A, Rigol DP832), digital multimeters (HP/Agilent 34401A, Keysight 34465A, Fluke 8846A, Keithley DMM6500), DAQ and dataloggers (NI USB-6363/USB-6212, Keysight DAQ970A), electronic loads (Rigol DL3021, B&K Precision 8500, Chroma 63600), and network/spectrum analyzers (Tektronix RSA306B, Keysight N9320B, Siglent SSA3032X, Anritsu MS2090A). New drivers ship monthly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Labflow connect to my instruments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Labflow auto-discovers instruments on GPIB (IEEE-488, via NI-VISA / Prologix / KUSB-488B adapters), USBTMC (plug-and-play), LAN (LXI with mDNS, VXI-11, raw socket, HiSLIP), and serial (RS-232 / RS-485). It speaks SCPI, VISA and IVI fluently and co-exists with your existing vendor GUIs — no rewire required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to let an AI agent drive my bench?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Safety is the floor, not the feature. Every Labflow bench has a policy file with hard per-channel ceilings on voltage, current, ramp rate and dwell — enforced at the driver, not in the prompt. Setpoints above your threshold pause for a dual-sign operator approval. Probe-temperature breach, compliance hit, runaway current or lost link all trigger a clean auto-shutdown without waiting for a human. A single keystroke from the operator suspends the agent and returns control.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I reproduce a Labflow run later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every session emits a signed manifest hashing the protocol, setpoints, driver versions and safety policy with SHA-256. `lf replay` reruns the bench byte-for-byte identically — three years later, on the same instruments or a virtual sandbox.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Labflow output at the end of a run?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Publication-ready lab reports in PDF, HTML, Markdown and LaTeX. Each report contains plots, an auto-written summary of what the agent observed, the full transcript of every tool call and SCPI command, the bench state, and a signed reproducibility manifest. Drop it straight into a thesis, datasheet, or design review.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Labflow cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single bench is free during the public beta — auto-discovery, all 42 drivers, signed reports included. Multi-bench teams pay per bench (Lab tier, $640/bench/month) and get SSO, org-wide policy, audit log and OpenTelemetry export. Enterprise tier is custom, supports self-hosted and air-gapped deployment, and includes on-device inference.',
      },
    },
    {
      '@type': 'Question',
      name: "What if my instrument isn't supported?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If it speaks SCPI or VISA we can usually ship a driver in under a week. For climate chambers, power analyzers and other gear that never adopted SCPI, each driver carries its own wire dialect (Modbus or proprietary). Request a driver from the contact page.',
      },
    },
  ],
}
