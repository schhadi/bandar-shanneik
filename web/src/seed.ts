import { getPayload as _getPayload } from 'payload'
import config from './payload.config'

const lexical = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
      },
    ],
  },
})

async function seed() {
  const payload = await _getPayload({ config })

  console.log('Seeding…')

  // Admin user
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'changeme123!',
        name: 'Admin',
      },
    })
    console.log('  ✓ Admin user created (admin@example.com / changeme123!)')
  }

  // Home
  const homeBlocks = [
    {
      blockType: 'hero',
      title: 'Bandar Shanneik',
      body:
        'Bandar Shanneik provides cross-border legal consultancy for companies, investors and private clients across real estate, corporate, commercial and governance matters. With a legal background spanning Germany, the Middle East, and Europe, he offers precise, practical and commercially aware advice in German, Arabic and English.',
      imageStyle: 'rounded',
      ctas: [
        {
          link: { label: 'Legal', type: 'internal', variant: 'primary', icon: 'scale' },
        },
        {
          link: { label: 'Research', type: 'internal', variant: 'outline', icon: 'book' },
        },
      ],
    },
  ]

  // Helper: upsert a page by slug
  async function upsertPage(slug: string, title: string, blocks: any[]) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: { title, blocks } as any,
      })
      console.log(`  ✓ Updated page: ${slug}`)
    } else {
      await payload.create({
        collection: 'pages',
        data: { slug, title, blocks } as any,
      })
      console.log(`  ✓ Created page: ${slug}`)
    }
  }

  await upsertPage('home', 'Home', homeBlocks)

  await upsertPage('about', 'About', [
    {
      blockType: 'background',
      heading: 'Background',
      body: lexical(
        'Bandar Shanneik is a Senior Legal Consultant and fully qualified German lawyer whose work sits at the intersection of European legal training and Middle Eastern commercial practice. He advises companies, investors and private clients on corporate and commercial matters, contracts, mergers and acquisitions, arbitration, real estate, tax and employment law. Fluent in German, Arabic and English, he supports clients navigating cross-border legal questions with clarity, discretion and a practical understanding of both legal detail and commercial context.',
      ),
      cta: [{ link: { label: 'Download CV', type: 'external', url: '#', variant: 'outline', icon: 'download' } }],
    },
    {
      blockType: 'educationJurisdictions',
      heading: 'Education & Jurisdictions',
      education: [
        {
          institution: 'Vrije Universiteit Amsterdam (Netherlands)',
          detail:
            "Master of Laws (LL.M.) in 'International Business Law: Commercial Transactions' (cum laude; Valedictorian)",
        },
        {
          institution: 'Julius-Maximilians-Universität, Würzburg (Germany)',
          detail:
            'Diploma in law, specialising in European and International Economic Transactions and Legal Relations',
        },
        {
          institution: 'San Diego State University, San Diego (USA)',
        },
      ],
      jurisdictions: [
        { name: 'Germany', icon: 'bank' },
        { name: 'England and Wales', icon: 'wig' },
        { name: 'United Arab Emirates', icon: 'skyline' },
      ],
      languages: [{ name: 'German' }, { name: 'Arabic' }, { name: 'English' }],
    },
  ])

  await upsertPage('legal', 'Legal', [
    {
      blockType: 'serviceCards',
      heading: 'Legal Services',
      intro:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
      cards: [
        { title: 'Heading 2', body: "I'm a paragraph. Click here to add your own text and edit me. It's easy." },
        { title: 'Heading 2', body: "I'm a paragraph. Click here to add your own text and edit me. It's easy." },
        { title: 'Heading 2', body: "I'm a paragraph. Click here to add your own text and edit me. It's easy." },
      ],
    },
    {
      blockType: 'practiceAreas',
      heading: 'Practice Areas',
      items: [
        { label: 'dasdad asda' },
        { label: 'dasdad asda' },
        { label: 'dasdad asda' },
        { label: 'dasdad asda' },
        { label: 'dasdad asda' },
        { label: 'dasdad asda' },
        { label: 'adda' },
      ],
    },
    {
      blockType: 'ctaBanner',
      heading: 'Need Legal Advice?',
      subtext: 'Contact Bandar to discuss legal matters',
      background: 'forest',
      cta: [
        { link: { label: 'Contact Bandar', type: 'internal', variant: 'outline' } },
      ],
    },
  ])

  // Publications
  const pubData = [
    {
      year: '2027',
      kind: 'peer-reviewed',
      title: 'Who Counts as a Family in Europe: Polygamous Refugees and the Boundaries of Recognition',
      venue: 'Journal of Law and Society',
      status: 'in prep.',
    },
    {
      year: '2026',
      kind: 'book-chapter',
      title: 'Forced Divorce: Syrian Refugees and the Act to Combat Child Marriage in Germany',
      venue: 'Politics of Marriage and Gender: Global Issues in Local Contexts (Rutgers University Press)',
      status: 'in print',
    },
    {
      year: '2022',
      kind: 'legal-article',
      title: 'Der Immobilienerwerb in den Vereinigten',
      venue: 'immo aktuell 4(6), 316-320',
    },
  ]
  for (const p of pubData) {
    const existing = await payload.find({
      collection: 'publications',
      where: { title: { equals: p.title } },
      limit: 1,
    })
    if (!existing.docs[0]) {
      await payload.create({ collection: 'publications', data: p as any })
    }
  }

  await upsertPage('research', 'Research', [
    {
      blockType: 'richText',
      heading: 'Research & Publications',
      content: lexical(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      ),
      alignment: 'center',
    },
    {
      blockType: 'researchTimeline',
      heading: 'Selected Publications',
      mode: 'collection',
      publications: (
        await payload.find({ collection: 'publications', limit: 50, sort: '-year' })
      ).docs.map((d) => d.id),
    },
    {
      blockType: 'researchProfileCard',
      heading: 'Research Profile',
      role: 'Research Fellow',
      body:
        'My research examines how legal frameworks shape and are shaped by migration, marriage, gender and family recognition. I focus on cross-border legal challenges and the protection of rights in contexts of displacement, diversity and social change.',
    },
    {
      blockType: 'tagBoxes',
      heading: 'Areas of Interest',
      items: [
        { label: 'Comparative Law' },
        { label: 'Migration Law' },
        { label: 'Gender & Equality' },
        { label: 'Refugee Law' },
        { label: 'Human Rights' },
        { label: 'Comparative Law' },
      ],
    },
  ])

  await upsertPage('contact', 'Contact', [
    {
      blockType: 'contact',
      heading: 'Get in touch',
      intro:
        'For inquiries about legal consultancy or research collaboration, please reach out directly.',
      email: 'contact.shanneik@gmail.com',
    },
  ])

  // Globals
  await payload.updateGlobal({
    slug: 'header',
    data: {
      logoText: 'Bandar Shanneik',
      showLanguageSwitcher: true,
      nav: [
        { link: { label: 'About', type: 'internal', variant: 'plain' } },
        { link: { label: 'Legal', type: 'internal', variant: 'plain' } },
        { link: { label: 'Research', type: 'internal', variant: 'plain' } },
        { link: { label: 'Contact', type: 'internal', variant: 'plain' } },
      ],
    } as any,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      brandName: 'Bandar Shanneik',
      tagline: 'Cross-border legal consultancy across the Middle East and Europe',
      columns: [
        {
          heading: 'Contact',
          links: [
            { link: { label: 'contact.shanneik@gmail.com', type: 'external', url: 'mailto:contact.shanneik@gmail.com', variant: 'plain' } },
          ],
        },
        {
          heading: 'Connect',
          links: [
            { link: { label: 'LinkedIn', type: 'external', url: 'https://linkedin.com/', newTab: true, variant: 'plain', icon: 'none' } },
          ],
        },
        {
          heading: 'Explore',
          links: [
            { link: { label: 'About', type: 'internal', variant: 'plain' } },
            { link: { label: 'Legal', type: 'internal', variant: 'plain' } },
            { link: { label: 'Research', type: 'internal', variant: 'plain' } },
            { link: { label: 'Contact', type: 'internal', variant: 'plain' } },
          ],
        },
      ],
      bottomLinks: [
        { link: { label: 'Legal Notice', type: 'internal', variant: 'plain' } },
        { link: { label: 'Privacy Policy', type: 'internal', variant: 'plain' } },
        { link: { label: 'Terms of Use', type: 'internal', variant: 'plain' } },
      ],
      copyright: '© 2026 Bandar Shanneik. All rights reserved.',
    } as any,
  })

  console.log('Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
