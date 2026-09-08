/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { BookCheck, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { HeroButtons } from '../hero-buttons'

interface CTAProps {
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby='responsible-use-title'
      className='bg-background px-5 py-16 sm:px-8 md:py-20'
    >
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8'>
          <p className='text-primary mb-3 text-xs font-semibold tracking-[0.16em] uppercase'>
            {t('Before you begin')}
          </p>
          <h2
            id='responsible-use-title'
            className='text-2xl leading-snug font-semibold tracking-tight md:text-3xl'
          >
            {t('Use AI thoughtfully. Learn with integrity.')}
          </h2>
        </div>
        <div className='grid gap-5 md:grid-cols-2'>
          <Alert role='note' className='gap-x-4 gap-y-2 rounded-xl p-6'>
            <BookCheck aria-hidden='true' className='text-primary! size-5' />
            <AlertTitle>{t('Academic integrity')}</AlertTitle>
            <AlertDescription className='leading-7'>
              {t(
                'Follow your course and research requirements for AI use. Independently verify facts, calculations, and references, and disclose AI assistance when required.'
              )}
            </AlertDescription>
          </Alert>
          <Alert role='note' className='gap-x-4 gap-y-2 rounded-xl p-6'>
            <ShieldCheck aria-hidden='true' className='text-primary! size-5' />
            <AlertTitle>{t('Privacy and information protection')}</AlertTitle>
            <AlertDescription className='leading-7'>
              {t(
                'Do not submit passwords, personal identifiers, confidential research, or other sensitive information. Review the applicable service terms before using a model.'
              )}
            </AlertDescription>
          </Alert>
        </div>
        <div className='mt-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center'>
          <p className='text-muted-foreground max-w-lg text-sm leading-7'>
            {t(
              'AI-generated content can be inaccurate. You remain responsible for evaluating and using the results.'
            )}
          </p>
          <div className='flex flex-wrap gap-3'>
            <HeroButtons isAuthenticated={!!props.isAuthenticated} />
          </div>
        </div>
      </div>
    </section>
  )
}
