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
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  MessageSquare,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSystemConfig } from '@/hooks/use-system-config'
import { cn } from '@/lib/utils'

import { HeroButtons } from '../hero-buttons'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const systemConfig = useSystemConfig()

  return (
    <section
      aria-labelledby='campus-hero-title'
      className={cn(
        'relative isolate overflow-hidden bg-background px-5 pt-12 pb-14 sm:px-8 md:pt-20 md:pb-20',
        props.className
      )}
    >
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_10%,var(--secondary),transparent_65%)]'
      />
      <div className='mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16'>
        <div className='min-w-0'>
          <Badge
            variant='secondary'
            className='mb-7 h-auto max-w-full gap-2 px-3 py-2 whitespace-normal'
          >
            <GraduationCap aria-hidden='true' />
            {t('Dalian University of Technology · Student AI Services')}
          </Badge>
          <p className='text-primary mb-4 text-sm font-semibold tracking-wide'>
            {systemConfig.systemName}
          </p>
          <h1
            id='campus-hero-title'
            className='text-foreground text-[clamp(2.3rem,4.5vw,3.6rem)] leading-[1.22] font-semibold tracking-tight text-balance'
          >
            {t('For every question.')}
            <br />
            <span className='text-primary'>{t('For every step forward.')}</span>
          </h1>
          <p className='text-muted-foreground mt-6 max-w-xl text-base leading-8 text-pretty'>
            {t(
              'An AI workspace for DUT students. Explore ideas, understand your coursework, and advance programming and research with accessible AI tools.'
            )}
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            <HeroButtons isAuthenticated={!!props.isAuthenticated} />
          </div>
          <p className='text-muted-foreground mt-5 text-xs leading-6'>
            {t(
              'Available models and usage limits depend on your account and platform settings.'
            )}
          </p>
          <div className='text-muted-foreground mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm'>
            <span className='inline-flex items-center gap-2'>
              <BookOpen aria-hidden='true' className='text-primary size-4' />
              {t('Course learning')}
            </span>
            <span className='inline-flex items-center gap-2'>
              <Code2 aria-hidden='true' className='text-primary size-4' />
              {t('Programming practice')}
            </span>
            <span className='inline-flex items-center gap-2'>
              <GraduationCap
                aria-hidden='true'
                className='text-primary size-4'
              />
              {t('Research exploration')}
            </span>
          </div>
        </div>

        <div className='relative min-w-0 lg:py-6'>
          <div
            aria-hidden='true'
            className='bg-secondary absolute inset-3 -z-10 rotate-3 rounded-3xl'
          />
          <Card className='shadow-primary/5 gap-0 rounded-2xl py-0 shadow-xl'>
            <CardHeader className='bg-primary text-primary-foreground relative overflow-hidden px-7 py-8 sm:px-8'>
              <img
                src={systemConfig.logo}
                alt=''
                aria-hidden='true'
                className='pointer-events-none absolute -right-6 -bottom-10 size-56 opacity-10'
              />
              <div className='relative flex items-center gap-4'>
                <div className='flex size-16 shrink-0 items-center justify-center rounded-full bg-white p-1.5'>
                  <img
                    src={systemConfig.logo}
                    alt={t('Dalian University of Technology emblem')}
                    className='size-full object-contain'
                  />
                </div>
                <div className='min-w-0'>
                  <p className='text-sm'>
                    {t('Dalian University of Technology')}
                  </p>
                  <h2 className='mt-1 text-xl font-semibold'>
                    {t('Student service desk')}
                  </h2>
                </div>
              </div>
              <p className='text-primary-foreground/85 relative mt-7 text-sm leading-6'>
                {t('Learning begins with a good question.')}
              </p>
            </CardHeader>
            <CardContent className='flex flex-col gap-5 px-7 py-7 sm:px-8'>
              <div className='flex items-start gap-3'>
                <div className='bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-lg'>
                  <MessageSquare aria-hidden='true' className='size-5' />
                </div>
                <div>
                  <h3 className='font-semibold'>
                    {t('Start with a conversation')}
                  </h3>
                  <p className='text-muted-foreground mt-1 text-sm leading-6'>
                    {t(
                      'Describe your question, add context, and explore the answer step by step.'
                    )}
                  </p>
                </div>
              </div>
              <Button
                variant='secondary'
                className='h-11 w-full justify-between px-4'
                render={<Link to='/playground' />}
              >
                {t('Open conversation workspace')}
                <ArrowRight aria-hidden='true' className='size-4' />
              </Button>
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <Button
                  variant='link'
                  className='h-auto px-0 text-xs'
                  render={<Link to='/pricing' />}
                >
                  {t('View models and rates')}
                  <ArrowRight aria-hidden='true' className='size-3' />
                </Button>
                <Button
                  variant='link'
                  className='h-auto px-0 text-xs'
                  render={<a href='#student-guide' />}
                >
                  {t('Read the getting-started guide')}
                  <ArrowRight aria-hidden='true' className='size-3' />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
