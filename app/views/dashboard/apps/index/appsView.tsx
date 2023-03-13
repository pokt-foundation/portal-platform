import { Grid, Tabs } from "@mantine/core"
import {
  IconCaretRight,
  Title,
  Text,
  IconMoreVertical,
  Box,
  Button,
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
import ErrorIcon from "~/components/shared/Icons/ErrorIcon"
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
  const notOwnerEndpoints = endpoints
    ? [...endpoints.admin, ...endpoints.member, ...endpoints.pending]
    : []
  const userDataByEndpoint = notOwnerEndpoints.map((endpoint) =>
    endpoint?.users.find((u) => u.email === uEmail),
  )

  const [notificationMessageProps, setNotificationMessageProps] =
    useState<NotificationMessageType>({
      type: "info",
      title: "",
      description: "",
      isActive: false,
    })
  const [optionsEndpointId, setOptionsEndpointId] = useState<string>("")
  const [isDeleteModalOptions, setIsDeleteModalOptions] = useState({
    title: "Do you want to leave this app?",
    description: "You will completely lose access to the current application.",
    error: false,
    isOpen: false,
  })
  const [appTodeleteID, setAppToDeleteID] = useState("")
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
    if (
      endpoints &&
      endpoints.pending.length > 0
    ) {
      setNotificationMessageProps({
        type: "options",
        title: `You have been invited to ${endpoints.pending[0]?.name}`,
        description: "Do you wish to accept?",
        isActive: true,
      })
      setOptionsEndpointId(endpoints.pending[0]?.id || "")
    }
  }, [endpoints])

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        if (actionData.type === "leaveApp") {
          setIsDeleteModalOptions((prevOptions) => ({
            ...prevOptions,
            isOpen: true,
            description: "Please, try again",
            title: "Error leaving app",
          }))
          return
        }
        setNotificationMessageProps({
          type: "error",
          title: "There was an error accepting your invite",
          description: "",
          isActive: true,
        })
      } else if (!actionData.error) {
        if (actionData.type === "leaveApp") {
          setIsDeleteModalOptions((prevOptions) => ({
            ...prevOptions,
            isOpen: false,
            title: "Do you want to leave this app?",
            description: "You will completely lose access to the current application.",
          }))
          return
        }
        setNotificationMessageProps({
          type: "success",
          title: "You accepted the invite.",
          description: "",
          isActive: true,
        })
      }
    }
  }, [actionData])

  return (
    <div className="pokt-apps-view">
      {notificationMessageProps.isActive && (
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
        </section>
      )}
      <section>
        <Card>
          <Tabs color="green">
            <Tabs.Tab label="My Applications">
              {endpoints && endpoints.owner.length > 0 ? (
                <Table
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
                          {app.users.map(
                            (user) =>
                              user.email === profile?._json?.email &&
                              user?.accepted && (
                                <Box key={app.id} sx={{ textAlign: "right" }}>
                                  <Link to={app.id}>
                                    <IconCaretRight className="pokt-icon" />
                                  </Link>
                                </Box>
                              ),
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
                      element: (
                        <StatusTag
                          accepted={Boolean(userDataByEndpoint[idx]?.accepted)}
                        />
                      ),
                    },
                    role: {
                      value: userDataByEndpoint[idx]?.roleName ?? "",
                      element: (
                        <Text
                          sx={{
                            fontSize: "inherit",
                            textTransform: "lowercase",
                            "&:first-letter": { textTransform: "uppercase" },
                          }}
                        >
                          {userDataByEndpoint[idx]?.roleName ?? ""}
                        </Text>
                      ),
                    },
                    action: {
                      value: "More",
                      element: (
                        <Box
                          className="list__more-actions"
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Dropdown
                            contentClassName="dropdown-teams__content"
                            label={
                              <IconMoreVertical
                                className="pokt-icon"
                                fill="var(--color-primary-main)"
                              />
                            }
                          >
                            {userDataByEndpoint[idx]?.accepted ? (
                              <Link to={team.id.toString()}>
                                <DropdownItem action={() => {}} label="View App" />
                              </Link>
                            ) : (
                              <Form
                                className="apps-dropdown-accept-invite-form"
                                method="post"
                              >
                                <DropdownItem
                                  action={() => {}}
                                  label="Accept Invite"
                                  type="submit"
                                />
                                <input name="type" type="hidden" value="accept" />
                                <input name="email" type="hidden" value={uEmail} />
                                <input name="appId" type="hidden" value={team.id} />
                              </Form>
                            )}
                            <DropdownItem
                              action={() => {
                                setAppToDeleteID(team.id)
                                setIsDeleteModalOptions((prevOptions) => ({
                                  ...prevOptions,
                                  isOpen: true,
                                }))
                              }}
                              label="Leave Team"
                              variant="green"
                            />
                          </Dropdown>
                        </Box>
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

      <Modal
        opened={isDeleteModalOptions.isOpen}
        padding={20}
        title="Deleting an user"
        onClose={() => {
          setAppToDeleteID("")
          setIsDeleteModalOptions((prevOptions) => ({ ...prevOptions, isOpen: false }))
        }}
      >
        <Form method="post">
          <div>
            {isDeleteModalOptions.error && (
              <Grid mb="1.6em">
                <ErrorIcon />
              </Grid>
            )}
            <Text mb="1.6em" weight={700}>
              {isDeleteModalOptions.title}
            </Text>
            <Text className="confirmation-modal-description" mb="1.6em" weight={400}>
              {isDeleteModalOptions.description}
            </Text>
            <input name="email" type="hidden" value={uEmail} />
            <input name="appId" type="hidden" value={appTodeleteID} />

            <div className="confirmation-modal-options">
              <Button
                id="cancel"
                mr="1em"
                variant="outline"
                onClick={() =>
                  setIsDeleteModalOptions((prevOptions) => ({
                    ...prevOptions,
                    isOpen: false,
                  }))
                }
              >
                Cancel
              </Button>
              <Button
                color="red"
                name="type"
                type="submit"
                value="leaveApp"
                variant="filled"
              >
                {isDeleteModalOptions.error ? "Try again" : "Leave"}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AppsView
