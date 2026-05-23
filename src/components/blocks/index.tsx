import type { Locale } from '@/lib/i18n'
import { HeroBlock } from './HeroBlock'
import { RichTextBlock } from './RichTextBlock'
import { BackgroundBlock } from './BackgroundBlock'
import { EducationJurisdictionsBlock } from './EducationJurisdictionsBlock'
import { ServiceCardsBlock } from './ServiceCardsBlock'
import { PracticeAreasBlock } from './PracticeAreasBlock'
import { CTABannerBlock } from './CTABannerBlock'
import { ResearchTimelineSection, ResearchTimelineBlock } from './ResearchTimelineBlock'
import { ResearchProfileCardBlock } from './ResearchProfileCardBlock'
import { TagBoxesBlock } from './TagBoxesBlock'
import { ContactBlock } from './ContactBlock'
import { ContactFormBlock } from './ContactFormBlock'

type Block = { blockType: string; [k: string]: any }

function isResearchSidebar(block: Block) {
  return block.blockType === 'researchProfileCard' || block.blockType === 'tagBoxes'
}

export function BlockRenderer({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  const out: React.ReactNode[] = []
  let i = 0
  while (i < blocks.length) {
    const b = blocks[i]
    // Pair a researchTimeline with adjacent profile card / tag boxes into a two-column layout
    if (b.blockType === 'researchTimeline') {
      const sidebars: Block[] = []
      let j = i + 1
      while (j < blocks.length && isResearchSidebar(blocks[j])) {
        sidebars.push(blocks[j])
        j++
      }
      if (sidebars.length > 0) {
        out.push(
          <section key={i} className="container-page border-t border-line py-28">
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
              <ResearchTimelineBlock block={b} />
              <div className="space-y-6 lg:pt-12">
                {sidebars.map((s, k) =>
                  s.blockType === 'researchProfileCard' ? (
                    <ResearchProfileCardBlock key={k} block={s} />
                  ) : (
                    <TagBoxesBlock key={k} block={s} />
                  ),
                )}
              </div>
            </div>
          </section>,
        )
        i = j
        continue
      }
    }
    switch (b.blockType) {
      case 'hero':
        out.push(<HeroBlock key={i} block={b} locale={locale} />)
        break
      case 'richText':
        out.push(<RichTextBlock key={i} block={b} />)
        break
      case 'background':
        out.push(<BackgroundBlock key={i} block={b} locale={locale} />)
        break
      case 'educationJurisdictions':
        out.push(<EducationJurisdictionsBlock key={i} block={b} />)
        break
      case 'serviceCards':
        out.push(<ServiceCardsBlock key={i} block={b} />)
        break
      case 'practiceAreas':
        out.push(<PracticeAreasBlock key={i} block={b} />)
        break
      case 'ctaBanner':
        out.push(<CTABannerBlock key={i} block={b} locale={locale} />)
        break
      case 'researchTimeline':
        out.push(<ResearchTimelineSection key={i} block={b} />)
        break
      case 'researchProfileCard':
        out.push(<ResearchProfileCardBlock key={i} block={b} />)
        break
      case 'tagBoxes':
        out.push(<TagBoxesBlock key={i} block={b} />)
        break
      case 'contact':
        out.push(<ContactBlock key={i} block={b} />)
        break
      case 'contactForm':
        out.push(<ContactFormBlock key={i} block={b} />)
        break
    }
    i++
  }
  return <>{out}</>
}
