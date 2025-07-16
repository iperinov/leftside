import { Box, Button, Flex, Heading, Separator } from "@radix-ui/themes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigurationList } from "../components/configurations/ConfigurationList";
import { CreateConfiguration } from "../components/configurations/CreateConfiguration";
import { DeleteConfiguration } from "../components/configurations/DeleteConfiguration";
import { DuplicateConfiguration } from "../components/configurations/DuplicateConfiguration";
import { RenameConfiguration } from "../components/configurations/RenameConfiguration";

export default function ConfigurationsPage() {
  const navigate = useNavigate();
  const [createAction, setCreateAction] = useState(false);
  const [editAction, setEditAction] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [renameAction, setRenameAction] = useState<{
    id: string;
    rev: string;
    name: string;
  } | null>(null);
  const [duplicateAction, setDuplicateAction] = useState<{
    id: string;
    rev: string;
    name: string;
  } | null>(null);
  const [deleteAction, setDeleteAction] = useState<{
    id: string;
    rev: string;
    name: string;
  } | null>(null);

  return (
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
            onEdit={(id, name) => {
              navigate(`/configuration/${id}`, {
                state: {
                  id,
                  name,
                  edit: true,
                },
              });
            }}
            onRename={(id, rev, name) => setRenameAction({ id, rev, name })}
            onDuplicate={(id, rev, name) => setDuplicateAction({ id, rev, name })}
            onDelete={(id, rev, name) => setDeleteAction({ id, rev, name })}
          />
        </Box>

        <CreateConfiguration open={createAction} onClose={() => setCreateAction(false)} />

        {renameAction && <RenameConfiguration open={!!renameAction} onClose={() => setRenameAction(null)} uuid={renameAction.id} rev={renameAction.rev} />}

        {duplicateAction && (
          <DuplicateConfiguration
            open={!!duplicateAction}
            onClose={() => setDuplicateAction(null)}
            id={duplicateAction.id}
            rev={duplicateAction.rev}
            name={duplicateAction.name}
          />
        )}

        {deleteAction && (
          <DeleteConfiguration
            open={!!deleteAction}
            onClose={() => setDeleteAction(null)}
            id={deleteAction.id}
            rev={deleteAction.rev}
            name={deleteAction.name}
          />
        )}
      </Box>
    </Flex>
  );
}
