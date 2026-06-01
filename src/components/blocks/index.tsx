import type { Locale } from '@/lib/i18n'
import { HeroBlock } from './HeroBlock'
import { RichTextBlock } from './RichTextBlock'
import { BackgroundBlock } from './BackgroundBlock'
import { EducationJurisdictionsBlock } from './EducationJurisdictionsBlock'
import { ServiceCardsBlock } from './ServiceCardsBlock'
import { PracticeAreasBlock } from './PracticeAreasBlock'
import { CTABannerBlock } from './CTABannerBlock'
import { ResearchTimelineSection } from './ResearchTimelineBlock'
import { ResearchProfileCardBlock } from './ResearchProfileCardBlock'
import { TagBoxesBlock } from './TagBoxesBlock'
import { ContactBlock } from './ContactBlock'
import { ContactFormBlock } from './ContactFormBlock'
import { ProfileColumnsBlock } from './ProfileColumnsBlock'
import { ExpertiseBlock } from './ExpertiseBlock'
import { ResearchBlock } from './ResearchBlock'

type Block = { blockType: string; [k: string]: any }

export function BlockRenderer({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.blockType) {
          case 'hero':
            return <HeroBlock key={i} block={b} locale={locale} />
          case 'profileColumns':
            return <ProfileColumnsBlock key={i} block={b} />
          case 'expertise':
            return <ExpertiseBlock key={i} block={b} />
          case 'research':
            return <ResearchBlock key={i} block={b} />
          case 'contactForm':
            return <ContactFormBlock key={i} block={b} />
          // Legacy CMS block types — kept for backwards compatibility.
          case 'richText':
            return <RichTextBlock key={i} block={b} />
          case 'background':
            return <BackgroundBlock key={i} block={b} locale={locale} />
          case 'educationJurisdictions':
            return <EducationJurisdictionsBlock key={i} block={b} />
          case 'serviceCards':
            return <ServiceCardsBlock key={i} block={b} />
          case 'practiceAreas':
            return <PracticeAreasBlock key={i} block={b} />
          case 'ctaBanner':
            return <CTABannerBlock key={i} block={b} locale={locale} />
          case 'researchTimeline':
            return <ResearchTimelineSection key={i} block={b} />
          case 'researchProfileCard':
            return <ResearchProfileCardBlock key={i} block={b} />
          case 'tagBoxes':
            return <TagBoxesBlock key={i} block={b} />
          case 'contact':
            return <ContactBlock key={i} block={b} />
          default:
            return null
        }
      })}
    </>
  )
}
