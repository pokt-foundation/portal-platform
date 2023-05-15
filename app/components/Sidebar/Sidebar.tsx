import { List, Navbar, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import LinksGroup, { LinksGroupProps } from "../LinksGroup/LinksGroup"

type SidebarProps = {
  data: LinksGroupProps[]
}

export function Sidebar({ data }: SidebarProps) {
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />)

  const theme = useMantineTheme()

  return (
    <Navbar
      bg={theme.colors.navy[7]}
      height="unset"
      p="16px 8px 48px 0"
      width={{ sm: 300 }}
      withBorder={false}
    >
      <Navbar.Section grow>
        <List unstyled withPadding>
          {links}
        </List>
      </Navbar.Section>
    </Navbar>
  )
}
