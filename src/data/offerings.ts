export type Offering = {
  name: string
  body: string
  brings: string[]
}

export type OfferingGroup = {
  slug: string
  eyebrow: string
  titleLines: [string, string]
  watermark: string
  intro: string
  items: Offering[]
}

export const OFFERING_GROUPS: OfferingGroup[] = [
  {
    slug: 'pre-deal',
    eyebrow: 'PRE-DEAL',
    titleLines: ['Before the deal', 'is the deal.'],
    watermark: 'P',
    intro:
      'The costliest leadership decisions are taken before ownership begins. We work alongside investors in the quiet phase — origination through diligence — so conviction about the business includes conviction about its leaders.',
    items: [
      {
        name: 'Deal Origination, Identification & Management Access',
        body: 'Our senior network opens doors that processes never reach. We surface off-market opportunities, connect investment theses to the executives who can test them, and broker early, discreet access to management teams — long before a teaser is sent.',
        brings: [
          'Proprietary opportunity flow',
          'Thesis-led executive sounding boards',
          'Warm management introductions',
          'Chair-led origination campaigns',
        ],
      },
      {
        name: 'Deal Advisor Sourcing',
        body: 'The right advisers change the shape of a deal. We assemble the bench around a transaction — chairs, operating partners and diligence specialists matched to sector, thesis and stage — so every seat at the table earns its place.',
        brings: [
          'Deal chair & NED sourcing',
          'Operating partner matching',
          'Diligence specialist selection',
          'Advisory bench design',
        ],
      },
      {
        name: 'Leadership Scan',
        body: 'A fast, evidence-based read on the leadership team you are about to back. Delivered pre-LOI, without noise: strengths, risks, gaps against the value-creation plan, and what Day One should change.',
        brings: [
          'Pre-LOI leadership assessment',
          'Team risk map',
          'Capability vs. plan analysis',
          'First-100-days implications',
        ],
      },
    ],
  },
  {
    slug: 'leadership-advisory',
    eyebrow: 'LEADERSHIP ADVISORY',
    titleLines: ['The hold period,', 'held together.'],
    watermark: 'A',
    intro:
      'Ownership is where leadership either compounds value or quietly leaks it. We stay close through the hold — aligning, strengthening and resetting teams as the plan evolves.',
    items: [
      {
        name: 'Leadership Mobilisation',
        body: 'Post-completion, we align the team behind the value-creation plan: who owns what, at what cadence, with which measures. Momentum built early — and kept.',
        brings: [
          'Value-creation plan alignment',
          'Role & accountability design',
          'Operating cadence',
          'First-100-days execution',
        ],
      },
      {
        name: 'Succession Planning',
        body: 'Every critical seat should have cover before it needs it. We map succession across the top team, develop the internal bench, and keep discreet external options warm — so a resignation is an event, not a crisis.',
        brings: [
          'Critical-seat mapping',
          'Internal bench development',
          'External cover options',
          'Emergency succession protocols',
        ],
      },
      {
        name: 'Management Reset',
        body: 'Sometimes the plan and the team drift apart. We say so early, with evidence — reshaping roles, recalibrating expectations and handling the hardest conversations with the care they deserve.',
        brings: [
          'Evidence-based team review',
          'Role reshaping',
          'Transitions handled well',
          'Re-aligned incentives',
        ],
      },
      {
        name: 'Exit Preparation',
        body: 'Buyers diligence leadership as hard as they diligence numbers. Twelve to eighteen months out, we close the gaps, sharpen the story and build the evidence base — so the team is an asset in the process, not a discount.',
        brings: [
          'Leadership readiness review',
          'Gap-closure programmes',
          'Management story & evidence',
          'Vendor diligence preparation',
        ],
      },
    ],
  },
  {
    slug: 'leadership-change',
    eyebrow: 'LEADERSHIP CHANGE',
    titleLines: ['When the answer is', 'a different person.'],
    watermark: 'C',
    intro:
      'Some moments call for change — decided quickly and done well. We find, place and validate the leaders a plan needs, permanent or interim, with evidence at every step.',
    items: [
      {
        name: 'Executive Search',
        body: 'Retained search for the seats that move value. Discreet mapping, honest assessment and a shortlist chosen to stay — not to flatter the brief.',
        brings: [
          'Retained senior search',
          'Discreet market mapping',
          'Evidence-based assessment',
          'Post-placement follow-through',
        ],
      },
      {
        name: 'Executive Interim',
        body: 'Proven operators in the seat within weeks. Bridge a departure, lead a turnaround, drive a programme — with executives who have done it before, under the same pressures.',
        brings: [
          'Interim CEOs & CFOs',
          'Turnaround leadership',
          'Programme & transformation leads',
          'Bridge-to-permanent options',
        ],
      },
      {
        name: 'Leadership Evaluation',
        body: 'Evidence over instinct. We assess individuals and whole teams against the plan they must deliver — clear-eyed about strengths, honest about gaps, specific about what to do next.',
        brings: [
          'Individual assessment',
          'Top-team evaluation',
          'Capability benchmarks',
          'Development & hiring roadmaps',
        ],
      },
    ],
  },
]
