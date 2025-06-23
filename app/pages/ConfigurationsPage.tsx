import LoadDataDecorator from "~/components/loading/LoadDataDecorator";
import ConfigList from "~/components/configList/ConfigList";
import ConfigListHeader from "~/components/configList/ConfigListHeader";
import useConfiguration from "~/hooks/useConfigurations";
import { useState, type ReactNode } from "react";
import { Navigate } from "react-router";
import DialogRenameConfig from "~/components/configList/dialogs/DialogRenameConfig";
import type { MenuItem } from "~/components/dropdownContextMenu/DropdownContextMenu";

const operations = {
  create: "Create",
  edit: "Edit",
  rename: "Rename",
  duplicate: "Duplicate",
  delete: "Delete",
};

interface ContextMenuOperation {
  operation: string;
  id: string;
}

function renderCreateDialog(onClose: () => void): ReactNode {
  return  <DialogRenameConfig currentName="" onClose={(newName: string) => onClose() } />
}

function renderRenameDialog(id: string, onClose: () => void): ReactNode {
  return <></>;
}

function renderDuplicateDialog(id: string, onClose: () => void): ReactNode {
  return <></>;
}

function renderDeleteDialog(id: string, onClose: () => void): ReactNode {
  return <></>;
}

function renderDialog({ operation, id, onClose }: { operation: string; id: string; onClose: () => void }): ReactNode {
  switch (operation) {
    case operations.create:
      return renderCreateDialog(onClose);
    case operations.edit:
      return <Navigate to={`/configurations/${id}`} replace />;
    case operations.rename:
      return renderRenameDialog(id, onClose);
    case operations.duplicate:
      return renderDuplicateDialog(id, onClose);
    case operations.delete:
      return renderDeleteDialog(id, onClose);
    default:
      throw new Error(`Invalid operation: ${operation} requested for ${id}`);
  }
}

interface ContextMenuItem {
  text: string;
  action: () => void;
} 

function generateContextMenuItem(
  operation: string,
  setContextMenuOp: React.Dispatch<React.SetStateAction<ContextMenuOperation | null>>,
): MenuItem {
  return {
    name: operation,
    action: (context?: string) => setContextMenuOp({ operation: operation, id: context || "" }),
  };
}

export default function ConfigurationsPage() {
  const { data, error, isLoading } = useConfiguration();
  const [contextMenuOp, setContextMenuOp] = useState<ContextMenuOperation | null>(null);
  const configs = data || [];

  const contextMenuItems = [
    generateContextMenuItem(operations.edit, setContextMenuOp),
    generateContextMenuItem(operations.rename, setContextMenuOp),
    generateContextMenuItem(operations.duplicate, setContextMenuOp),
    generateContextMenuItem(operations.delete, setContextMenuOp),
  ];

  return (
    <>
      <div className="flex flex-col bg-stone-100 m-3 rounded-md border border-stone-300 text-stone-500 h-screen">
        <ConfigListHeader createNewConfig={() => setContextMenuOp({ operation: operations.create, id: "" })} />
        <LoadDataDecorator error={error} isLoading={isLoading}>
          <ConfigList configs={configs} contextMenuItems={contextMenuItems} />
        </LoadDataDecorator>
      </div>

      {!!contextMenuOp?.operation && renderDialog({ ...contextMenuOp!, onClose: () => setContextMenuOp(null) })}
    </>
  );
}
