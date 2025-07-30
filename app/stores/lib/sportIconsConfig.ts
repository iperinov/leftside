import { getSportIconsConfig } from "~/api/general/getSportIconsConfig";

export class SportIconsConfig {
  constructor(config: Array<{ sport: string; iconName: string }>) {
    this.sportsToIcons = config;
    const iconSet = new Set<string>();
    config.map((item) => iconSet.add(item.iconName));
    this.availableIcons = Array.from(iconSet);
  }
  public readonly sportsToIcons: { sport: string; iconName: string }[];
  public readonly availableIcons: string[];
  public readonly genericIconName = "sportgeneric";

  getIconFor(sport: string): string | undefined {
    return this.sportsToIcons.find((item) => item.sport === sport)?.iconName;
  }
  getSportFor(iconName: string): string | undefined {
    return this.sportsToIcons.find((item) => item.iconName === iconName)?.sport;
  }
}

export let sportIconsConfig: SportIconsConfig | undefined = undefined;

export function loadSportIconsConfig() {
  getSportIconsConfig().then((config) => {
    sportIconsConfig = config;
  });
}
