'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RelocationType = 'digital_nomad' | 'hnwi' | 'company';
type FamilyStatus = 'single' | 'with_family';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  details?: string[];
  resources?: Array<{ label: string; url?: string }>;
  cost?: string;
  parallel?: boolean;
  familyNote?: string;
}

interface RelocationTimelineProps {
  country: string;
  flag?: string;
  relocationType?: RelocationType;
  familyStatus?: FamilyStatus;
}

// Country-specific resources
const countryResources: Record<string, { embassy?: string; visa?: string; expat?: string; tax?: string; healthcare?: string }> = {
  'Cyprus': {
    embassy: 'https://www.mfa.gov.cy/mfa/highcom/londonhigh.nsf/dmlhome_en',
    visa: 'https://www.moi.gov.cy/moi/crmd/crmd.nsf/page09_en/page09_en',
    expat: 'https://www.facebook.com/groups/expatscyprus/',
    tax: 'https://www.mof.gov.cy/mof/tax/taxdep.nsf',
    healthcare: 'https://www.gesy.org.cy/',
  },
  'Portugal': {
    embassy: 'https://www.portaldascomunidades.mne.gov.pt/',
    visa: 'https://vistos.mne.gov.pt/',
    expat: 'https://www.facebook.com/groups/AmericansLivinginPortugal/',
    tax: 'https://www.portaldasfinancas.gov.pt/',
    healthcare: 'https://www.sns.gov.pt/',
  },
  'Malta': {
    embassy: 'https://foreign.gov.mt/',
    visa: 'https://www.identitymalta.com/',
    expat: 'https://www.facebook.com/groups/expatsinmalta/',
    tax: 'https://cfr.gov.mt/',
    healthcare: 'https://deputyprimeminister.gov.mt/en/health/',
  },
  'Spain': {
    embassy: 'https://www.exteriores.gob.es/',
    visa: 'https://www.inclusion.gob.es/web/guest/w/2089127/entradaestanciayresidencia',
    expat: 'https://www.facebook.com/groups/expatsinspain/',
    tax: 'https://sede.agenciatributaria.gob.es/',
    healthcare: 'https://www.sanidad.gob.es/',
  },
  'Dubai': {
    embassy: 'https://www.government.ae/',
    visa: 'https://www.government.ae/en/information-and-services/visa-and-emirates-id',
    expat: 'https://www.facebook.com/groups/dubaiexpats/',
    tax: 'https://tax.gov.ae/',
    healthcare: 'https://www.dha.gov.ae/',
  },
  'Thailand': {
    embassy: 'https://www.thaiembassy.org/',
    visa: 'https://www.immigration.go.th/',
    expat: 'https://www.facebook.com/groups/expatsinthailand/',
    tax: 'https://www.rd.go.th/english/',
    healthcare: 'https://www.moph.go.th/',
  },
};

