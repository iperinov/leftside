export const mockConfigurationsJson: string = `{
  "total_rows": 2,
  "offset": 0,
  "rows": [
    {
      "id": "cfg-DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
      "key": "DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
      "value": {
        "_id": "cfg-DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
        "_rev": "22-d2d158e3ba04584ce97ed199db94805e",
        "type": "cfg",
        "lmt": "2025-05-07T10:42:00Z",
        "lmu": "ivo@plannatech.com",
        "categories": [
          {
            "uuid": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
            "name": "Soccer",
            "type": "nested",
            "children": [
              {
                "uuid": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p7",
                "name": "Europe",
                "type": "nested",
                "children": [
                  {
                    "uuid": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p9",
                    "name": "Premier League",
                    "type": "flat",
                    "filterGroups": [
                      {
                        "uuid": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p8",
                        "filters": [
                          {
                            "type": "sport",
                            "value": [
                              "414E274C-CC37-459A-86A7-B1A68C5E8CAD"
                            ]
                          },
                          {
                            "type": "league",
                            "value": [
                              "1316AFDA-10DC-496E-AE40-E822D62319A9"
                            ]
                          }
                        ],
                        "groupBy": "league.day",
                        "order": "asc",
                        "limit": 10
                      }
                    ]
                  },
                  {
                    "uuid": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p0",
                    "name": "Seria A",
                    "type": "flat",
                    "filterGroups": [
                      {
                        "uuid": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p1",
                        "filters": [
                          {
                            "type": "sport",
                            "value": [
                              "414E274C-CC37-459A-86A7-B1A68C5E8CAD"
                            ]
                          },
                          {
                            "type": "league",
                            "value": [
                              "67F5C8E0-0890-408A-8652-1B19EB9F9AAB"
                            ]
                          }
                        ],
                        "groupBy": "day.league",
                        "order": "asc",
                        "limit": 10
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "uuid": "445b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
            "name": "Basketball",
            "type": "nested",
            "children": [
              {
                "uuid": "445b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p7",
                "name": "NBA",
                "type": "flat",
                "filterGroups": [
                  {
                    "uuid": "445b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p8",
                    "filters": [
                      {
                        "type": "sport",
                        "values": [
                          "1FF9C505-A137-4F8B-873E-59ABB38B3FAF"
                        ]
                      },
                      {
                        "type": "league",
                        "values": [
                          "E1D88475-4FF6-41DC-BDA9-C65D16923F34"
                        ]
                      }
                    ],
                    "groupBy": "league.day",
                    "order": "asc",
                    "limit": 10
                  }
                ]
              }
            ]
          }
        ],
        "name": "Premier League Weekend Config",
        "uuid": "DB9CAEBE-31C6-4116-9051-E1D7978BC3D7"
      }
    }
  ]
}`;
