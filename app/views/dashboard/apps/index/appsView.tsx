import { Tabs } from "@mantine/core"
import {
  IconCaretRight,
  Title,
  Text,
  IconMoreVertical,
} from "@pokt-foundation/pocket-blocks"
import { Form, Link, useActionData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import styles from "./styles.css"
import UsageChartCard, {
  links as UsageCardLinks,
} from "~/components/application/UsageChartCard"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Dropdown, {
  DropdownItem,
  links as DropdownLinks,
} from "~/components/shared/Dropdown"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import NotificationMessage, {
  links as NotificationMessageLinks,
  NotificationMessageType,
} from "~/components/shared/NotificationMessage"
import StatusTag, { links as StatusTagLinks } from "~/components/shared/StatusTag"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { EndpointsQuery, ProcessedEndpoint } from "~/models/portal/sdk"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { dayjs } from "~/utils/dayjs"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { getPlanName } from "~/utils/utils"

/* c8 ignore start */
export const links = () => {
  return [
    ...TableLinks(),
    ...CardLinks(),
    ...UsageCardLinks(),
    ...ModalLinks(),
    ...StatusTagLinks(),
    ...DropdownLinks(),
    ...NotificationMessageLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type AppsViewProps = {
  userId: string
  endpoints: EndpointsQuery | null
  dailyNetworkRelaysPerWeek: RelayMetric[] | null
  searchParams: URLSearchParams
  profile: Auth0Profile
}

export const AppsView = ({
  endpoints,
  dailyNetworkRelaysPerWeek,
  searchParams,
  userId,
  profile,
}: AppsViewProps) => {
  const uEmail = profile.emails[0].value
  const [showErrorModal, setShowErrorModal] = useState(false)
  const notOwnerEndpoints = endpoints ? endpoints.admin.concat(endpoints.member) : []
  const userDataByEndpoint = notOwnerEndpoints.map((endpoint) =>
    endpoint?.users.find((u) => u.email === uEmail),
  )

  console.log(uEmail)
  console.log(notOwnerEndpoints)
  console.log(userDataByEndpoint)
  console.log(profile)
  const [notificationMessageProps, setNotificationMessageProps] =
    useState<NotificationMessageType>({
      type: "info",
      title: "",
      description: "",
      isActive: false,
    })
  const [optionsEndpointId, setOptionsEndpointId] = useState<string>("")

  const actionData = useActionData()

  useEffect(() => {
    const error = searchParams.get("error")
    if (error === "true") {
      const path = window.location.pathname
      window.history.replaceState({}, document.title, path)
      setShowErrorModal(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (endpoints && endpoints !== null && endpoints.admin.length > 0 && endpoints.member.length > 0) {
      const notAcceptedAdminEndpoints = endpoints?.admin.filter((endpoint) => {
        const notAcceptedEndpoint = endpoint?.users?.find((user) => {
          return user.email === profile?._json?.email && !user.accepted
        })
        return notAcceptedEndpoint || false
      })

      const notAcceptedMemberEndpoints = endpoints?.member.filter((endpoint) => {
        const notAcceptedEndpoint = endpoint?.users?.find((user) => {
          return user.email === profile?._json?.email && !user.accepted
        })
        return notAcceptedEndpoint || false
      })

      const notAcceptedEndpoints = notAcceptedAdminEndpoints.concat(notAcceptedMemberEndpoints)

      if (notAcceptedEndpoints.length > 0) {
        setNotificationMessageProps({
          type: "options",
          title: `You have been invited to ${notAcceptedEndpoints[0]?.name}`,
          description: "Do you wish to accept?",
          isActive: true,
        })
        setOptionsEndpointId(notAcceptedEndpoints[0]?.id || "")
      }
    }
  }, [endpoints, profile])

  useEffect(() => {
    if (actionData && actionData.error) {
      setNotificationMessageProps({
        type: "error",
        title: "There was an error accepting your invite",
        description: "",
        isActive: true,
      })
    } else if (actionData && !actionData.error) {
      setNotificationMessageProps({
        type: "success",
        title: "You accepted the invite.",
        description: "",
        isActive: true,
      })
    }
  }, [actionData])

  return (
    <div className="pokt-apps-view">
      <section>
        <div style={{ width: "100%", marginBottom: "1em" }}>
          <Form method="post" style={{ width: "100%" }}>
            <NotificationMessage
              notificationMessage={notificationMessageProps}
              setNotificationMessage={setNotificationMessageProps}
            />
            <input
              readOnly
              name="appId"
              style={{ display: "none" }}
              value={optionsEndpointId}
            />
            <input
              readOnly
              name="email"
              style={{ display: "none" }}
              value={profile._json.email}
            />
          </Form>
        </div>

        <Card>
          <Tabs color="green">
            <Tabs.Tab label="My Applications">
              {endpoints && endpoints.owner.length > 0 ? (
                <Table
                  search
                  columns={["App", "Created", "Plan", ""]}
                  data={(endpoints.owner as ProcessedEndpoint[]).map((app) => ({
                    id: app.id,
                    app: {
                      value: app.name,
                      element: <Link to={app.id}>{app.name}</Link>,
                    },
                    created: dayjs(app.createdAt).format("MM/DD/YY"),
                    plan: getPlanName(app.appLimits.planType),
                    action: {
                      value: "",
                      element: (
                        <>
                          {app.users.map((user) =>
                            user.email === profile?._json?.email && user.accepted && (
                              <Link key={app.id} to={app.id}>
                                <IconCaretRight className="pokt-icon" />
                              </Link>
                            )
                          )}
                        </>
                      ),
                    },
                  }))}
                  paginate={
                    getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)
                      ? { perPage: 10 }
                      : undefined
                  }
                />
              ) : (
                <Card>
                  <div className="pokt-card-header">
                    <Title order={3}>Applications</Title>
                  </div>
                  <Text>
                    Get started by{" "}
                    <Link className="empty-apps-link" to="/dashboard/create">
                      creating your first application
                    </Link>
                    .
                  </Text>
                </Card>
              )}
            </Tabs.Tab>

            <Tabs.Tab label="Teams">
              {notOwnerEndpoints &&
              notOwnerEndpoints.length > 0 &&
              userDataByEndpoint.length > 0 ? (
                <Table
                  columns={["App", "Invite status", "Role", ""]}
                  data={(notOwnerEndpoints as ProcessedEndpoint[]).map((team, idx) => ({
                    id: team.id,
                    app: {
                      value: team.name,
                      element: <Link to={team.id.toString()}>{team.name}</Link>,
                    },
                    inviteStatus: {
                      value: userDataByEndpoint[idx]?.accepted ? "Accepted" : "Pending",
                      element: <StatusTag accepted={userDataByEndpoint[idx]!.accepted} />,
                    },
                    role: userDataByEndpoint[idx]!.roleName,
                    action: {
                      value: "More",
                      element: (
                        <div className="list__more-actions">
                          <Dropdown
                            contentClassName="dropdown-teams__content"
                            label={
                              <IconMoreVertical className="pokt-icon" fill="#A9E34B" />
                            }
                          >
                            {userDataByEndpoint[idx]?.accepted ? (
                              <DropdownItem action={() => {}} label="View App" />
                            ) : (
                              <DropdownItem action={() => {}} label="Accept Invite" />
                            )}
                            <DropdownItem
                              action={() => {}}
                              label="Leave App"
                              variant="green"
                            />
                          </Dropdown>
                        </div>
                      ),
                    },
                  }))}
                  paginate={
                    getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(userId)
                      ? { perPage: 10 }
                      : undefined
                  }
                />
              ) : null}
            </Tabs.Tab>
          </Tabs>
        </Card>
      </section>
      {dailyNetworkRelaysPerWeek && (
        <section>
          <UsageChartCard
            emptyLabel="Your applications do not have relay data yet."
            relays={dailyNetworkRelaysPerWeek}
            title="Total User Relay Counts"
          />
        </section>
      )}
      <Modal
        opened={showErrorModal}
        title="These are not the droids you are looking for."
        onClose={() => setShowErrorModal(false)}
      >
        <div>
          <p>Sorry, you do not have access to this appplication.</p>
        </div>
      </Modal>
    </div>
  )
}

export default AppsView
