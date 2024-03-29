import { json } from "@remix-run/node"
import { getSdk, UpdateUser, User } from "~/models/portal/sdk"
import { ActionDataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"

export type ActionUser = { user: User }

export const actionUser = async (
  portal: ReturnType<typeof getSdk>,
  input: UpdateUser,
) => {
  try {
    const updatePortalUserResponse = await portal.updatePortalUser({
      updateUser: input,
    })
    if (!updatePortalUserResponse.updatePortalUser) {
      throw new Error("User not able to be updated")
    }

    return json<ActionDataStruct<ActionUser>>({
      data: {
        user: updatePortalUserResponse.updatePortalUser as User,
      },
      error: false,
      message: "User profile updated",
    })
  } catch (error) {
    return json<ActionDataStruct<ActionUser>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}
