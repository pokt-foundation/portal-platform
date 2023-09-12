import { useLoaderData } from ".pnpm/react-router@6.11.0_react@18.2.0/node_modules/react-router"
import { json, LoaderFunction, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import ErrorView from "~/components/ErrorView"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { GetUserAccountQuery, PortalApp } from "~/models/portal/sdk"
import { authenticator } from "~/utils/auth.server"
import { getErrorMessage } from "~/utils/catchError"
import { LoaderDataStruct } from "~/utils/loader"

export type AccountIdLoaderData = {
  account: GetUserAccountQuery["getUserAccount"]
  user: Auth0Profile
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request)

  if (!user || !params.accountId) {
    return redirect("/api/auth/auth0")
  }

  const portal = initPortalClient({ token: user.accessToken })

  try {
    const account = await portal.getUserAccount({ accountID: params.accountId })

    if (!account.getUserAccount) {
      throw new Error(`Account ${params.accountId} not found for user ${user.profile.id}`)
    }

    return json<LoaderDataStruct<AccountIdLoaderData>>({
      data: {
        account: account.getUserAccount,
        user: user.profile,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<AccountIdLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function AccountId() {
  const { data, error, message } =
    useLoaderData() as LoaderDataStruct<AccountIdLoaderData>

  if (error) {
    return <ErrorView message={message} />
  }

  const { account, user } = data
  return (
    <RootAppShell apps={account.portalApps as PortalApp[]} user={user}>
      <Outlet context={account} />
    </RootAppShell>
  )
}
