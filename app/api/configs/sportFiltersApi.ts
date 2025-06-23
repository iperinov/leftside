import { duplicateItem } from "~/common/duplicateItem";
import { findItem } from "~/common/findItem";
import type TreeItemData from "~/components/tree/TreeItemData";

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
          "name": "Tennis ATP"
        }
      ]
    }
  ]`;

export async function getListOfSportFilters(): Promise<TreeItemData[]> {
  console.log("API call: Fetching list of sport filters");
  await new Promise((resolve) => (setTimeout(resolve, 500)))
  return JSON.parse(sportFiltersJSON);
}

interface AddSportFilterProps {
  name: string;
  parentID?: string; // Optional parent ID for sub-filters
}

export async function addSportFilter({name, parentID}: AddSportFilterProps): Promise<void> {
  await new Promise((resolve) => (setTimeout(resolve, 500)))

  let sportFilters = JSON.parse(sportFiltersJSON)

  const newFilter = {name: name, id: crypto.randomUUID()};
  if (!parentID) {  // root filter
    sportFilters.push(newFilter);
  } else {          // sub-filter filter
    let parent = findItem<TreeItemData>(parentID, sportFilters)
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
  await new Promise((resolve) => (setTimeout(resolve, 500)))

  let sportFilters = JSON.parse(sportFiltersJSON);
  let item = findItem<TreeItemData>(id, sportFilters);
  
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
  console.log(`API call: Duplicating sport filter with ID: ${id}`);

  await new Promise((resolve) => (setTimeout(resolve, 500)))

  let sportFilters = JSON.parse(sportFiltersJSON);
  const siblings = parentID ? findItem<TreeItemData>(parentID, sportFilters)?.children || sportFilters : sportFilters;
  const item = findItem<TreeItemData>(id, sportFilters);
  
  if (!item) {
    throw new Error(`Item with ID ${id} not found`);
  }
  
  const newItem = duplicateItem<TreeItemData>(item, crypto.randomUUID);
  let nameExists = true;
  while (nameExists) {
    newItem.name = `${newItem.name} Copy`;
    nameExists = false;
    for (const item of siblings) {
      if (item.name === newItem.name) {
        nameExists = true;
        console.log(`Name ${newItem.name} already exists, generating a new name`);
      }
    }
  }
  siblings.push(newItem);

  sportFiltersJSON = JSON.stringify(sportFilters);

  console.log(`API call completed: Sport filter with ID: ${id} duplicated to ${newItem}`);

  return Promise.resolve();
}