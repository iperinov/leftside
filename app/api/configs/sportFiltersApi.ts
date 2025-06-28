import { findItem, findItemSiblings } from "~/components/tree/common/findItem";
import iterateItem from "~/components/tree/common/iterateItem";
import type TreeItemData from "~/components/tree/TreeItemData";
import type { Category } from "../scs/configurations/config.types";

interface AddSportFilterProps {
  name: string;
  parentID?: string; // Optional parent ID for sub-filters
}

export async function addCategory({name, parentID}: AddSportFilterProps): Promise<void> {
  console.log(`API call: Adding sport filter with Name: ${name}, Parent ID: ${parentID}`);

  await new Promise((resolve) => (setTimeout(resolve, 1000)))

  let sportFilters = JSON.parse(sportFiltersJSON)

  const newFilter = {name: name, id: crypto.randomUUID()};
  if (!parentID) {  // root filter
    sportFilters.push({ newFilter, children: [] });
  } else {          // sub-filter filter
    let parent = findItem(parentID, sportFilters)
    if (!parent) {
      throw new Error(`Parent with ID ${parentID} not found`);
    }
    parent.children ? parent.children.push(newFilter) : parent.children = [newFilter];
  }
  sportFiltersJSON = JSON.stringify(sportFilters); 

  return Promise.resolve();
}

interface RenameSportFilterProps {
  uuid: string;
  name: string;
}

export async function renameCategory({uuid, name}: RenameSportFilterProps): Promise<void> {
  console.log(`API call: Renaming sport filter with ID: ${uuid}, New Name: ${name}`);

  await new Promise((resolve) => (setTimeout(resolve, 5000)))

  let sportFilters = JSON.parse(sportFiltersJSON);
  let item = findItem(uuid, sportFilters);
  
  if (!item) {
    throw new Error(`Item with ID ${uuid} not found`);
  }
  
  item.name = name;
  sportFiltersJSON = JSON.stringify(sportFilters);
  return Promise.resolve();
}

interface DuplicateSportFilterProps {
  uuid: string;
  name: string;
  parentUUID?: string;
}

export async function duplicateCategory({uuid, name, parentUUID}: DuplicateSportFilterProps): Promise<void> {
  console.log(`API call: Duplicating sport filter with ID: ${uuid}, Name: ${name}, Parent ID: ${parentUUID}`);

  await new Promise((resolve) => (setTimeout(resolve, 5000)))

  let categieies = JSON.parse(sportFiltersJSON);
  const siblings = parentUUID ? findItem<Category>(parentUUID, categieies)?.children || categieies : categieies;
  const item = findItem<Category>(uuid, categieies);

  if (!item) {
    console.log(`Item with ID ${uuid} not found`);
    throw new Error(`Item with ID ${uuid} not found`);
  }

  const newItem = { ...structuredClone(item), name };
  iterateItem(newItem, (item) => {
    item.uuid = crypto.randomUUID(); 
  });
  siblings.push(newItem);

  sportFiltersJSON = JSON.stringify(categieies);
  return Promise.resolve();
}

interface DeleteSportFilterProps {
  uuid: string;
}

export async function deleteCategory({uuid}: DeleteSportFilterProps): Promise<void> {
  console.log(`API call: Deleting sport filter with ID: ${uuid}`);

  await new Promise((resolve) => (setTimeout(resolve, 5000)))

  let sportFilters = JSON.parse(sportFiltersJSON);
  const siblings = findItemSiblings(uuid, sportFilters);

  if (!siblings) {
    throw new Error(`Item with ID ${uuid} not found`);
  }

  const itemIndex = siblings.findIndex(item => item.uuid === uuid);
  if (itemIndex === -1) {
    throw new Error(`Item with ID ${uuid} not found in siblings`);
  } 
  siblings.splice(itemIndex, 1);
  sportFiltersJSON = JSON.stringify(sportFilters);
  return Promise.resolve();
}