import type { Locale } from '@/lib/i18n'
import { HeroBlock } from './HeroBlock'
import { RichTextBlock } from './RichTextBlock'
import { AboutTwoColumnBlock } from './AboutTwoColumnBlock'
import { AboutIntroBlock } from './AboutIntroBlock'
import { BackgroundBlock } from './BackgroundBlock'
import { EducationJurisdictionsBlock } from './EducationJurisdictionsBlock'
import { ServiceCardsBlock } from './ServiceCardsBlock'
import { PracticeAreasBlock } from './PracticeAreasBlock'
import { ExpertiseBlock } from './ExpertiseBlock'
import { SpeakingBlock } from './SpeakingBlock'
import { CTABannerBlock } from './CTABannerBlock'
import { ResearchTimelineSection } from './ResearchTimelineBlock'
import { ResearchIntroBlock } from './ResearchIntroBlock'
import { ResearchProfileCardBlock } from './ResearchProfileCardBlock'
import { TagBoxesBlock } from './TagBoxesBlock'
import { ContactBlock } from './ContactBlock'
import { ContactFormBlock } from './ContactFormBlock'

type Block = { blockType: string; [k: string]: any }

export function BlockRenderer({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.blockType) {
          case 'hero':
            return <HeroBlock key={i} block={b} locale={locale} />
          case 'richText':
            return <RichTextBlock key={i} block={b} />
          case 'aboutIntro':
            return <AboutIntroBlock key={i} block={b} locale={locale} />
          case 'aboutTwoColumn':
            return <AboutTwoColumnBlock key={i} block={b} locale={locale} />
          case 'background':
            return <BackgroundBlock key={i} block={b} locale={locale} />
          case 'educationJurisdictions':
            return <EducationJurisdictionsBlock key={i} block={b} />
          case 'serviceCards':
            return <ServiceCardsBlock key={i} block={b} />
          case 'practiceAreas':
            return <PracticeAreasBlock key={i} block={b} />
          case 'expertise':
            return <ExpertiseBlock key={i} block={b} locale={locale} />
          case 'speaking':
            return <SpeakingBlock key={i} block={b} />
          case 'ctaBanner':
            return <CTABannerBlock key={i} block={b} locale={locale} />
          case 'researchTimeline':
            return <ResearchTimelineSection key={i} block={b} />
          case 'researchIntro':
            return <ResearchIntroBlock key={i} block={b} locale={locale} />
          case 'researchProfileCard':
            return (
              <section key={i} className="container-page py-16 md:py-24">
                <ResearchProfileCardBlock block={b} />
              </section>
            )
          case 'tagBoxes':
            return (
              <section key={i} className="container-page py-16 md:py-24">
                <TagBoxesBlock block={b} />
              </section>
            )
          case 'contact':
            return <ContactBlock key={i} block={b} />
          case 'contactForm':
            return <ContactFormBlock key={i} block={b} locale={locale} />
          default:
            return null
        }
      })}
    </>
  )
}
