import { getSportIconsConfig } from "~/api/general/getSportIconsConfig";

export class SportIconsConfig {
    constructor(config: {sport: string; iconName: string}[]) {
        this.sportsToIcons = [];
        this.availableIcons = [];

        config.forEach((item) => {
            this.sportsToIcons.push({ sport: item.sport, iconName: item.iconName });
            this.availableIcons.push(item.iconName);
        });
    }
    public readonly sportsToIcons: {sport: string; iconName: string}[];
    public readonly availableIcons: string[];

    getIconFor(sport: string): string {
        const icon = this.sportsToIcons.find((item) => item.sport === sport);
        return icon ? icon.iconName : "sportgeneric";
    }
};

export let sportIconsConfig: SportIconsConfig | undefined = undefined;

export function loadSportIconsConfig() {
    getSportIconsConfig().then((config) => sportIconsConfig = config);
}
