import { Divider, Box, Group, Text } from "@mantine/core"
import { useSearchParams } from "@remix-run/react"
import React from "react"
import ChainSelectItem from "~/components/ChainSelectItem"
import FluidSelect from "~/components/FluidSelect"
import { Blockchain, PortalApp } from "~/models/portal/sdk"
import { getAppNameWithEmoji } from "~/utils/accountUtils"

type InsightsControlsProps = {
  apps?: PortalApp[]
  chains: Blockchain[]
}

export const DEFAULT_DWH_PERIOD = "24hr"

const InsightsControls = ({ apps, chains }: InsightsControlsProps) => {
  const appsSelectItems = [
    { value: "all", label: "All Applications" },
    ...(apps && apps.length > 0
      ? apps.map((app) => ({
          value: app?.id ?? "",
          label: getAppNameWithEmoji(app),
        }))
      : []),
  ]

  const chainsSelectItems = React.useMemo(() => {
    return chains.length > 0
      ? [
          { value: "all", label: "All Networks" },
          ...(chains.length > 0
            ? chains.map((chain) => ({
                value: chain.id,
                label: chain.description ?? chain.blockchain,
                chain,
              }))
            : []),
        ]
      : []
  }, [chains])

  const [searchParams, setSearchParams] = useSearchParams()
  const periodParam = searchParams.get("period") ?? DEFAULT_DWH_PERIOD
  const appParam = searchParams.get("app") ?? "all"
  const chainParam = searchParams.get("chain")
    ? (searchParams.get("chain") as string)
    : chains.length > 0
    ? "all"
    : undefined

  const handleParamChange = ({
    param,
    paramKey,
  }: {
    param: string
    paramKey: string
  }) => {
    setSearchParams((searchParams) => {
      searchParams.set(paramKey, param)
      return searchParams
    })
  }

  const handleAppChange = (app: string) => {
    setSearchParams((searchParams) => {
      searchParams.delete("chain")
      searchParams.set("app", app)
      return searchParams
    })
  }

  return (
    <Group justify="space-between">
      <Group>
        <Group className="bordered-container" gap={0} pos="relative">
          {apps ? (
            <>
              <FluidSelect
                items={appsSelectItems}
                styles={{ label: { marginLeft: 12, marginRight: 12 } }}
                value={appParam}
                onSelect={handleAppChange}
              />
              <Divider orientation="vertical" />
            </>
          ) : null}
          <FluidSelect
            disabled={chainsSelectItems.length === 0}
            itemComponent={ChainSelectItem}
            items={chainsSelectItems}
            placeholder="No Networks"
            value={chainParam}
            withSearch={chainsSelectItems.length > 7}
            onSelect={(chain: string) =>
              handleParamChange({ param: chain, paramKey: "chain" })
            }
          />
        </Group>
        <Text>filtered over the past</Text>
        <Box className="bordered-container">
          <FluidSelect
            items={[
              { value: "24hr", label: "24 Hours" },
              { value: "3", label: "3 Days" },
              { value: "7", label: "7 Days" },
              { value: "14", label: "2 Weeks" },
              { value: "30", label: "30 Days" },
              { value: "60", label: "60 Days" },
              {
                value: "weekToDate",
                label: "Week to Date",
              },
              {
                value: "monthToDate",
                label: "Month to Date",
              },
            ]}
            value={periodParam}
            onSelect={(period: string) =>
              handleParamChange({ param: period, paramKey: "period" })
            }
          />
        </Box>
      </Group>
    </Group>
  )
}

export default InsightsControls