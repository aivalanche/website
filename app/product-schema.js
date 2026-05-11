export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Labflow',
  applicationCategory: 'EngineeringApplication',
  applicationSubCategory: 'Laboratory instrument automation',
  operatingSystem: 'Linux, macOS, Windows',
  description:
    'Labflow is the AI agent for electronic test and measurement. Drive oscilloscopes, source-measure units, function generators, power supplies, DMMs and DAQs from one agent — natural language in, SCPI out, signed reports back.',
  url: 'https://aivalanche.com',
  brand: { '@type': 'Brand', name: 'Labflow' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Bench',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://aivalanche.com/pricing',
      description: 'Free during public beta — single bench, up to 6 instruments, all 42 drivers, signed reports.',
    },
    {
      '@type': 'Offer',
      name: 'Lab',
      price: '640',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://aivalanche.com/pricing',
      description:
        'Per bench / month, billed annually. Unlimited benches and instruments, SSO/SCIM, org-wide policy, audit log, OpenTelemetry export.',
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://aivalanche.com/contact',
      description: 'Custom — self-hosted or air-gapped, on-device agent, custom driver SLA, 24×7 support.',
    },
  ],
  featureList: [
    'Natural-language protocols compiled to SCPI / VISA / IVI',
    'Drivers for 42 instruments across 11 vendors (Keithley, Keysight, Tektronix, Rigol, R&S, Siglent, Fluke, NI, B&K Precision, Chroma, Anritsu)',
    'Auto-discovery on GPIB, USBTMC, LAN (LXI / VXI-11 / HiSLIP) and serial',
    'Multi-instrument choreography across SMU, scope, function generator, PSU, DMM and DAQ',
    'Human-in-the-loop safety with hardware-enforced compliance ceilings and dual-sign approvals',
    'Live waveform reasoning with plain-English anomaly flagging',
    'Signed, reproducible session manifests with byte-identical replay',
    'Publication-ready reports in PDF, HTML, Markdown and LaTeX',
  ],
  keywords:
    'AI agent for lab instruments, AI for oscilloscope, AI for Keithley SMU, AI for function generator, natural language SCPI, LLM lab automation, agentic lab automation, electronics lab automation, PyVISA AI agent, SCPI automation, test and measurement automation, Labflow',
}