// Timeline data for each relocation type
const getTimelineData = (country: string, type: RelocationType, family: FamilyStatus): TimelineStep[] => {
  const resources = countryResources[country] || {};

  const digitalNomadSteps: TimelineStep[] = [
    {
      id: 'research',
      title: 'Research & Planning',
      description: `Understand ${country}'s visa requirements, cost of living, and lifestyle`,
      duration: '1-2 weeks',
      icon: '🔍',
      details: [
        `Research ${country} digital nomad visa requirements`,
        'Calculate cost of living vs current income',
        'Join expat communities on Facebook, Reddit',
        'Research health insurance options',
        'Check timezone overlap with clients/work',
      ],
      resources: [
        { label: 'Nomad List', url: 'https://nomadlist.com' },
        { label: 'Numbeo Cost of Living', url: 'https://numbeo.com' },
        { label: `${country} Expat Community`, url: resources.expat },
        { label: 'Wise Currency', url: 'https://wise.com' },
      ].filter(r => r.url),
    },
    {
      id: 'documentation',
      title: 'Gather Documents',
      description: 'Prepare required documentation for visa application',
      duration: '1-2 weeks',
      icon: '📄',
      details: [
        'Valid passport (6+ months validity)',
        'Proof of income (bank statements, contracts)',
        'Health insurance with required coverage',
        'Clean criminal record certificate',
        ...(family === 'with_family' ? ['Family documents (marriage certificate, birth certificates)', 'Dependent proof of relationship'] : []),
      ],
      familyNote: family === 'with_family' ? 'Add 1 extra week for family documentation' : undefined,
    },
    {
      id: 'visa_application',
      title: 'Visa Application',
      description: `Submit ${country} digital nomad visa application`,
      duration: '2-8 weeks',
      icon: '🛂',
      details: [
        'Complete online or embassy application',
        'Pay application fees',
        'Schedule biometrics appointment if required',
        'Submit supporting documents',
        'Wait for approval decision',
      ],
      resources: [
        { label: `${country} Visa Portal`, url: resources.visa },
        { label: `${country} Embassy`, url: resources.embassy },
        { label: 'Visa Appointment Tracker', url: 'https://visadb.io' },
      ].filter(r => r.url),
      cost: '€70-500',
    },
    {
      id: 'accommodation',
      title: 'Arrange Accommodation',
      description: 'Book initial housing and plan longer-term options',
      duration: '1-2 weeks',
      icon: '🏠',
      details: [
        'Book Airbnb or hotel for first 2-4 weeks',
        'Research neighborhoods for longer-term rental',
        'Join local housing Facebook groups',
        ...(family === 'with_family' ? ['Research family-friendly areas', 'Check proximity to schools and parks'] : []),
      ],
      parallel: true,
    },
    {
      id: 'travel',
      title: 'Travel & Arrival',
      description: 'Move to your new destination',
      duration: '1-3 days',
      icon: '✈️',
      details: [
        'Book one-way or flexible return flights',
        'Arrange airport transfer',
        'Notify banks of travel plans',
        'Set up international SIM or eSIM',
      ],
    },
    {
      id: 'settling',
      title: 'Initial Setup & Registration',
      description: `Complete ${country} local registration and setup`,
      duration: '1-2 weeks',
      icon: '🏢',
      details: [
        'Register with local authorities / town hall',
        'Get local SIM card or phone plan',
        'Open local bank account',
        'Register for tax ID number',
        'Find coworking space or set up home office',
        ...(family === 'with_family' ? ['Register children for school', 'Find pediatrician and family doctor'] : []),
      ],
      resources: [
        { label: `${country} Healthcare System`, url: resources.healthcare },
        { label: `${country} Tax Authority`, url: resources.tax },
        { label: 'Wise (Banking)', url: 'https://wise.com' },
        { label: 'Revolut', url: 'https://revolut.com' },
      ].filter(r => r.url),
    },
    {
      id: 'healthcare',
      title: 'Healthcare Setup',
      description: 'Arrange health insurance and find healthcare providers',
      duration: '1 week',
      icon: '🏥',
      details: [
        'Register with national health system if eligible',
        'Arrange private health insurance if needed',
        'Find local GP / family doctor',
        'Locate nearest hospitals and pharmacies',
        'Transfer medical records from home country',
      ],
      resources: [
        { label: `${country} Health System`, url: resources.healthcare },
        { label: 'SafetyWing Insurance', url: 'https://safetywing.com' },
        { label: 'World Nomads', url: 'https://worldnomads.com' },
      ].filter(r => r.url),
      cost: '€50-300/month',
    },
    {
      id: 'banking',
      title: 'Banking & Finance',
      description: 'Set up local banking and financial infrastructure',
      duration: '1-2 weeks',
      icon: '🏦',
      details: [
        'Open local bank account (may need residence permit)',
        'Set up Wise/Revolut for international transfers',
        'Understand tax obligations',
        'Consider opening investment accounts',
        'Set up local payment methods',
      ],
      resources: [
        { label: `${country} Tax Info`, url: resources.tax },
        { label: 'Wise Multi-Currency', url: 'https://wise.com' },
        { label: 'Revolut', url: 'https://revolut.com' },
        { label: 'N26', url: 'https://n26.com' },
      ].filter(r => r.url),
    },
    {
      id: 'integration',
      title: 'Community Integration',
      description: 'Build your network and establish routine',
      duration: 'Ongoing',
      icon: '🤝',
      details: [
        'Attend local meetups and events',
        'Join coworking community',
        'Learn basic local language',
        'Explore the area and find favorites',
      ],
    },
  ];

  const hnwiSteps: TimelineStep[] = [
    {
      id: 'tax_planning',
      title: 'Tax & Legal Consultation',
      description: 'Work with international tax advisors to structure relocation',
      duration: '2-4 weeks',
      icon: '⚖️',
      details: [
        'Engage international tax attorney',
        'Review current tax residency obligations',
        'Analyze destination tax benefits',
        'Plan exit strategy from current jurisdiction',
        'Structure investments and assets optimally',
      ],
      resources: [
        { label: 'Find Tax Advisor' },
        { label: 'OECD Tax Guidelines' },
      ],
      cost: '€5,000-20,000',
    },
    {
      id: 'visa_selection',
      title: 'Visa/Residency Selection',
      description: 'Choose optimal residency pathway',
      duration: '1-2 weeks',
      icon: '📋',
      details: [
        'Golden Visa / Investment Visa options',
        'High-income professional visa',
        'Entrepreneur/startup visa',
        'Self-sufficient income visa',
        ...(family === 'with_family' ? ['Family reunification options', 'Dependent visa provisions'] : []),
      ],
      familyNote: family === 'with_family' ? 'Consider pathway with best family provisions' : undefined,
    },
    {
      id: 'investment_structuring',
      title: 'Investment Structuring',
      description: 'Restructure assets and investments for relocation',
      duration: '4-8 weeks',
      icon: '💰',
      details: [
        'Review investment portfolios',
        'Consider property investment if required',
        'Set up compliant banking structure',
        'Plan pension/retirement account transfers',
      ],
      cost: 'Varies significantly',
      parallel: true,
    },
    {
      id: 'documentation_hnw',
      title: 'Document Preparation',
      description: 'Gather extensive documentation for application',
      duration: '3-4 weeks',
      icon: '📄',
      details: [
        'Proof of source of funds',
        'Investment certificates',
        'Property documents if applicable',
        'Enhanced background checks',
        'Apostilled documents',
        ...(family === 'with_family' ? ['Family legal documents', 'School records and transcripts'] : []),
      ],
    },
    {
      id: 'application_hnw',
      title: 'Residency Application',
      description: 'Submit formal residency application',
      duration: '2-6 months',
      icon: '🛂',
      details: [
        'Submit comprehensive application',
        'Due diligence process by authorities',
        'Possible interview',
        'Approval and permit issuance',
      ],
      cost: '€2,000-50,000',
    },
    {
      id: 'property',
      title: 'Property Acquisition',
      description: 'Purchase or lease premium property',
      duration: '4-12 weeks',
      icon: '🏡',
      details: [
        'Engage local real estate agent',
        'Property viewing trips',
        'Legal due diligence',
        'Purchase completion',
        ...(family === 'with_family' ? ['Proximity to international schools', 'Family-friendly neighborhoods', 'Space for home staff'] : []),
      ],
      parallel: true,
    },
    {
      id: 'banking_hnw',
      title: 'Premium Banking Setup',
      description: 'Establish private banking relationships',
      duration: '4-8 weeks',
      icon: '🏦',
      details: [
        'Private banking account opening',
        'Investment account setup',
        'Credit facilities if needed',
        'Multi-currency capabilities',
      ],
    },
    {
      id: 'lifestyle_setup',
      title: 'Lifestyle Establishment',
      description: 'Set up premium lifestyle services',
      duration: '2-4 weeks',
      icon: '✨',
      details: [
        'Concierge services',
        'Private healthcare registration',
        'Club memberships',
        'Vehicle acquisition',
        ...(family === 'with_family' ? ['International school enrollment', 'Nanny/household staff', 'Family healthcare registration'] : []),
      ],
    },
  ];

  const companySteps: TimelineStep[] = [
    {
      id: 'strategic_planning',
      title: 'Strategic Planning',
      description: 'Define relocation goals and structure',
      duration: '2-4 weeks',
      icon: '🎯',
      details: [
        'Define relocation objectives',
        'Analyze tax implications for company',
        'Evaluate substance requirements',
        'Plan employee relocation strategy',
      ],
      resources: [
        { label: 'Big 4 Advisory Services' },
        { label: 'Local Chamber of Commerce' },
      ],
      cost: '€10,000-50,000',
    },
    {
      id: 'legal_structure',
      title: 'Legal Structure Design',
      description: 'Design optimal corporate structure',
      duration: '2-3 weeks',
      icon: '⚖️',
      details: [
        'Choose entity type (Ltd, LLC, Branch)',
        'Holding company considerations',
        'IP structuring if applicable',
        'Substance requirements planning',
      ],
    },
    {
      id: 'incorporation',
      title: 'Company Incorporation',
      description: 'Register the legal entity',
      duration: '1-4 weeks',
      icon: '🏢',
      details: [
        'Reserve company name',
        'Prepare incorporation documents',
        'Register with authorities',
        'Obtain registration certificates',
      ],
      cost: '€1,500-5,000',
    },
    {
      id: 'regulatory',
      title: 'Regulatory Compliance',
      description: 'Obtain necessary licenses and registrations',
      duration: '2-8 weeks',
      icon: '📋',
      details: [
        'VAT registration',
        'Industry-specific licenses',
        'Data protection registration',
        'Employment authority registration',
      ],
    },
    {
      id: 'banking_corp',
      title: 'Corporate Banking',
      description: 'Establish business banking relationships',
      duration: '4-8 weeks',
      icon: '🏦',
      details: [
        'Corporate account opening',
        'Payment processing setup',
        'Trade finance facilities',
        'Multi-currency accounts',
      ],
    },
    {
      id: 'office_setup',
      title: 'Office Establishment',
      description: 'Set up physical or virtual office presence',
      duration: '2-4 weeks',
      icon: '🖥️',
      details: [
        'Lease office space or serviced office',
        'IT infrastructure setup',
        'Register office address',
        'Utilities and services',
      ],
      parallel: true,
      cost: '€2,000-10,000/month',
    },
    {
      id: 'employee_relocation',
      title: 'Employee Relocation',
      description: 'Relocate key staff and hire locally',
      duration: '4-12 weeks',
      icon: '👥',
      details: [
        'Work permit applications for key staff',
        'Relocation packages',
        'Local hiring processes',
        'Payroll and HR setup',
        ...(family === 'with_family' ? ['Family relocation support', 'School finding services', 'Spousal work permit support'] : []),
      ],
    },
    {
      id: 'operations',
      title: 'Operational Launch',
      description: 'Begin full business operations',
      duration: 'Ongoing',
      icon: '🚀',
      details: [
        'Client migration',
        'Supplier onboarding',
        'Marketing launch',
        'Full operational capacity',
      ],
    },
  ];

  switch (type) {
    case 'digital_nomad':
      return digitalNomadSteps;
    case 'hnwi':
      return hnwiSteps;
    case 'company':
      return companySteps;
    default:
      return digitalNomadSteps;
  }
};

