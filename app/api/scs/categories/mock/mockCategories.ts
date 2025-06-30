import type { Category } from "../../configurations/config.types";

export const mockConfigurationCategories: Category[] = [
  {
    uuid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
    name: "Soccer",
    type: "nested",
    children: [
      {
        uuid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p7",
        name: "Europe",
        type: "nested",
        children: [
          {
            uuid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p9",
            name: "Premier League",
            type: "flat",
            filterGroups: [
              {
                uuid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p8",
                filters: [
                  { type: "sport", values: ["1"] },
                  { type: "league", values: ["1316AFDA-10DC-496E-AE40-E822D62319A9"] },
                //  { type: "region", values: ["3A38E6F6-BDAC-43A6-B334-F9A9461FFAF4"] },
                ],
                groupBy: "league.day",
                order: "asc",
                limit: 10,
              },
            ],
          },
          {
            uuid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p0",
            name: "Seria A",
            type: "flat",
            filterGroups: [
              {
                uuid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p1",
                filters: [
                  { type: "sport", values: ["1"] },
                  { type: "league", values: ["67F5C8E0-0890-408A-8652-1B19EB9F9AAB"] },
                //  { type: "region", values: ["3A38E6F6-BDAC-43A6-B334-F9A9461FFAF4"] },
                ],
                groupBy: "day.league",
                order: "asc",
                limit: 10,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    uuid: "445b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
    name: "Basketball",
    type: "nested",
    children: [
      {
        uuid: "445b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p7",
        name: "NBA",
        type: "flat",
        filterGroups: [
          {
            uuid: "445b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p8",
            filters: [
              { type: "sport", values: ["7"] },
              { type: "league", values: ["E1D88475-4FF6-41DC-BDA9-C65D16923F34"] },
            ],
            groupBy: "league.day",
            order: "asc",
            limit: 10,
          },
        ],
      },
    ],
  },
];
