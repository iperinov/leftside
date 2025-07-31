import { v4 as uuidv4 } from "uuid";
import type { FilterGroup } from "~/api/sccs/types.gen";
import { TemplateType } from "~/components/categories/TemplateType";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import type CategoryTreeItem from "../tree/CategoryTreeItem";
import AddNewCategoryDialog from "./AddNewCategoryDialog";

interface AddNewCategoryProps {
  parentUUID: string;
  level: number;
  onCanceled?: () => void;
  onCompleted?: () => void;
}

export default function AddNewCategory({ parentUUID, level, onCompleted, onCanceled }: AddNewCategoryProps) {
  const findCategory = useCategoryTreeStore((state) => state.findCategory);
  const addCategory = useCategoryTreeStore((state) => state.addCategory);
  const parent = findCategory(parentUUID);
  if (!parent || parent.type !== "nested") throw new Error(`Parent with ID ${parentUUID} not found or not nested type`);
  const siblings = parent.children || [];

  const onAddConfirmed = (name: string, type: TemplateType, sports: string[], leagues: string[], metaSport?: string, icon?: string) => {
    const baseCategory = {
      id: uuidv4(),
      name,
      type: "flat",
      iconID: icon,
    } as CategoryTreeItem;
    switch (type) {
      case TemplateType.Parent:
        addCategory(parentUUID, {
          ...baseCategory,
          type: "nested",
          iconID: icon,
          sportID: metaSport,
          children: [],
        });
        break;
      case TemplateType.Child:
        addCategory(parentUUID, {
          ...baseCategory,
          filterGroups: [
            {
              uuid: uuidv4(),
              filters: [{ type: "sport", value: sports }],
            } as FilterGroup,
          ],
        });
        break;
      case TemplateType.LiveAndUpcoming:
        addCategory(parentUUID, {
          ...baseCategory,
          filterGroups: [
            {
              uuid: uuidv4(),
              filters: [
                { type: "sport", value: sports },
                { type: "league", value: leagues },
              ],
              groupBy: ["day", "league"],
              order: "desc",
            } as FilterGroup,
          ],
        });
        break;
      case TemplateType.AllLeagues:
        addCategory(parentUUID, {
          ...baseCategory,
          filterGroups: [
            {
              uuid: uuidv4(),
              filters: [
                { type: "sport", value: sports },
                { type: "league", value: ["all"] },
              ],
              groupBy: ["league", "day"],
              order: "asc",
            } as FilterGroup,
          ],
        });
        break;
      default:
        throw new Error(`Unknown category type: ${type}`);
    }

    onCompleted?.();
  };

  return (
    <AddNewCategoryDialog
      level={level}
      open={true}
      templateType={level !== 2 ? TemplateType.Parent : TemplateType.Child}
      onConfirm={onAddConfirmed}
      onCancel={onCanceled}
      validName={(name) => name !== "" && !siblings.find((item) => item.name === name.trim())}
    />
  );
}
