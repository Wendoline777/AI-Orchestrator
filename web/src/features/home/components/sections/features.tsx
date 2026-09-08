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
import { BookOpen, Code2, FlaskConical, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function Features() {
  const { t } = useTranslation()
  const scenarios = [
    {
      icon: BookOpen,
      title: t('Course learning'),
      description: t(
        'Break down difficult concepts, organize course notes, and build a clear revision plan.'
      ),
      example: t(
        'Explain the intuition behind this theorem, then help me test my understanding.'
      ),
    },
    {
      icon: Code2,
      title: t('Programming practice'),
      description: t(
        'Discuss algorithms, understand error messages, and review your implementation.'
      ),
      example: t(
        'Help me locate this error and explain how to approach the debugging process.'
      ),
    },
    {
      icon: FlaskConical,
      title: t('Research exploration'),
      description: t(
        'Clarify research questions, compare approaches, and organize ideas for further investigation.'
      ),
      example: t(
        'Help me structure this research question and identify what evidence I need.'
      ),
    },
    {
      icon: Languages,
      title: t('Writing and expression'),
      description: t(
        'Improve the clarity of your writing and practice communicating across languages.'
      ),
      example: t(
        'Review the structure of this paragraph and explain how I can make it clearer.'
      ),
    },
  ]

  return (
    <section
      aria-labelledby='learning-scenarios-title'
      className='bg-background px-5 py-16 sm:px-8 md:py-20'
    >
      <div className='mx-auto max-w-6xl'>
        <div className='mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end'>
          <div>
            <p className='text-primary mb-3 text-xs font-semibold tracking-[0.16em] uppercase'>
              {t('Learning with AI')}
            </p>
            <h2
              id='learning-scenarios-title'
              className='text-2xl leading-snug font-semibold tracking-tight md:text-3xl'
            >
              {t('From the classroom to your next idea')}
            </h2>
          </div>
          <p className='text-muted-foreground max-w-sm text-sm leading-7'>
            {t(
              'Choose a starting point for your study. Your questions lead the way.'
            )}
          </p>
        </div>
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {scenarios.map((scenario) => (
            <Card key={scenario.title} className='h-full gap-6 rounded-xl py-6'>
              <CardHeader className='gap-4 px-5'>
                <div className='bg-secondary text-primary flex size-11 items-center justify-center rounded-xl'>
                  <scenario.icon aria-hidden='true' className='size-5' />
                </div>
                <h3 className='text-base font-semibold'>{scenario.title}</h3>
                <p className='text-muted-foreground text-sm leading-7'>
                  {scenario.description}
                </p>
              </CardHeader>
              <CardContent className='mt-auto px-5'>
                <div className='bg-muted/65 rounded-lg p-3.5'>
                  <p className='text-primary mb-2 text-[11px] font-semibold'>
                    {t('A question to try')}
                  </p>
                  <p className='text-muted-foreground text-xs leading-6'>
                    {scenario.example}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
