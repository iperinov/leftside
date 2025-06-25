import { type Sport } from "~/common/sport";

const sportCatalogJSON = ` [
  {
    "id": "Football",
    "name": "Football",
    "leagues": [
      {
        "id": "Premier League",
        "name": "Premier League"
      },
      {
        "id": "La Liga",
        "name": "La Liga"
      },
      {
        "id": "Bundesliga",
        "name": "Bundesliga"
      },
      {
        "id": "Serie A",
        "name": "Serie A"
      },
      {
        "id": "Ligue 1",
        "name": "Ligue 1"
      }
    ]
  },
  {
    "id": "Basketball",
    "name": "Basketball",
    "leagues": [
      {
        "id": "NBA",
        "name": "NBA"
      },
      {
        "id": "EuroLeague",
        "name": "EuroLeague"
      },
      {
        "id": "NBL",
        "name": "NBL"
      },
      {
        "id": "WNBA",
        "name": "WNBA"
      }
    ]
  },
  {
    "id": "Soccer",
    "name": "Tennis",
    "leagues": [
      {
        "id": "ATP Tour",
        "name": "ATP Tour"
      },
      {
        "id": "WTA Tour",
        "name": "WTA Tour"
      },
      {
        "id": "Grand Slam",
        "name": "Grand Slam"
      }
    ]
  },
  {
    "id": "Tennis",
    "name": "Tennis",
    "leagues": [
      {
        "id": "MLB",
        "name": "MLB"
      },
      {
        "id": "Nippon Professional Baseball",
        "name": "Nippon Professional Baseball"
      }
    ]
  },
  {
    "id": "Hockey",
    "name": "Hockey",
    "leagues": [
      {
        "id": "NHL",
        "name": "NHL"
      },
      {
        "id": "KHL",
        "name": "KHL"
      }
    ]
  },
  {
    "id": "Golf",
    "name": "Golf",
    "leagues": [
      {
        "id": "PGA Tour",
        "name": "PGA Tour"
      },
      {
        "id": "European Tour",
        "name": "European Tour"
      }
    ]
  },
  {
    "id": "Cricket",
    "name": "Cricket",
    "leagues": [
      {
        "id": "IPL",
        "name": "IPL"
      },
      {
        "id": "Big Bash League",
        "name": "Big Bash League"
      }
    ]
  },
  {
    "id": "Rugby",
    "name": "Rugby",
    "leagues": [
      {
        "id": "Super Rugby",
        "name": "Super Rugby"
      },
      {
        "id": "Six Nations",
        "name": "Six Nations"
      }
    ]
  },
  {
    "id": "Baseball",
    "name": "MMA",
    "leagues": [
      {
        "id": "UFC",
        "name": "UFC"
      }
    ]
  }
]`;

export async function getSportsCatalog(): Promise<Sport[]> {
  await new Promise((resolve) => setTimeout(resolve, 500)); 
  return JSON.parse(sportCatalogJSON);
}
