import { Divider, Card, Drawer, Group, Stack, Text } from "@mantine/core"
import React from "react"
import { TitledCard } from "~/components/TitledCard"
import { Logs } from "~/models/dwh/sdk"
import { dayjs } from "~/utils/dayjs"

type LogsSideDrawerProps = {
  logsItem?: Logs
  onSideDrawerClose: () => void
}

const LogsSideDrawer = ({ logsItem, onSideDrawerClose }: LogsSideDrawerProps) => {
  const cardItems = [
    {
      label: "Date",
      value: dayjs(logsItem?.ts).format("D MMMM, YYYY"),
    },
    {
      label: "Time",
      value: dayjs(logsItem?.ts).format("h:mm:ss A"),
    },
    {
      label: "Application ID",
      value: logsItem?.portalApplicationId,
    },
    {
      label: "Chain ID",
      value: logsItem?.chainId,
    },
    {
      label: "Supported method",
      value: logsItem?.chainMethod,
    },
    {
      label: "Error type",
      value: logsItem?.errorType,
    },
    {
      label: "Error name",
      value: logsItem?.errorName,
    },
  ]

  return (
    <Drawer
      opened={!!logsItem}
      padding="sm"
      position="right"
      size={800}
      onClose={onSideDrawerClose}
    >
      <Stack>
        <TitledCard header={() => <Text fw={600}>Summary</Text>}>
          <Card.Section p="md">
            <Stack gap={12}>
              {cardItems.map(({ label, value }, index) => (
                <React.Fragment key={`${label}-${index}`}>
                  <Group justify="space-between" px={12}>
                    <Text>{label}</Text> <Text>{value}</Text>
                  </Group>
                  {index !== cardItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Stack>
          </Card.Section>
        </TitledCard>

        <TitledCard header={() => <Text fw={600}>Message</Text>}>
          <Card.Section p="md">
            <Text>{logsItem?.errorMessage}</Text>
          </Card.Section>
        </TitledCard>
      </Stack>
    </Drawer>
  )
}

export default LogsSideDrawer
