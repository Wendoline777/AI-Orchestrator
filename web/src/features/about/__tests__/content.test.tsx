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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'
import { useSystemConfigStore } from '@/stores/system-config-store'

import { About } from '..'

let client: QueryClient

beforeEach(() => {
  client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  })
  client.setQueryData(['status'], {
    demo_site_enabled: false,
    user_agreement_enabled: true,
    privacy_policy_enabled: true,
  })
  client.setQueryData(['notice'], { success: true, data: '' })
  useSystemConfigStore.getState().setConfig({
    systemName: "dluter's api",
    footerHtml: '',
    demoSiteEnabled: false,
  })
})

afterEach(() => {
  cleanup()
  client.clear()
  useAuthStore.setState(useAuthStore.getInitialState(), true)
  useSystemConfigStore.setState(useSystemConfigStore.getInitialState(), true)
  window.localStorage.clear()
})

async function renderAbout() {
  const router = createRouter({
    routeTree: createRootRoute({ component: About }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  await router.load()
  return render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

describe('student platform about content', () => {
  it('provides a student guide and service links when no custom content is configured outside demo mode', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({
      data: { success: true, data: '  ' },
    })
    await renderAbout()

    expect(
      await screen.findByRole('heading', {
        name: 'Student getting-started guide',
      })
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'Browse model resources' })
    ).toHaveAttribute('href', '/pricing')
    expect(
      screen.getByRole('button', { name: 'Open learning workspace' })
    ).toHaveAttribute('href', '/dashboard')
    expect(
      screen.getByRole('heading', { name: 'Responsible use guidelines' })
    ).toBeVisible()
    expect(
      screen.getByRole('heading', { name: 'Open-source acknowledgements' })
    ).toBeVisible()
    const footer = within(screen.getByRole('contentinfo'))
    expect(
      footer.getByRole('navigation', { name: 'Student service links' })
    ).toBeVisible()
    expect(footer.getByRole('link', { name: 'DUT Library' })).toHaveAttribute(
      'href',
      'https://www.lib.dlut.edu.cn/'
    )
    expect(
      footer.getByRole('link', { name: 'User Agreement' })
    ).toHaveAttribute('href', '/user-agreement')
    expect(
      footer.getByRole('link', { name: 'Privacy Policy' })
    ).toHaveAttribute('href', '/privacy-policy')
    expect(footer.getByRole('link', { name: 'New API' })).toHaveAttribute(
      'href',
      'https://github.com/QuantumNous/new-api'
    )
  })

  it('shows administrator Markdown instead of default student content when configured', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({
      data: {
        success: true,
        data: '# Department service guide\nCustom student support information.',
      },
    })
    await renderAbout()

    expect(
      await screen.findByRole('heading', { name: 'Department service guide' })
    ).toBeVisible()
    expect(
      screen.queryByRole('heading', { name: 'Student getting-started guide' })
    ).not.toBeInTheDocument()
  })

  it('preserves sandboxed administrator URL content when configured', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({
      data: { success: true, data: 'https://example.edu/student-guide' },
    })
    await renderAbout()

    const frame = await screen.findByTitle('About')
    expect(frame).toHaveAttribute('src', 'https://example.edu/student-guide')
    expect(frame).toHaveAttribute(
      'sandbox',
      'allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts'
    )
    expect(
      screen.queryByRole('heading', { name: 'Student getting-started guide' })
    ).not.toBeInTheDocument()
  })
})
