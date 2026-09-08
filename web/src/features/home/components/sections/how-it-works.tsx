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
import { useTranslation } from 'react-i18next'

export function HowItWorks() {
  const { t } = useTranslation()
  const steps = [
    {
      num: '01',
      title: t('Access your account'),
      description: t(
        'Sign in to the student console and check your available services, account balance, and usage limits.'
      ),
    },
    {
      num: '02',
      title: t('Choose how to work'),
      description: t(
        'Start in the conversation workspace, or configure an API key in your preferred application.'
      ),
    },
    {
      num: '03',
      title: t('Review and reflect'),
      description: t(
        'Verify the output, keep your own judgment, and review usage records to manage your resources.'
      ),
    },
  ]

  return (
    <section
      id='student-guide'
      aria-labelledby='student-guide-title'
      className='bg-secondary/40 scroll-mt-24 px-5 py-16 sm:px-8 md:py-20'
    >
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-14'>
        <div>
          <p className='text-primary mb-3 text-xs font-semibold tracking-[0.16em] uppercase'>
            {t('Getting started')}
          </p>
          <h2
            id='student-guide-title'
            className='text-2xl leading-snug font-semibold tracking-tight md:text-3xl'
          >
            {t('Three steps to begin')}
          </h2>
          <p className='text-muted-foreground mt-4 text-sm leading-7'>
            {t(
              'A clear path from your first sign-in to thoughtful everyday use.'
            )}
          </p>
        </div>
        <ol className='grid gap-8 sm:grid-cols-3'>
          {steps.map((step) => (
            <li key={step.num}>
              <span
                aria-hidden='true'
                className='text-primary/35 block text-4xl leading-none font-light tracking-tight'
              >
                {step.num}
              </span>
              <h3 className='mt-5 text-base font-semibold'>{step.title}</h3>
              <p className='text-muted-foreground mt-3 text-sm leading-7'>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