export function RelocationTimeline({
  country,
  flag,
  relocationType: initialType = 'digital_nomad',
  familyStatus: initialFamily = 'single',
}: RelocationTimelineProps) {
  const [relocationType, setRelocationType] = useState<RelocationType>(initialType);
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus>(initialFamily);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const steps = getTimelineData(country, relocationType, familyStatus);

  const typeLabels: Record<RelocationType, { label: string; icon: string }> = {
    digital_nomad: { label: 'Digital Nomad', icon: '💻' },
    hnwi: { label: 'High Net Worth', icon: '💎' },
    company: { label: 'Company', icon: '🏢' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-white/5 px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          {flag && <span className="text-2xl">{flag}</span>}
          <h3 className="text-lg font-semibold text-white">
            Relocation Timeline to {country}
          </h3>
        </div>

        {/* Type Selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(typeLabels) as RelocationType[]).map((type) => (
            <button
              key={type}
              onClick={() => setRelocationType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                relocationType === type
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {typeLabels[type].icon} {typeLabels[type].label}
            </button>
          ))}
        </div>

        {/* Family Toggle */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/60">Family Status:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFamilyStatus('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                familyStatus === 'single'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Single/Couple
            </button>
            <button
              onClick={() => setFamilyStatus('with_family')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                familyStatus === 'with_family'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              With Family/Dependents
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${relocationType}-${familyStatus}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Icon circle */}
                  <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 ${
                    step.parallel ? 'bg-purple-500/20 border-2 border-purple-500' : 'bg-amber-500/20 border-2 border-amber-500'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div
                    className={`bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all ${
                      expandedStep === step.id ? 'ring-2 ring-amber-500/50' : 'hover:bg-white/10'
                    }`}
                    onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{step.title}</h4>
                          <p className="text-sm text-white/60 mt-1">{step.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {step.parallel && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                              Parallel
                            </span>
                          )}
                          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full font-medium">
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      {step.cost && (
                        <div className="mt-2">
                          <span className="text-xs text-white/50">Est. Cost: </span>
                          <span className="text-xs text-emerald-400 font-medium">{step.cost}</span>
                        </div>
                      )}

                      {step.familyNote && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-purple-400 text-xs">👨‍👩‍👧</span>
                          <span className="text-xs text-purple-400">{step.familyNote}</span>
                        </div>
                      )}
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedStep === step.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-white/10"
                        >
                          <div className="p-4 space-y-4">
                            {step.details && (
                              <div>
                                <h5 className="text-xs font-medium text-white/50 mb-2">STEPS</h5>
                                <ul className="space-y-2">
                                  {step.details.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                                      <span className="text-amber-400 mt-0.5">•</span>
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {step.resources && step.resources.length > 0 && (
                              <div>
                                <h5 className="text-xs font-medium text-white/50 mb-2">RESOURCES & LINKS</h5>
                                <div className="flex flex-wrap gap-2">
                                  {step.resources.map((resource, i) => (
                                    resource.url ? (
                                      <a
                                        key={i}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full hover:bg-blue-500/30 transition-colors flex items-center gap-1"
                                      >
                                        {resource.label}
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                      </a>
                                    ) : (
                                      <span
                                        key={i}
                                        className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                                      >
                                        {resource.label}
                                      </span>
                                    )
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-white/5 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-white/60">
            Total estimated time: <span className="text-white font-medium">
              {relocationType === 'digital_nomad' ? '6-12 weeks' :
               relocationType === 'hnwi' ? '4-8 months' :
               '3-6 months'}
            </span>
          </div>
          <div className="text-xs text-white/40">
            Click each step for details
          </div>
        </div>
      </div>
    </motion.div>
  );
}
