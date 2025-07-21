import { Box, Button, Flex, Heading, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigurationList } from "../components/configurations/ConfigurationList";
import { CreateConfiguration } from "../components/configurations/CreateConfiguration";
import { DeleteConfiguration } from "../components/configurations/DeleteConfiguration";
import { DuplicateConfiguration } from "../components/configurations/DuplicateConfiguration";
import { RenameConfiguration } from "../components/configurations/RenameConfiguration";

export default function ConfigurationsPage() {
  const navigate = useNavigate();
  const [createAction, setCreateAction] = useState(false);
  const [renameAction, setRenameAction] = useState<{ id: string, _rev: string, name: string }>();
  const [duplicateAction, setDuplicateAction] = useState<{ id: string, name: string }>();
  const [deleteAction, setDeleteAction] = useState<{ id: string, _rev: string, name: string }>();

  return (
    <>
      <Flex p="2" flexGrow="1">
        <Box
          flexGrow="1"
          style={{
            backgroundColor: "var(--accent-3)",
            borderTopLeftRadius: "var(--radius-3)",
            borderTopRightRadius: "var(--radius-3)",
            borderBottomRightRadius: "var(--radius-3)",
          }}
        >
          <Box
            style={{
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <Flex justify="between" align="center" mb="4">
              <Heading as="h1" size="4" style={{ color: "var(--accent-11)" }}>
                Configurations
              </Heading>
              <Button
                variant="surface"
                onClick={() => setCreateAction(true)}
                style={{
                  border: "1px solid var(--accent-7)",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--accent-1)",
                  cursor: "pointer",
                }}
              >
                New Configuration
              </Button>
            </Flex>

            <Separator size="4" my="3" />

            <ConfigurationList
              onEdit={(id, name) => navigate(`/configuration/${id}`, { state: { id, edit: true } })}
              onRename={(id, rev, name) => setRenameAction({ id, _rev: rev, name })}
              onDuplicate={(id, rev, name) => setDuplicateAction({ id, name })}
              onDelete={(id, rev, name) => setDeleteAction({ id, _rev: rev, name })}
            />
          </Box>
        </Box>
      </Flex>

      {createAction && <CreateConfiguration onClose={() => setCreateAction(false)} />}
      {renameAction && <RenameConfiguration onClose={() => setRenameAction(undefined)} {...renameAction} />}
      {duplicateAction && <DuplicateConfiguration onClose={() => setDuplicateAction(undefined)} {...duplicateAction} />}
      {deleteAction && <DeleteConfiguration onClose={() => setDeleteAction(undefined)} {...deleteAction} />}
    </>
  );
}
