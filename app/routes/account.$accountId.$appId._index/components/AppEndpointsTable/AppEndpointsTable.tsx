import {
  ActionIcon,
  Avatar,
  Flex,
  Menu,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
  UnstyledButton,
} from "@pokt-foundation/pocket-blocks"
import { useParams } from "@remix-run/react"
import { LuBook } from "react-icons/lu"
import { RiStarLine } from "react-icons/ri"
import ContextMenuTarget from "~/components/ContextMenuTarget"
import CopyTextButton from "~/components/CopyTextButton"
import { DataTable } from "~/components/DataTable"
import { Blockchain } from "~/models/portal/sdk"
import { CHAIN_DOCS_URL } from "~/utils/chainUtils"

type AppEndpointsProps = {
  blockchains: Blockchain[]
  searchTerm: string
}

const getAppEndpointUrl = (chain: Blockchain, appId: string | undefined) =>
  `https://${chain?.blockchain}.gateway.pokt.network/v1/lb/${appId}`

const AppEndpointsTable = ({ blockchains, searchTerm }: AppEndpointsProps) => {
  const theme = useMantineTheme()
  const { appId } = useParams()
  return (
    blockchains && (
      <DataTable
        data={blockchains
          .sort((a, b) => (a.blockchain > b.blockchain ? 1 : -1))
          .map((chain) => {
            return {
              chain: {
                element: (
                  <Flex gap="sm">
                    <ActionIcon c="gray" size="xl">
                      <RiStarLine size={18} />
                    </ActionIcon>
                    <Avatar
                      radius={40}
                      size={40}
                      src={`/chain-logos/${chain.blockchain}.svg`}
                    />
                    <Stack spacing={0} w={200}>
                      <Text truncate fw={600}>
                        {chain.description}
                      </Text>
                      <Text c="dimmed" fz="xs">
                        {chain.blockchain}
                      </Text>
                    </Stack>
                  </Flex>
                ),
                value: `${chain.description} ${chain.blockchain}`,
                cellProps: {
                  style: { minWidth: "340px" },
                  width: "35%",
                },
              },
              endpointUrl: {
                element: (
                  <TextInput
                    bg={theme.colors.gray[9]}
                    miw={300}
                    value={getAppEndpointUrl(chain, appId)}
                  />
                ),
              },
              action: {
                element: (
                  <Flex gap="lg" justify="flex-end">
                    <CopyTextButton value={getAppEndpointUrl(chain, appId)} />
                    <Menu>
                      <ContextMenuTarget />
                      <Menu.Dropdown>
                        {chain.blockchain && CHAIN_DOCS_URL[chain.blockchain] && (
                          <Menu.Item icon={<LuBook size={18} />}>
                            <UnstyledButton
                              component="a"
                              fz="sm"
                              href={`https://docs.portal.pokt.network/supported-methods/supported-methods/${
                                CHAIN_DOCS_URL[chain.blockchain]
                              }`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Documentation
                            </UnstyledButton>
                          </Menu.Item>
                        )}

                        <Menu.Item icon={<RiStarLine size={18} />}>
                          Mark as favorite
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Flex>
                ),
                cellProps: {
                  style: { minWidth: "130px" },
                  width: "130px%",
                },
              },
            }
          })}
        paginate={false}
        searchTerm={searchTerm}
      />
    )
  )
}

export default AppEndpointsTable
