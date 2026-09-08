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
import { act, cleanup, render, screen } from '@testing-library/react'
import { createInstance, type i18n } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import zh from '@/i18n/locales/zh.json'

import { TermsFooter } from '../components/terms-footer'

describe('TermsFooter translations', () => {
  let instance: i18n

  beforeEach(async () => {
    instance = createInstance()
    await instance.init({
      lng: 'en',
      fallbackLng: 'en',
      resources: { en: { translation: {} }, zh },
      interpolation: { escapeValue: false },
    })
  })

  afterEach(() => {
    cleanup()
    instance.off('languageChanged')
  })

  it.each([
    {
      variant: 'sign-in' as const,
      english: 'By clicking sign in, you agree to our',
      chinese: '点击登录即表示您同意我们的',
    },
    {
      variant: 'sign-up' as const,
      english: 'By creating an account, you agree to our',
      chinese: '创建账号即表示您同意我们的',
    },
  ])(
    'translates the $variant consent text and enabled legal links when switching to Chinese',
    async ({ variant, english, chinese }) => {
      render(
        <I18nextProvider i18n={instance}>
          <TermsFooter
            variant={variant}
            status={{
              user_agreement_enabled: true,
              privacy_policy_enabled: true,
            }}
          />
        </I18nextProvider>
      )
      expect(screen.getByText(english, { exact: false })).toBeVisible()
      expect(screen.getByRole('link', { name: 'User Agreement' })).toBeVisible()

      await act(async () => {
        await instance.changeLanguage('zh')
      })

      expect(screen.getByText(chinese, { exact: false })).toBeVisible()
      expect(
        screen.queryByText(english, { exact: false })
      ).not.toBeInTheDocument()
      expect(screen.getByRole('link', { name: '用户协议' })).toHaveAttribute(
        'href',
        '/user-agreement'
      )
      expect(screen.getByRole('link', { name: '隐私政策' })).toHaveAttribute(
        'href',
        '/privacy-policy'
      )
    }
  )

  it.each([
    { label: 'unavailable', status: null },
    {
      label: 'disabled',
      status: {
        user_agreement_enabled: false,
        privacy_policy_enabled: false,
      },
    },
  ])(
    'omits consent text when legal settings are $label',
    async ({ status }) => {
      await instance.changeLanguage('zh')
      const { container } = render(
        <I18nextProvider i18n={instance}>
          <TermsFooter status={status} />
        </I18nextProvider>
      )

      expect(container).toBeEmptyDOMElement()
    }
  )
})
