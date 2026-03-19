create extension if not exists pgcrypto;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand_name text not null,
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  tone text not null,
  tags text[] not null default '{}',
  category text not null default 'general',
  sort_order integer not null default 100,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists briefs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete set null,
  slug text not null unique,
  title text not null,
  brand text not null,
  status text not null default 'Draft',
  readiness integer not null default 0 check (readiness between 0 and 100),
  summary text not null default '',
  objective text not null default '',
  audience text not null default '',
  creator_type text not null default '',
  key_message text not null default '',
  tone_vibe text not null default '',
  visual_direction text not null default '',
  deliverables text[] not null default '{}',
  usage_rights text not null default '',
  final_sections jsonb not null default '[]'::jsonb,
  ai_recommendations jsonb not null default '[]'::jsonb,
  interpretation_insights jsonb not null default '[]'::jsonb,
  hooks text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists briefs_updated_at_idx on briefs (updated_at desc);
create index if not exists templates_sort_order_idx on templates (sort_order asc);

insert into projects (slug, name, brand_name)
values
  ('aster-co-spring', 'Spring Creator Momentum', 'Aster & Co.')
on conflict (slug) do nothing;

insert into templates (slug, title, description, tone, tags, category, sort_order)
values
  (
    'product-launch',
    'Product Launch',
    'For hero SKUs, feature education, and creator first impressions.',
    'Sharp launch energy',
    array['Conversion', 'TikTok', 'UGC'],
    'launch',
    10
  ),
  (
    'back-to-school',
    'Back-to-School Campaign',
    'Structured for lifestyle storytelling, routines, and shopping seasonality.',
    'Fresh, relatable, daily-use',
    array['Seasonal', 'Lifestyle', 'Instagram'],
    'seasonal',
    20
  ),
  (
    'app-promotion',
    'App Promotion',
    'Ideal for demo-driven creators, feature education, and conversion proof.',
    'Clean, utility-led',
    array['Demo', 'YouTube Shorts', 'Paid usage'],
    'conversion',
    30
  ),
  (
    'ugc-brief',
    'UGC Brief',
    'Designed for native-looking creator content with flexible brand cues.',
    'Natural, creator-first',
    array['UGC', 'Whitelisting', 'Meta'],
    'ugc',
    40
  ),
  (
    'awareness-campaign',
    'Awareness Campaign',
    'For top-of-funnel reach with memorability and brand lift in mind.',
    'Distinctive and broad',
    array['Reach', 'Storytelling', 'Brand'],
    'awareness',
    50
  ),
  (
    'giveaway-campaign',
    'Giveaway Campaign',
    'Built around urgency, participation mechanics, and clear CTA delivery.',
    'Energetic but simple',
    array['Activation', 'Community', 'CTA'],
    'activation',
    60
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  tone = excluded.tone,
  tags = excluded.tags,
  category = excluded.category,
  sort_order = excluded.sort_order;

insert into briefs (
  project_id,
  slug,
  title,
  brand,
  status,
  readiness,
  summary,
  objective,
  audience,
  creator_type,
  key_message,
  tone_vibe,
  visual_direction,
  deliverables,
  usage_rights,
  final_sections,
  ai_recommendations,
  interpretation_insights,
  hooks
)
select
  projects.id,
  'solstice-serum-spring-push',
  'Solstice Serum Spring Push',
  'Aster & Co.',
  'In review',
  84,
  'Strong strategic framing with minor CTA ambiguity and one slightly prescriptive visual instruction.',
  'Drive high-intent consideration among skincare-curious women aged 24-34.',
  'Beauty-aware consumers seeking gentle but effective routines.',
  'Trusted skincare educators with polished but intimate routines.',
  'Visible glow can come from barrier support, not harsh actives.',
  'Calm confidence, elevated bathroom shelf energy, real skin over perfection.',
  'Soft natural light, vanity textures, tight product moments, morning-routine pacing.',
  array[
    '1 x short-form video, 30-45 seconds',
    'Clear product visibility in use',
    'On-screen CTA with optional spoken reinforcement'
  ],
  '90-day paid usage across paid social, plus brand organic reposting and whitelisting pending creator approval.',
  jsonb_build_array(
    jsonb_build_object(
      'title', 'Campaign Summary',
      'content', 'Solstice Serum Spring Push introduces a barrier-first skincare story designed for creators who can translate efficacy into calm, intimate routine content.'
    ),
    jsonb_build_object(
      'title', 'The Ask',
      'content', 'Create one 30-45 second short-form video that shows how the serum fits naturally into a gentle glow-focused routine, with a clear product moment and a light conversion CTA.'
    ),
    jsonb_build_object(
      'title', 'Creative Direction',
      'content', 'Keep the content soft, premium, and human. Prioritize natural light, tactile product texture, and grounded narration over scripted claims.'
    ),
    jsonb_build_object(
      'title', 'Guardrails',
      'content', 'Avoid medical framing, avoid before/after promises, and avoid language that makes the routine feel over-engineered or inaccessible.'
    )
  ),
  jsonb_build_array(
    jsonb_build_object(
      'title', 'Clarify the CTA format',
      'body', 'Consider specifying whether the CTA should be spoken, on-screen, or both. Creators may prioritize one and omit the other.',
      'type', 'Gap'
    ),
    jsonb_build_object(
      'title', 'Loosen one visual instruction',
      'body', 'The brief is directionally strong, but the visual guidance may feel slightly constrained. You could frame it as an invitation rather than a requirement.',
      'type', 'Tone'
    )
  ),
  jsonb_build_array(
    jsonb_build_object(
      'title', 'What feels clear',
      'text', 'Creators will likely understand the emotional tone, brand aesthetic, and desired audience quickly.'
    ),
    jsonb_build_object(
      'title', 'What may be vague',
      'text', 'The difference between natural product integration and visible product demonstration could still be interpreted in several ways.'
    )
  ),
  array[
    'I stopped chasing stronger actives and my skin actually looks better.',
    'If your glow routine feels too aggressive, this is the switch I would make.',
    'Not every skincare result has to come from irritation.'
  ]
from projects
where projects.name = 'Spring Creator Momentum'
on conflict (slug) do update set
  title = excluded.title,
  brand = excluded.brand,
  status = excluded.status,
  readiness = excluded.readiness,
  summary = excluded.summary,
  objective = excluded.objective,
  audience = excluded.audience,
  creator_type = excluded.creator_type,
  key_message = excluded.key_message,
  tone_vibe = excluded.tone_vibe,
  visual_direction = excluded.visual_direction,
  deliverables = excluded.deliverables,
  usage_rights = excluded.usage_rights,
  final_sections = excluded.final_sections,
  ai_recommendations = excluded.ai_recommendations,
  interpretation_insights = excluded.interpretation_insights,
  hooks = excluded.hooks,
  updated_at = timezone('utc', now());
