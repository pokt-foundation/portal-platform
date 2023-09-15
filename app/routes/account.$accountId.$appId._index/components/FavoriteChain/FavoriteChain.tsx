import { ActionIcon } from "@mantine/core"
import { Form } from "@remix-run/react"
import { RiStarFill, RiStarLine } from "react-icons/ri"
import { Blockchain, Maybe } from "~/models/portal/sdk"

type FavoriteChainProps = {
  blockchain: Blockchain & {
    favorite: boolean
  }
  favoriteChains?: Maybe<string[]>
}

export const FavoriteChain = ({ blockchain, favoriteChains }: FavoriteChainProps) => {
  return (
    <Form method="post">
      <input hidden readOnly name="isFavorite" value={String(!blockchain.favorite)} />
      <input hidden readOnly name="chainId" value={blockchain.id} />
      <input
        hidden
        readOnly
        name="favoriteChains"
        value={JSON.stringify(favoriteChains) ?? "[]"}
      />
      <ActionIcon
        c={blockchain.favorite ? "yellow" : "gray"}
        size="xl"
        title={`Set blockchain ${blockchain.blockchain} as favorite`}
        type="submit"
      >
        {blockchain.favorite ? <RiStarFill size={18} /> : <RiStarLine size={18} />}
      </ActionIcon>
    </Form>
  )
}

export default FavoriteChain