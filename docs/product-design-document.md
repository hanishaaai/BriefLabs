# Lumia Brief

## Product name exploration

- Lumia Brief
- Aurel
- Narra Studio
- Briefline
- Museframe

Selected name: **Lumia Brief**

Why it works: it feels premium, light-led, brand-safe, and naturally connected to clarity.

## Section 1: Product Design Document

### Product overview

Lumia Brief is a premium web app for brand and marketing teams who need to create stronger influencer creative briefs. It combines guided campaign structuring, AI-assisted strategy refinement, concept generation, creator-interpretation analysis, and polished final brief output in one elegant workspace.

### Problem statement

Most influencer briefs are built in tools that were never designed for creator collaboration. They become long, inconsistent, vague, or overly controlling. Teams need help balancing strategic clarity with creative freedom while producing briefs that are clean enough to share externally.

### User personas

1. Brand marketing lead
Needs strategic clarity, brand safety, and better campaign performance.
2. Social media manager
Needs speed, consistency, and fewer creator clarification loops.
3. Influencer marketing manager
Needs creator-aligned briefs that reduce ambiguity and improve output quality.
4. Agency strategist
Needs polished deliverables that look premium in front of clients.
5. Startup founder
Needs expert-level guidance without building an entire internal team.

### Jobs to be done

- Help me turn scattered campaign notes into a brief a creator can actually use.
- Help me spot what is unclear before I send the brief.
- Help me generate stronger hooks, concepts, and messaging routes.
- Help me guide the creator without sounding rigid or robotic.
- Help me create an output that feels more polished than a doc or slide deck.

### Product vision

Create the most elegant and strategically useful workspace for influencer creative briefing: a tool that helps teams think better, brief better, and ship better creator campaigns.

### Goals

- Improve brief clarity and completeness.
- Improve creator alignment before content production begins.
- Reduce revision and clarification loops.
- Increase confidence in the final brief.
- Make the output visually beautiful enough to share as-is.

### Non-goals

- Full influencer sourcing and CRM in V1.
- Contracts and payments workflow in V1.
- Large-scale enterprise permissions and governance in V1.

### Design principles

- Visually elegant: editorial calm, premium materials, strong hierarchy.
- Assistive, not robotic: AI behaves like a strategist, not a text machine.
- Structured but inspiring: enough rigor to be useful, enough openness to stay creative.
- Strategic clarity: every feature should reduce misalignment risk.
- Delightful UX: low-friction, satisfying, and thoughtfully paced.

### MVP scope

- Premium landing page
- Dashboard and saved briefs workspace
- Template gallery
- Multi-step guided brief builder
- AI suggestions panel
- Hook and idea generation
- Influencer interpretation analyzer
- Brief readiness scoring
- Final brief preview page

### Future scope

- Comments and teammate review
- Approval workflows
- Version history and comparisons
- Creator persona simulation
- Platform-specific reformatting
- Creator-side summary view
- Brief tone controls
- Translation into creator-friendlier phrasing

### Competitive differentiation

- More strategic than a form builder
- More elegant than Google Docs and slides
- More creator-aware than generic AI writing tools
- More polished and premium than typical campaign management dashboards

### Success metrics

- Brief creation completion rate
- Readiness score improvement per draft
- Export/share conversion rate
- Repeat usage of templates
- Time to first completed brief
- Reduction in post-send clarification requests

### Risks and assumptions

Risks:

- Users may expect production-grade export and collaboration sooner than V1 supports.
- Poor inputs could lead to generic AI outputs if guidance is not strong enough.
- Too much structure could feel limiting.

Assumptions:

- Teams care about presentation quality enough to adopt a new tool.
- Interpretation analysis creates meaningful trust and differentiation.
- Users want strategic assistance but still want to stay in control.

## Section 2: User Experience Strategy

### Main user journey

