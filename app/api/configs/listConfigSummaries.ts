

export interface ConfigSummary {
    id: string
    name: string
    lmu: string
    lmt: number
    books: string[]
}

// TODO remove
let configSummaries = [
   {
      id: "eacd3b8e-4e01-4de1-9531-b21737006689",
      name: "General",
      lmu: "abjorn",
      lmt: 1748450030,
      books: ["TVG", "BookMaker"]
   },
   {
      id: "9bd60c2f-9f00-4d44-bc36-b45ea26a5ed6",
      name: "PrimeSports",
      lmu: "pnaggy",
      lmt: 1748450030,
      books: ["PrimeSports"]
   }
]

export default async function fetchConfigSummaries(): Promise<ConfigSummary[]> {
   // TODO implement with real endpoint
   await new Promise((resolve) => (setTimeout(resolve, 500)))
   return configSummaries
}