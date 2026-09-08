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
import { ArrowUpRight, BookOpen, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSystemConfig } from '@/hooks/use-system-config'

export function CampusAboutContent() {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const currentYear = new Date().getFullYear()

  return (
    <div className='mx-auto max-w-6xl space-y-10 px-6 pt-28 pb-16 md:pt-36 md:pb-24'>
      <header className='max-w-3xl'>
        <p className='text-primary mb-4 text-sm font-semibold tracking-wider'>
          {t('DUT Student AI Services')}
        </p>
        <h1 className='text-foreground text-3xl leading-tight font-semibold tracking-tight md:text-5xl'>
          {t('A shared starting point for learning and research')}
        </h1>
        <p className='text-primary mt-5 text-lg font-medium'>{systemName}</p>
        <p className='text-muted-foreground mt-4 text-base leading-8'>
          {t(
            'Built for DUT students, this platform brings AI models, a learning workspace and API access together for coursework, coding practice and research exploration.'
          )}
        </p>
        <p className='text-muted-foreground mt-3 text-sm leading-7'>
          {t(
            'Available models, account access and usage limits are determined by platform settings. Please refer to your account information and platform announcements.'
          )}
        </p>
      </header>

      <div className='grid items-start gap-6 lg:grid-cols-2'>
        <Card id='student-guide' className='scroll-mt-24 rounded-2xl py-6'>
          <CardHeader className='gap-3 px-6'>
            <BookOpen aria-hidden='true' className='text-primary size-6' />
            <h2 className='text-xl font-semibold'>
              {t('Student getting-started guide')}
            </h2>
          </CardHeader>
          <CardContent className='space-y-6 px-6'>
            <ol className='space-y-6'>
              <li className='flex gap-4'>
                <span
                  aria-hidden='true'
                  className='text-primary text-sm leading-6 font-semibold'
                >
                  01
                </span>
                <div>
                  <h3 className='font-medium'>
                    {t('Explore available models')}
                  </h3>
                  <p className='text-muted-foreground mt-1 leading-7'>
                    {t(
                      'Review model capabilities and usage information, then choose a model that fits your learning task.'
                    )}
                  </p>
                  <Link
                    to='/pricing'
                    className='text-primary mt-2 inline-flex items-center gap-1 hover:underline'
                  >
                    {t('Browse model resources')}
                    <ArrowUpRight aria-hidden='true' className='size-4' />
                  </Link>
                </div>
              </li>
              <li className='flex gap-4'>
                <span
                  aria-hidden='true'
                  className='text-primary text-sm leading-6 font-semibold'
                >
                  02
                </span>
                <div>
                  <h3 className='font-medium'>
                    {t('Start in your learning workspace')}
                  </h3>
                  <p className='text-muted-foreground mt-1 leading-7'>
                    {t(
                      'Sign in to access the workspace. Use the playground for exploration, or manage API access for your own projects.'
                    )}
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span
                  aria-hidden='true'
                  className='text-primary text-sm leading-6 font-semibold'
                >
                  03
                </span>
                <div>
                  <h3 className='font-medium'>
                    {t('Review results and resource usage')}
                  </h3>
                  <p className='text-muted-foreground mt-1 leading-7'>
                    {t(
                      'Check generated results against reliable sources and review your usage records regularly. For service questions, refer to platform announcements or contact your platform administrator.'
                    )}
                  </p>
                </div>
              </li>
            </ol>
            <Button size='lg' render={<Link to='/dashboard' />}>
              {t('Open learning workspace')}
              <ArrowUpRight aria-hidden='true' />
            </Button>
          </CardContent>
        </Card>

        <Card
          id='responsible-use'
          className='bg-primary/3 scroll-mt-24 rounded-2xl py-6'
        >
          <CardHeader className='gap-3 px-6'>
            <ShieldCheck aria-hidden='true' className='text-primary size-6' />
            <h2 className='text-xl font-semibold'>
              {t('Responsible use guidelines')}
            </h2>
          </CardHeader>
          <CardContent className='space-y-5 px-6'>
            <div>
              <h3 className='font-medium'>{t('Uphold academic integrity')}</h3>
              <p className='text-muted-foreground mt-1 leading-7'>
                {t(
                  'Follow course and research requirements when using AI. Verify generated facts, references and code, and disclose AI assistance when required.'
                )}
              </p>
            </div>
            <div>
              <h3 className='font-medium'>
                {t('Protect personal and research data')}
              </h3>
              <p className='text-muted-foreground mt-1 leading-7'>
                {t(
                  'Do not submit passwords, personal identifiers, confidential research data or unpublished materials without authorization. Remove sensitive information before submitting a request.'
                )}
              </p>
            </div>
            <div>
              <h3 className='font-medium'>
                {t('Use shared resources thoughtfully')}
              </h3>
              <p className='text-muted-foreground mt-1 leading-7'>
                {t(
                  'Keep your account and API keys secure. Choose appropriate models and request sizes, and follow the platform usage rules.'
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section
        aria-labelledby='open-source-title'
        className='border-border border-t pt-8'
      >
        <h2 id='open-source-title' className='mb-4 text-lg font-semibold'>
          {t('Open-source acknowledgements')}
        </h2>
        <p className='text-muted-foreground mb-4 text-sm leading-7'>
          {t(
            'This student-focused adaptation is built on New API. We acknowledge the upstream maintainers and contributors, and retain the original open-source license and attribution.'
          )}
        </p>
        <div className='text-muted-foreground space-y-3 text-sm leading-6'>
          <p>
            {t('New API Project Repository:')}{' '}
            <a
              href='https://github.com/QuantumNous/new-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary break-all hover:underline'
            >
              {t('https://github.com/QuantumNous/new-api')}
            </a>
          </p>
          <p className='text-muted-foreground'>
            <a
              href='https://github.com/QuantumNous/new-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('NewAPI')}
            </a>{' '}
            © {currentYear}{' '}
            <a
              href='https://github.com/QuantumNous'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('QuantumNous')}
            </a>{' '}
            {t('| Based on')}{' '}
            <a
              href='https://github.com/songquanpeng/one-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('One API')}
            </a>{' '}
            © 2023{' '}
            <a
              href='https://github.com/songquanpeng'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('JustSong')}
            </a>
          </p>
          <p className='text-muted-foreground'>
            {t('This project must be used in compliance with the')}{' '}
            <a
              href='https://github.com/QuantumNous/new-api/blob/main/LICENSE'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('AGPL v3.0 License')}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
