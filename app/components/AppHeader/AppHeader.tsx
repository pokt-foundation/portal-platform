import { Burger, Flex, MediaQuery } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import React from "react"
import { Auth0Profile } from "remix-auth-auth0"
import OrganizationDrawer from "~/components/OrganizationDrawer"
import { Account } from "~/models/portal/sdk"

type HeaderProps = {
  user?: Auth0Profile
  accounts: Account[]
  opened: boolean
  onOpen: (o: boolean) => void
}

export const AppHeader = ({ user, opened, onOpen, accounts }: HeaderProps) => {
  return (
    <>
      <Flex align="center" h="100%" justify="space-between">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger mr="xl" opened={opened} size="sm" onClick={() => onOpen(!opened)} />
        </MediaQuery>
        <Link to="/">
          <img alt="Grove logo" height={20} loading="lazy" src="/grove-logo.svg"></img>
        </Link>
        <OrganizationDrawer accounts={accounts} user={user} />
      </Flex>
    </>
  )
}

export default AppHeader
