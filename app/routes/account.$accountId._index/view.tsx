import { Badge, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core"
import { useNavigation } from "@remix-run/react"
import React from "react"
import TitledCard from "~/components/TitledCard"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk/models/AnalyticsRelaysAggregated"
import { AnalyticsRelaysTotal } from "~/models/dwh/sdk/models/AnalyticsRelaysTotal"
import { AccountAppsOverview } from "~/routes/account.$accountId._index/components/AccountAppsOverview"
import { ChartPeriodSelector } from "~/routes/account.$accountId._index/components/ChartPeriodSelector"
import { OverviewSparkline } from "~/routes/account.$accountId._index/components/OverviewSparkline"
import useAggregateChartData from "~/routes/account.$accountId._index/hooks/useAggregateChartData"
import { getTotalErrors } from "~/utils/chartUtils"
import { commify } from "~/utils/formattingUtils"

type AccountInsightsViewProps = {
  total: AnalyticsRelaysTotal
  aggregate: AnalyticsRelaysAggregated[]
}

export const AccountInsightsView = ({ total, aggregate }: AccountInsightsViewProps) => {
  const navigation = useNavigation()

  const isLoading = !!(navigation.state === "loading" && navigation.formAction)

  const totalErrors = getTotalErrors(total)

  const {
    aggregatedSuccessData,
    aggregatedTotalData,
    aggregatedLatencyData,
    aggregatedErrorData,
  } = useAggregateChartData(aggregate)

  return (
    <Stack mb="xl" pt={22} spacing="xl">
      <TitledCard
        header={() => (
          <Group position="apart">
            <Text weight={600}>Account Overview</Text>
            <ChartPeriodSelector />
          </Group>
        )}
      >
        <Card.Section>
          <AccountAppsOverview aggregate={total} isLoading={isLoading} />
        </Card.Section>
      </TitledCard>

      <Stack spacing="xl">
        <TitledCard
          header={() => (
            <Group position="apart">
              <Group>
                <Text weight={600}>Total Relays</Text>
                <Badge px={6} radius="sm">
                  {commify(total?.countTotal ?? 0)}
                </Badge>
              </Group>
              <ChartPeriodSelector />
            </Group>
          )}
        >
          <Card.Section p="md">
            <OverviewSparkline
              commifyLabelValue={true}
              isLoading={isLoading}
              sparklineData={aggregatedTotalData}
            />
          </Card.Section>
        </TitledCard>

        <SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2}>
          <TitledCard
            header={() => (
              <Group position="apart">
                <Group>
                  <Text weight={600}>Average Latency</Text>
                  <Badge px={6} radius="sm">
                    {commify(total?.avgLatency ?? 0)}ms
                  </Badge>
                </Group>
                <ChartPeriodSelector />
              </Group>
            )}
          >
            <Card.Section p="md">
              <OverviewSparkline
                isLoading={isLoading}
                label="ms"
                sparklineData={aggregatedLatencyData}
              />
            </Card.Section>
          </TitledCard>
          <TitledCard
            header={() => (
              <Group position="apart">
                <Group>
                  <Text weight={600}>Success Rate</Text>
                  <Badge px={6} radius="sm">
                    {commify(total?.rateSuccess ?? 0)}%
                  </Badge>
                </Group>
                <ChartPeriodSelector />
              </Group>
            )}
          >
            <Card.Section p="md">
              <OverviewSparkline
                customYAxisDomain={["dataMin - 10", 100]}
                isLoading={isLoading}
                label="%"
                sparklineData={aggregatedSuccessData}
              />
            </Card.Section>
          </TitledCard>
        </SimpleGrid>
        <TitledCard
          header={() => (
            <Group position="apart">
              <Group>
                <Text weight={600}>Total Errors</Text>
                <Badge px={6} radius="sm">
                  {totalErrors ? commify(totalErrors) : 0}
                </Badge>
              </Group>
              <ChartPeriodSelector />
            </Group>
          )}
        >
          <Card.Section p="md">
            <OverviewSparkline
              commifyLabelValue={true}
              isLoading={isLoading}
              sparklineData={aggregatedErrorData}
            />
          </Card.Section>
        </TitledCard>
      </Stack>
    </Stack>
  )
}

export default AccountInsightsView
