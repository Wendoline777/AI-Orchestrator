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
import { useTranslation } from 'react-i18next'

import { Skeleton } from '@/components/ui/skeleton'
import { useSystemConfig } from '@/hooks/use-system-config'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='bg-muted/50 border-primary relative grid min-h-svh max-w-none border-t-4'>
      <Link
        to='/'
        className='absolute top-4 left-4 z-10 flex items-center gap-2 transition-opacity hover:opacity-80 sm:top-8 sm:left-8'
      >
        <div className='relative size-9 shrink-0 rounded-full bg-white p-0.5'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-full' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='size-full object-contain'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-6 w-24' />
        ) : (
          <div>
            <h1 className='text-primary text-lg font-semibold'>{systemName}</h1>
            <p className='text-muted-foreground text-xs'>
              {t('DUT Student AI Services')}
            </p>
          </div>
        )}
      </Link>
      <div className='container flex items-center pt-16 sm:pt-0'>
        <div className='mx-auto w-full px-4 py-10 sm:w-[480px]'>
          <div className='bg-card border-border flex flex-col justify-center space-y-2 rounded-2xl border p-6 shadow-sm sm:p-8'>
            {children}
          </div>
          <p className='text-muted-foreground mt-6 text-center text-xs leading-6'>
            {t(
              'Use AI responsibly. Protect your account and respect academic integrity.'
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
