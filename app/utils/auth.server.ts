import { Authenticator } from "remix-auth"
import { Auth0ExtraParams, Auth0Strategy } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import { getRequiredServerEnvVar } from "./environment"
import { sessionStorage } from "./session.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { User as PortalUser } from "~/models/portal/sdk"
import { initAdminPortal } from "~/utils/adminPortal"

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<{
  accessToken: string
  refreshToken: string
  extraParams: Auth0ExtraParams
  user: PortalUser & {
    auth0ID: string
  }
}>(sessionStorage)

export type AuthUser = {
  accessToken: string
  refreshToken: string
  extraParams: Auth0ExtraParams
  user: PortalUser & {
    auth0ID: string
  }
}

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "/api/auth/auth0/callback",
    clientID: getRequiredServerEnvVar("AUTH0_CLIENT_ID"),
    clientSecret: getRequiredServerEnvVar("AUTH0_CLIENT_SECRET"),
    domain: getRequiredServerEnvVar("AUTH0_DOMAIN"),
    audience: getRequiredServerEnvVar("AUTH0_AUDIENCE"),
    scope: getRequiredServerEnvVar("AUTH0_SCOPE"),
  },
  async ({ accessToken, refreshToken, extraParams, profile }): Promise<AuthUser> => {
    const email = profile?._json?.email
    const providerUserID = profile?.id

    invariant(email, "email is not found")
    invariant(providerUserID, "providerUserID is not found")

    const portal = initPortalClient({ token: accessToken })
    const getPortalUserResponse = await portal.getPortalUser().catch((e) => {
      console.log(e)
    })

    let portalUser = {
      ...(getPortalUserResponse?.getPortalUser as PortalUser),
      auth0ID: providerUserID,
    }

    // handle edge case where user could have signed up via auth0 and yet not have an internal portalUserId
    if (!portalUser) {
      const portalAdmin = await initAdminPortal(portal)

      const user = await portalAdmin.adminCreatePortalUser({
        email,
        providerUserID,
      })

      portalUser = {
        ...(user.adminCreatePortalUser as PortalUser),
        auth0ID: providerUserID,
      }
    }

    return { accessToken, refreshToken, extraParams, user: portalUser }
  },
)

authenticator.use(auth0Strategy)
