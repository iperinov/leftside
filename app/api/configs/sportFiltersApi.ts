import { findItem, findItemSiblings } from "~/components/tree/common/findItem";
import iterateItem from "~/components/tree/common/iterateItem";
import type TreeItemData from "~/components/tree/common/TreeItemData";

let sportFiltersJSON = `[
    {
      "id": "Soccer",
      "name": "Soccer",
      "children": [
        {
          "id": "Soccer-Europe",
          "name": "Europe",
          "children": [
            {
              "id": "Soccer-Europe-SerieA",
              "name": "Serie A"
            },
            {
              "id": "Soccer-Europe-PrimeiraLiga",
              "name": "Primeira Liga"
            }
          ]
        },
        {
          "id": "Soccer-England",
          "name": "England",
          "children": [
            {
              "id": "Soccer-England-PremierLeague",
              "name": "Premier League"
            },
            {
              "id": "Soccer-England-Championship",
              "name": "Championship"
            }
          ]
        },
        {
          "id": "Soccer-Brazil",
          "name": "Brazil",
          "children": [
            {
              "id": "Soccer-Brazil-SerieA",
              "name": "Serie A"
            },
            {
              "id": "Soccer-Brazil-SerieB",
              "name": "Serie B"
            }
          ]
        },
        {
          "id": "Soccer-WorldCup",
          "name": "World Cup",
          "children": []
        }
      ]
    },
    {
      "id": "Basketball",
      "name": "Basketball",
      "children": [
        {
          "id": "Basketball-USA",
          "name": "USA",
          "children": [
            {
              "id": "Basketball-USA-NBA",
              "name": "NBA"
            },
            {
              "id": "Basketball-USA-WNBA",
              "name": "WNBA"
            }
          ]
        },
        {
          "id": "Basketball-Canada",
          "name": "Canada",
          "children": [
            {
              "id": "Basketball-Canada-OUA",
              "name": "OUA"
            },
            {
              "id": "Basketball-Canada-USports",
              "name": "U Sports"
            }
          ]
        }
      ]
    },
    {
      "id": "1 Halves",
      "name": "1 Halves"
    },
    {
      "id": "Others",
      "name": "Others",
      "children": [
        {
          "id": "Others-Cricket",
          "name": "Cricket",
          "children": [
            {
              "id": "Others-Cricket-IPL",
              "name": "IPL"
            },
            {
              "id": "Others-Cricket-WorldCup",
              "name": "World Cup"
            }
          ]
        },
        {
          "id": "Others-Rugby",
          "name": "Rugby",
          "children": [
            {
              "id": "Others-Rugby-WorldCup",
              "name": "Rugby World Cup"
            },
            {
              "id": "Others-Rugby-SixNations",
              "name": "Six Nations"
            }
          ]
        },
        {
          "id": "Others-Tennis",
          "name": "Tennis ATP",
          "children": []
        }
      ]
    }
  ]`;

export async function getSportFilters(): Promise<TreeItemData[]> {
  console.log("API call: Fetching list of sport filters");
  await new Promise((resolve) => (setTimeout(resolve, 1000)))
  const filters = JSON.parse(sportFiltersJSON);
  console.log("API response: ", filters);
  return filters;
}

interface AddSportFilterProps {
  name: string;
  parentID?: string; // Optional parent ID for sub-filters
}

export async function addSportFilter({name, parentID}: AddSportFilterProps): Promise<void> {
  console.log(`API call: Adding sport filter with Name: ${name}, Parent ID: ${parentID}`);

  await new Promise((resolve) => (setTimeout(resolve, 50000)))

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
  id: string;
  name: string;
}

export async function renameSportFilter({id, name}: RenameSportFilterProps): Promise<void> {
  console.log(`API call: Renaming sport filter with ID: ${id}, New Name: ${name}`);

  await new Promise((resolve) => (setTimeout(resolve, 5000)))

  let sportFilters = JSON.parse(sportFiltersJSON);
  let item = findItem(id, sportFilters);
  
  if (!item) {
    throw new Error(`Item with ID ${id} not found`);
  }
  
  item.name = name;
  sportFiltersJSON = JSON.stringify(sportFilters);
  return Promise.resolve();
}

interface DuplicateSportFilterProps {
  id: string;
  name: string;
  parentID?: string;
}

export async function duplicateSportFilter({id, name, parentID}: DuplicateSportFilterProps): Promise<void> {
  console.log(`API call: Duplicating sport filter with ID: ${id}, Name: ${name}, Parent ID: ${parentID}`);

  await new Promise((resolve) => (setTimeout(resolve, 5000)))

  let sportFilters = JSON.parse(sportFiltersJSON);
  const siblings = parentID ? findItem(parentID, sportFilters)?.children || sportFilters : sportFilters;
  const item = findItem(id, sportFilters);

  if (!item) {
    console.log(`Item with ID ${id} not found`);
    throw new Error(`Item with ID ${id} not found`);
  }

  const newItem = { ...structuredClone(item), name };
  iterateItem(newItem, (item) => {
    item.id = crypto.randomUUID(); 
  });
  siblings.push(newItem);

  sportFiltersJSON = JSON.stringify(sportFilters);
  return Promise.resolve();
}

interface DeleteSportFilterProps {
  id: string;
}

export async function deleteSportFilter({id}: DeleteSportFilterProps): Promise<void> {
  console.log(`API call: Deleting sport filter with ID: ${id}`);

  await new Promise((resolve) => (setTimeout(resolve, 5000)))

  let sportFilters = JSON.parse(sportFiltersJSON);
  const siblings = findItemSiblings(id, sportFilters);

  if (!siblings) {
    throw new Error(`Item with ID ${id} not found`);
  }

  const itemIndex = siblings.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    throw new Error(`Item with ID ${id} not found in siblings`);
  } 
  siblings.splice(itemIndex, 1);
  sportFiltersJSON = JSON.stringify(sportFilters);
  return Promise.resolve();
}