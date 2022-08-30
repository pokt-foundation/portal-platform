import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { useCatch, useLoaderData, useSearchParams } from "@remix-run/react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { BlockchainsQuery, EndpointQuery, PayPlanType } from "~/models/portal/sdk"
import {
  getRelays,
  getRelaysPerWeek,
  RelayMetric,
} from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { requireUser } from "~/utils/session.server"
import AppIdLayoutView, {
  links as AppIdLayoutViewLinks,
} from "~/views/dashboard/apps/appId/layout/appIdLayoutView"

export const links = () => {
  return [...AppIdLayoutViewLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Overview",
  }
}

export type AppIdLoaderData = {
  blockchains: BlockchainsQuery["blockchains"]
  endpoint: EndpointQuery["endpoint"]
  relaysToday: RelayMetric
  relaysYesterday: RelayMetric
  dailyNetworkRelaysPerWeek: RelayMetric[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  invariant(params.appId, "app id not found")

  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)

  if (searchParams.get("success") === "true") {
    try {
      await portal.updateEndpoint({
        input: {
          id: params.appId,
          payPlanType: PayPlanType.PayAsYouGoV0,
        },
      })
    } catch (e) {}
  }

  const { endpoint } = await portal.endpoint({
    endpointID: params.appId,
  })
  invariant(endpoint, "app id not found")

  const dailyNetworkRelaysPerWeek = await getRelaysPerWeek("endpoints", endpoint.id)
  const { blockchains } = await portal.blockchains()

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
  const today = dayjs().utc().format()
  const yesterday = dayjs().utc().subtract(1, "day").format()
  const relaysToday = await getRelays("endpoints", today, today, endpoint.id)
  const relaysYesterday = await getRelays("endpoints", yesterday, yesterday, endpoint.id)

  return json<AppIdLoaderData>(
    {
      blockchains,
      endpoint,
      dailyNetworkRelaysPerWeek,
      relaysToday,
      relaysYesterday,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export default function AppIdLayout() {
  const { endpoint } = useLoaderData() as AppIdLoaderData
  const [searchParams] = useSearchParams()

  return <AppIdLayoutView endpoint={endpoint} searchParams={searchParams} />
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>App Catch Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>App Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
