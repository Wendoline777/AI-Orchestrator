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
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CTA } from '../components/sections/cta'
import { Hero } from '../components/sections/hero'

async function renderStudentHero(isAuthenticated: boolean) {
  const rootRoute = createRootRoute({ component: Outlet })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <Hero isAuthenticated={isAuthenticated} />,
  })
  const signInRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sign-in',
    component: () => <h1>Account sign-in</h1>,
  })
  const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: () => <h1>Student console</h1>,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, signInRoute, dashboardRoute]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  await router.load()
  render(<RouterProvider router={router} />)
}

describe('student home navigation', () => {
  it('takes a signed-out student to sign-in using the primary keyboard action', async () => {
    const user = userEvent.setup()
    await renderStudentHero(false)

    const signIn = await screen.findByRole('button', {
      name: 'Sign in to get started',
    })
    expect(
      screen.getByRole('button', { name: 'Online conversation' })
    ).toHaveAttribute('href', '/playground')
    expect(
      screen.getByRole('button', { name: 'Read the getting-started guide' })
    ).toHaveAttribute('href', '#student-guide')
    await user.tab()
    expect(signIn).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(
      await screen.findByRole('heading', { name: 'Account sign-in' })
    ).toBeVisible()
  })

  it('takes a signed-in student directly to the console', async () => {
    const user = userEvent.setup()
    await renderStudentHero(true)

    await user.click(
      await screen.findByRole('button', { name: 'Enter student console' })
    )
    expect(
      await screen.findByRole('heading', { name: 'Student console' })
    ).toBeVisible()
  })

  it('keeps academic integrity and privacy guidance visible for signed-in students', async () => {
    const router = createRouter({
      routeTree: createRootRoute({ component: () => <CTA isAuthenticated /> }),
      history: createMemoryHistory({ initialEntries: ['/'] }),
    })
    await router.load()
    render(<RouterProvider router={router} />)

    const guidance = await screen.findByRole('region', {
      name: 'Use AI thoughtfully. Learn with integrity.',
    })
    expect(within(guidance).getByText('Academic integrity')).toBeVisible()
    expect(
      within(guidance).getByText('Privacy and information protection')
    ).toBeVisible()
    expect(
      within(guidance).getByRole('button', { name: 'Enter student console' })
    ).toHaveAttribute('href', '/dashboard')
  })
})
