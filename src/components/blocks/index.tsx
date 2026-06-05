import type { ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import { Reveal } from '../Reveal'
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
        // The hero owns its own on-load entrance; everything else eases in on
        // scroll. The leading content block reveals with no stagger so it
        // doesn't feel sluggish above the fold.
        switch (b.blockType) {
          case 'hero':
            return <HeroBlock key={i} block={b} locale={locale} />
          case 'richText':
            return wrap(i, <RichTextBlock block={b} />)
          case 'aboutIntro':
            return wrap(i, <AboutIntroBlock block={b} locale={locale} />)
          case 'aboutTwoColumn':
            return wrap(i, <AboutTwoColumnBlock block={b} locale={locale} />)
          case 'background':
            return wrap(i, <BackgroundBlock block={b} locale={locale} />)
          case 'educationJurisdictions':
            return wrap(i, <EducationJurisdictionsBlock block={b} />)
          case 'serviceCards':
            return wrap(i, <ServiceCardsBlock block={b} />)
          case 'practiceAreas':
            return wrap(i, <PracticeAreasBlock block={b} />)
          case 'expertise':
            return wrap(i, <ExpertiseBlock block={b} locale={locale} />)
          case 'speaking':
            return wrap(i, <SpeakingBlock block={b} />)
          case 'ctaBanner':
            return wrap(i, <CTABannerBlock block={b} locale={locale} />)
          case 'researchTimeline':
            return wrap(i, <ResearchTimelineSection block={b} />)
          case 'researchIntro':
            return wrap(i, <ResearchIntroBlock block={b} locale={locale} />)
          case 'researchProfileCard':
            return wrap(
              i,
              <section className="container-page py-16 md:py-24">
                <ResearchProfileCardBlock block={b} />
              </section>,
            )
          case 'tagBoxes':
            return wrap(
              i,
              <section className="container-page py-16 md:py-24">
                <TagBoxesBlock block={b} />
              </section>,
            )
          case 'contact':
            return wrap(i, <ContactBlock block={b} />)
          case 'contactForm':
            return wrap(i, <ContactFormBlock block={b} locale={locale} />)
          default:
            return null
        }
      })}
    </>
  )
}

function wrap(i: number, node: ReactNode) {
  return (
    <Reveal key={i} delay={i === 0 ? 0 : 60}>
      {node}
    </Reveal>
  )
}
