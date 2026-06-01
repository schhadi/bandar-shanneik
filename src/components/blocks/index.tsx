import type { Locale } from '@/lib/i18n'
import { HeroBlock } from './HeroBlock'
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
          default:
            return null
        }
      })}
    </>
  )
}
