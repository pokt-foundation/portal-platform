import { closeAllModals } from "@mantine/modals"
import { Button, Group, Menu, Text, TextInput } from "@pokt-foundation/pocket-blocks"
import { Form } from "@remix-run/react"
import { useState } from "react"
import { LuTrash2 } from "react-icons/lu"
import useModals from "~/hooks/useModals"
import { ProcessedEndpoint } from "~/models/portal/sdk"

type DeleteApplicationProps = {
  endpoint: ProcessedEndpoint
}

const DeleteAppForm = ({ appId }: { appId: string }) => {
  const [deleteTextInputValue, setDeleteTextInputValue] = useState("")

  return (
    <Form action={`/api/${appId}/remove`} method="post">
      <Text size="sm">
        Please type ‘Delete’ to proceed. This will delete your application and all the
        data related.
      </Text>
      <TextInput
        mt="md"
        name="delete-input"
        onChange={(e) => setDeleteTextInputValue(e.target.value)}
      />
      <Group grow mt={32}>
        <Button
          id="cancel"
          type="button"
          variant="default"
          onClick={() => closeAllModals()}
        >
          Cancel
        </Button>
        <Button
          color="red"
          disabled={deleteTextInputValue.toLowerCase() !== "delete"}
          type="submit"
          onClick={() => closeAllModals()}
        >
          Delete
        </Button>
      </Group>
    </Form>
  )
}

const DeleteApplication = ({ endpoint }: DeleteApplicationProps) => {
  const { id: appId } = endpoint
  const { openContentModal } = useModals()

  const openDeleteModal = () => {
    openContentModal({
      title: <Text fw={600}>Delete application?</Text>,
      children: <DeleteAppForm appId={appId} />,
    })
  }

  return (
    <Menu.Item icon={<LuTrash2 size={18} />} onClick={openDeleteModal}>
      Delete application
    </Menu.Item>
  )
}

export default DeleteApplication