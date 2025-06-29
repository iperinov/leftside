import { findItem, findItemParent, findItemSiblings } from "../tree/common/findItem";
import { TemplateType } from "~/components/categories/TemplateType";
import type CategoryTreeItem from "./CategoryTreeItem";
import { useCategoryTreeStore } from "~/stores/categoryTreeStore";
import AddNewCategoryDialog from "./AddNewCategoryDialog";

interface AddNewCategoryProps {
  parentID: string;
  level: number;
  onCanceled?: () => void;
  onCompleted?: () => void;
}

export default function AddNewCategory({ parentID, level, onCompleted, onCanceled }: AddNewCategoryProps) {
  const rootCategory = useCategoryTreeStore((state) => state.rootCategory);
  const addCategory = useCategoryTreeStore((state) => state.addCategory);
  const parent = findItem(parentID, rootCategory);
  if (!parent || parent.type !== "nested") throw new Error(`Parent with ID ${parentID} not found or not nested type`);
  const siblings = parent.children || [];

  const onAddConfirmed = (name: string, type: TemplateType, sports: string[], leagues: string[]) => {
    console.log("AddNewCategory: ", parentID, level, name, type, sports, leagues);

    const baseCategory = { id: crypto.randomUUID(), name, type: "flat"} as CategoryTreeItem;
    switch (type) {
      case TemplateType.Parent:
        addCategory(parentID, { ...baseCategory, type: "nested", children: [] });
        break;
      case TemplateType.Child:
        addCategory(parentID, { ...baseCategory, "filter-groups": [] });
        break;
      case TemplateType.LiveAndUpcoming:
        addCategory(parentID, {
          ...baseCategory,
          "filter-groups": [
            {
              filters: [
                { type: "sport", values: sports },
                { type: "league", values: leagues },
              ],
            },
          ],
        });
        break;
      case TemplateType.AllLeagues:
        addCategory(parentID, {
          ...baseCategory,
          "filter-groups": [
            {
              filters: [
                { type: "sport", values: sports },
                { type: "league", values: ["All"] },
              ],
            },
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
      onConfirm={onAddConfirmed}
      onCancel={onCanceled}
      validName={(name) => siblings.find((item) => item.name === name) === undefined}
    />
  );
}
