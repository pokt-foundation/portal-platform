import {
  Card,
  Text,
  Button,
  Badge,
  List,
  useMantineTheme,
  Stack,
  Title,
  Box,
} from "@pokt-foundation/pocket-blocks"
import { RiCheckLine, RiCloseLine } from "react-icons/ri"
import { PayPlanType } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

type AccountPlanProps = {
  type: PayPlanType.PayAsYouGoV0 | PayPlanType.FreetierV0
  onContinue: () => void
}

const AutoScaleList = () => {
  const theme = useMantineTheme()

  return (
    <List
      center
      icon={<RiCheckLine color={theme.colors.blue[7]} size="18px" />}
      size="sm"
      spacing="md"
    >
      <List.Item>100,000 relays free per day</List.Item>
      <List.Item>Auto-Scale at $7.456 / additional million</List.Item>
      <List.Item>No throughput limit</List.Item>
      {/*<List.Item>5 Applications</List.Item>*/}
      {/*<List.Item>10 Team Members</List.Item>*/}
      <List.Item>Direct Customer Support</List.Item>
      <List.Item>Unlimited Endpoints</List.Item>
      <List.Item>Global Region Support</List.Item>
      <List.Item>ETH Trace Supported</List.Item>
    </List>
  )
}

const FreeList = () => (
  <List center icon={<RiCheckLine size="18px" />} size="sm" spacing="md">
    <List.Item>100,000 relays free per day</List.Item>
    <List.Item icon={<RiCloseLine size="18px" />}>
      <Text td="line-through">Auto-Scale</Text>
    </List.Item>
    <List.Item>30 request/sec throughput limit</List.Item>
    {/*<List.Item>2 Applications</List.Item>*/}
    {/*<List.Item>2 Team Members</List.Item>*/}
    <List.Item>Community Discord Support</List.Item>
    <List.Item>Unlimited Endpoints</List.Item>
    <List.Item>Global Region Support</List.Item>
    <List.Item icon={<RiCloseLine size="18px" />}>
      <Text td="line-through">ETH Trace Supported</Text>
    </List.Item>
  </List>
)

export const AccountPlan = ({ type, onContinue }: AccountPlanProps) => {
  const isFree = type === PayPlanType.FreetierV0
  const { classes: commonClasses } = useCommonStyles()

  return (
    <Card withBorder radius="md" shadow="sm" w="360px">
      <Stack align="center" mb="xl" spacing="xl">
        <Badge color="gray" mb="8px">
          {isFree ? "Builder" : "Pay as you go"}
        </Badge>
        <Title order={3}>{isFree ? "Free" : "Auto-Scale"}</Title>
      </Stack>
      <Text align="center" py="lg">
        {isFree
          ? "For developers looking to get started reading and writing data from any integrated chains."
          : "For projects needing to scale, pay only for the RPC requests above the free threshold."}
      </Text>

      {isFree ? (
        <Button
          fullWidth
          classNames={{ root: commonClasses.grayOutlinedButton }}
          color="gray"
          radius="xl"
          variant="outline"
          onClick={onContinue}
        >
          Continue with Free
        </Button>
      ) : (
        <Button fullWidth radius="xl" onClick={onContinue}>
          Continue with Auto-Scale
        </Button>
      )}

      <Box mt="md">{isFree ? <FreeList /> : <AutoScaleList />}</Box>
    </Card>
  )
}

export default AccountPlan
