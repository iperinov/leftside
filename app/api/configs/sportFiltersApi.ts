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
  await new Promise((resolve) => (setTimeout(resolve, 500)))
  return JSON.parse(sportFiltersJSON);
}

function findItem(id: string, subtree: TreeItemData[]): TreeItemData | undefined {
  for (const item of subtree) {
    if (item.id === id) {
      return item;
    }
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const found = findItem(id, item.children);
    if (found) {
      return found;
    }
  }

  return undefined;
}

interface AddSportFilterProps {
  newFilter: TreeItemData;
  parentID?: string; // Optional parent ID for sub-filters
}

export async function addSportFilter({newFilter, parentID}: AddSportFilterProps): Promise<void> {
  await new Promise((resolve) => (setTimeout(resolve, 500)))

  let sportFilters = JSON.parse(sportFiltersJSON)

  if (!parentID) {  // root filter
    sportFilters.push(newFilter);
  } else {          // sub-filter filter
    let parent = findItem(parentID, sportFilters)
    if (!parent) {
      throw new Error(`Parent with ID ${parentID} not found`);
    }
    parent.children ? parent.children.push(newFilter) : parent.children = [newFilter];
  }
  sportFiltersJSON = JSON.stringify(sportFilters); 
}