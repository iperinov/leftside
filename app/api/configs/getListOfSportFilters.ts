import type TreeItemData from "~/components/tree/TreeItemData";

let sportFilters = [
    {
      id: "1",
      name: "Soccer",
      children: [
        {
          id: "1a",
          name: "Europe",
          children: [
            {
              id: "1a1",
              name: "Serie A",
            },
            {
              id: "1a2",
              name: "Primeira Liga",
            },
          ],
        },
        {
          id: "1b",
          name: "England",
          children: [
            {
              id: "1b1",
              name: "Premier League",
            },
            {
              id: "1b2",
              name: "Championship",
            },
          ],
        },
        {
          id: "1d",
          name: "Brazil",
          children: [
            {
              id: "1d1",
              name: "Serie A",
            },
            {
              id: "1d2",
              name: "Serie B",
            },
          ],
        },
        {
          id: "1c",
          name: "World Cup",
          children: [],
        },
      ],
    },
    {
      id: "2",
      name: "Basketball",
      children: [
        {
          id: "2a",
          name: "USA",
          children: [
            {
              id: "2a1",
              name: "NBA",
            },
            {
              id: "2a2",
              name: "WNBA",
            },
          ],
        },
        {
          id: "2b",
          name: "Canada",
          children: [
            {
              id: "2b1",
              name: "OUA",
            },
            {
              id: "2b2",
              name: "U Sports",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "1 Halves",
    },
    {
      id: "4",
      name: "Others asd asd asd asd asd asd asdasd asd asd asd asd asd ",
      children: [
        {
          id: "4a",
          name: "Cricket",
          children: [
            {
              id: "4a1",
              name: "IPL",
            },
            {
              id: "4a2",
              name: "World Cup asdasdasdasda sdadasdasdadsasdsa",
            },
          ],
        },
        {
          id: "4b",
          name: "Rugby",
          children: [
            {
              id: "4b1",
              name: "Rugby World Cup",
            },
            {
              id: "4b2",
              name: "Six Nations",
            },
          ],
        },
        {
          id: "4c",
          name: "Tennis ATP",
        },
      ],
    },
  ];

export default function getListOfSportFilters(): TreeItemData[] {
  return sportFilters;
}
