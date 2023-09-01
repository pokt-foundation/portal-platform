import { Navbar } from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import React, { useMemo } from "react"
import { InternalLink, SidebarNavRoute } from "~/components/Sidebar/components"
import { EndpointsQuery } from "~/models/portal/sdk"

type SidebarAppsProps = {
  apps: EndpointsQuery
  iconOnly?: boolean
}

function getRandomAppmoji(): string {
  const emojis: string[] = [
    "💡",
    "🕹️",
    "⛰️",
    "🚀",
    "🔥",
    "🐛",
    "⚙️",
    "📱",
    "💻",
    "🛠️",
    "🎮 ",
  ]

  const randomIndex: number = Math.floor(Math.random() * emojis.length)
  return emojis[randomIndex]
}

export const SidebarApps = ({ apps, iconOnly }: SidebarAppsProps) => {
  const { accountId } = useParams()
  const appsRoutes = useMemo(() => {
    return Object.entries(apps).flatMap(([parent, apps]) => {
      return typeof apps === "object"
        ? apps.map((app) => ({
            to: `account/${accountId}/${app?.id}`,
            label: app?.name,
            badge: parent,
            icon: getRandomAppmoji(),
          }))
        : []
    }) as SidebarNavRoute[]
  }, [accountId, apps])

  return (
    <Navbar.Section>
      {appsRoutes.map((SidebarNavRoute) => (
        <InternalLink
          key={SidebarNavRoute.to}
          iconOnly={iconOnly}
          route={SidebarNavRoute}
        />
      ))}
    </Navbar.Section>
  )
}

export default SidebarApps