1. User lands on the site and quickly understands the value proposition.
2. User enters the dashboard and chooses a template or starts blank.
3. User completes the builder in guided steps with AI support.
4. User generates hooks and concept ideas once the brief has enough context.
5. User reviews the interpretation analysis and readiness score.
6. User refines the brief and moves to final preview.
7. User shares or exports the final brief.

### Onboarding flow

- Minimal welcome screen
- Select role and campaign type
- Choose brand/workspace name
- Enter the dashboard with recommended templates

### Brief creation flow

- Choose template or blank brief
- Fill campaign core
- Define audience and creator fit
- Shape creative direction
- Add logistics, rights, and approval requirements
- Review AI suggestions
- Save draft continuously

### Idea generation flow

- Trigger once objective, audience, creator type, and message are populated
- Generate hooks, POVs, storytelling routes, and scene prompts
- Add selected ideas directly into the brief

### Brief testing flow

- Run interpretation analysis
- Review likely creator reactions
- View ambiguous sections
- Review score and recommended fixes
- Apply edits inline

### Finalization/export flow

- Open final preview
- Confirm structure and visual readiness
- Share via link or export-style layout

### Saved briefs/dashboard flow

- Open recent projects
- Filter by status or brand
- Duplicate, revise, or compare versions
- Continue unfinished drafts quickly

## Section 3: Information Architecture

- Landing page
- Auth flow
- Dashboard
- Template gallery
- New brief builder
- AI suggestions panel
- Hook and idea generator
- Interpretation analyzer
- Final brief preview
- Saved projects
- Settings and account

## Section 4: Page-by-Page Product Spec

### Landing page

- Goal: create trust and desire
- Key UI sections: hero, features, workflow preview, benefits, CTA footer
- Primary CTA: Start building
- Secondary CTA: Explore preview
- Elegant details: editorial typography, layered soft panels, restrained accents, quiet motion

### Dashboard

- Goal: give users a refined workspace overview
- Key UI sections: welcome header, stats, recent briefs, recommended templates
- Primary CTA: New brief
- Secondary CTA: Browse templates
- States: empty workspace, populated workspace, loading skeletons
- Elegant details: curated cards and low-density metrics

### Template gallery

- Goal: reduce blank-page friction
- Sections: filters, featured templates, template grid
- Primary CTA: Use template
- Secondary CTA: Start blank
- Elegant details: each card feels like a crafted creative starting point

### Brief builder

- Goal: guide input without feeling like a generic form
- Sections: sticky progress rail, step canvas, prompt cards, AI side panel
- Primary CTA: Continue
- Secondary CTA: Save draft
- States: draft, partially complete, AI refresh, autosave
- Elegant details: progressive disclosure, soft dividers, intelligent side assistance

### Hook generator

- Goal: expand creative possibilities
- Sections: generator controls, hook cards, angle groupings, add-to-brief actions
- Primary CTA: Generate ideas
- Secondary CTA: Add selected ideas
- Elegant details: outputs feel collectible and thoughtfully edited

### Interpretation analyzer

- Goal: reveal creator-side misreads before send
- Sections: score, clarity highlights, ambiguity, constraints, recommendations
- Primary CTA: Apply recommendations
- Secondary CTA: Go to preview
- Elegant details: insight language feels calm and diagnostic, never harsh

### Final brief preview

- Goal: provide a clean share-ready document experience
- Sections: summary header, campaign blocks, creative direction, logistics, share/export actions
- Primary CTA: Share brief
- Secondary CTA: Export PDF
- Elegant details: document-like rhythm, strong type hierarchy, elevated whitespace

## Section 5: Design System + Visual Direction

### Visual style direction

Modern editorial SaaS with warm neutral surfaces, deep charcoal text, desaturated green accents, and subtle clay warmth.

### Layout principles

- Use strong max-width containers
- Prioritize whitespace over dashboard density
- Use sticky supporting panels
- Break long workflows into calm, readable modules

### Spacing system

