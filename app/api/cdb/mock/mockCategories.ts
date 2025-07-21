

export const mockConfigurationCategoriesJson = `{
  "total_rows": 1,
  "offset": 0,
  "rows": [
    {
      "id": "cfg-DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
      "key": "DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
      "value": {
        "_id": "cfg-DB9CAEBE-31C6-4116-9051-E1D7978BC3D7",
        "_rev": "20-6f99618836e0075523bf4636ad2a6a51",
        "type": "cfg",
        "categories": [
          {
            "children": [
              {
                "filterGroups": [
                  {
                    "filters": [
                      {
                        "type": "sport",
                        "value": [
                          "Basketball",
                          "Soccer"
                        ]
                      }
                    ],
                    "groupBy": "leagueDay",
                    "limit": 0,
                    "order": "asc",
                    "uuid": "EC79D274-793B-4A43-BEE1-C5C633453946"
                  }
                ],
                "name": "My Second Category",
                "type": "nested",
                "uuid": "67AE8E4B-5F7F-4710-9C37-5669BBB6F3A9"
              }
            ],
            "name": "My First Category",
            "type": "flat",
            "uuid": "48AF51AD-C6BC-4296-B1C4-F8F35C46C906"
          }
        ],
        "name": "Premier League Weekend Config",
        "uuid": "DB9CAEBE-31C6-4116-9051-E1D7978BC3D7"
      }
    }
  ]
}`;
