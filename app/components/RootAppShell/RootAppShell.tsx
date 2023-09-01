import { AppShell, Container, Header } from "@pokt-foundation/pocket-blocks"
import React, { ReactNode, useMemo, useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import { AppHeader } from "~/components/AppHeader"
import { Sidebar } from "~/components/Sidebar"
import { EndpointsQuery } from "~/models/portal/sdk"
import { useRoot } from "~/root/hooks/useRoot"
import useCommonStyles from "~/styles/commonStyles"

type RootAppShellProps = {
  user: Auth0Profile
  endpoints: EndpointsQuery
  children: ReactNode
}

export const RootAppShell = ({ user, endpoints, children }: RootAppShellProps) => {
  const [opened, setOpened] = useState(false)
  const { classes: commonClasses } = useCommonStyles()
  const { hideSidebar } = useRoot({ user })
  const navProp = useMemo(
    () => ({
      ...(!hideSidebar && { navbar: <Sidebar endpoints={endpoints} hidden={!opened} /> }),
    }),
    [hideSidebar, endpoints, opened],
  )

  return (
    <AppShell
      header={
        <Header
          className={commonClasses.mainBackgroundColor}
          height={{ base: 50, md: 70 }}
          p="md"
        >
          <AppHeader opened={opened} user={user} onOpen={(o) => setOpened(o)} />
        </Header>
      }
      {...navProp}
      navbarOffsetBreakpoint="sm"
      padding="xs"
    >
      <Container size="lg">{children}</Container>
    </AppShell>
  )
}

export default RootAppShell