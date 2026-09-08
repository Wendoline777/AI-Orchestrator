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
import { BookOpen, ChartNoAxesCombined, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Stats() {
  const { t } = useTranslation()
  const principles = [
    {
      icon: BookOpen,
      title: t('Purposeful learning'),
      description: t(
        'Use AI to support understanding and independent thinking.'
      ),
    },
    {
      icon: ChartNoAxesCombined,
      title: t('Understand your usage'),
      description: t('Review model rates and account usage before you begin.'),
    },
    {
      icon: ShieldCheck,
      title: t('Responsible use'),
      description: t(
        'Respect academic integrity and protect sensitive information.'
      ),
    },
  ]

  return (
    <section
      aria-label={t('Student service principles')}
      className='border-border bg-secondary/50 border-y px-5 py-7 sm:px-8'
    >
      <div className='mx-auto grid max-w-6xl gap-7 md:grid-cols-3 md:gap-10'>
        {principles.map((principle) => (
          <div key={principle.title} className='flex items-start gap-3'>
            <principle.icon
              aria-hidden='true'
              className='text-primary mt-0.5 size-5 shrink-0'
            />
            <div>
              <h2 className='text-foreground text-sm font-semibold'>
                {principle.title}
              </h2>
              <p className='text-muted-foreground mt-1 text-xs leading-6'>
                {principle.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