4, 8, 12, 16, 24, 32, 48, 64, 96

### Grid recommendations

- 12-column desktop
- 6-column tablet
- 4-column mobile
- Use asymmetry for hero and feature storytelling

### Typography

- Display: elegant serif with modern contrast
- UI text: clean sans serif
- Hierarchy should feel luxurious and highly legible

### Color palette direction

- Canvas beige
- Ivory cards
- Charcoal text
- Eucalyptus green primary accent
- Muted terracotta accent

### Icon style

Thin-line, precise, contemporary, not playful

### Card style

Soft corners, light borders, quiet shadows, subtle internal padding rhythm

### Button style

Primary: deep green filled
Secondary: soft ivory outline
Ghost: text with quiet hover tint

### Form fields

Tall, airy, softly rounded, light border, carefully spaced labels and hints

### Navigation

Minimal top navigation for marketing, elegant sidebar or segmented nav for workspace

### Motion

- Slight upward reveal on load
- Soft panel transitions
- Gentle hover lift
- Keep transitions below 220ms

### Empty states

Editorial illustrations or abstract compositional cards, never generic clip-art

### AI output styling

Tinted panels with clear headings, score chips, and concise recommendation actions

### Making it feel premium

- Fewer but better elements
- Intentional whitespace
- Warm material palette
- Strong type rhythm
- Crisp alignment
- Avoid rainbow accents and dense admin-table aesthetics

## Section 6: Core UX Components

- Step progress sidebar
- Smart prompt cards
- AI recommendation cards
- Quality score meter
- Interpretation insight panel
- Hook generator cards
- Reference and inspiration module
- Final brief section blocks
- Template cards
- Save/draft indicator

## Section 7: Copy + Content Strategy

### Voice

Clear, polished, concise, creative-industry friendly, strategic but approachable.

### Sample microcopy

- Onboarding: Tell us what kind of campaign you are shaping, and we will prepare a stronger starting point.
- Empty state: Start from a blank brief or choose a template designed around how creators actually work.
- AI recommendation: This section is strong, though creators may still need a clearer cue on how visible the CTA should be.
- Warning state: The direction is inspiring, but one or two details may still be open to interpretation.
- Success confirmation: Your brief is now clear, creator-friendly, and ready to share.
- Export action: Prepare a clean share link or presentation-style view.

## Section 8: Technical Architecture Recommendation

### Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style component primitives if needed
- Framer Motion for subtle interface animation
- Supabase for auth and data

### Frontend structure

- `app/` route groups for marketing and workspace
- reusable `components/`
- `data/` for templates and mocked AI outputs
- `lib/` for utilities, prompts, and API abstractions

### Backend needs

- Authentication
- Persistent briefs and projects
- Template storage
- AI generation and analysis endpoints
- Share link generation

### Suggested data model

- users
- brands
- projects
- briefs
- brief_versions
- templates
- ai_generations
- brief_scores
- share_links

### API routes/functions

- create brief
- update brief
- analyze brief
- generate hooks
- export brief
- create share link

### AI service touchpoints

- gap detection
- language refinement
- creator-friendly rewriting
- hook generation
- interpretation analysis
- readiness scoring

### Export/share

V1 can rely on polished web preview and print styles. Later add server-side PDF rendering.

## Section 9: V1 Build Plan

1. Build the brand, layout, and design system foundation.
2. Implement landing, dashboard, template gallery, builder, and preview routes.
3. Use realistic placeholder content for AI outputs and saved work.
4. Focus interaction polish on layout, navigation, stickiness, and transitions.
5. Leave backend hooks implied but not yet fully wired.

## Section 10: First Version Build Notes

The first version should include:

- beautiful landing page
- polished dashboard
- template picker
- multi-step brief builder
- AI suggestions panel
- hook generator
- influencer interpretation analyzer
- final brief preview page

The implementation should feel realistic, high-end, and pitch-ready even before live backend services are connected.
