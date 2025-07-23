import { Box, Text } from "@radix-ui/themes";
import type { FilterGroup, FiltersTypeInteger, FiltersTypeString, GroupType, OrderType, TimeString } from "~/api/sccs/types.gen";
import type { FilteredGameGroup, Game } from "~/api/ssm/ssm.types";
import { useContentFiltered } from "~/hooks/useContentFiltered";
import { isAllFilter } from "../categories/AllItemData";
import InfoBanner from "../shared/InfoBanner";
import LoadingIndicator from "../shared/LoadingIndicator";

interface ContentPreviewProps {
  filterGroups: FilterGroup[];
}

const getGroupKey = (game: Game, groupBy: GroupType): string[] => {
  const date = new Date(game.startTime).toLocaleDateString();
  const league = game.leagueName;
  const sport = game.realSportName;
  switch (groupBy) {
    case "leagueDay":
      return [league, date];
    case "dayLeague":
      return [date, league];
    case "sportLeague":
      return [sport, league];
    case "sportDay":
      return [sport, date];
    case "dayGame":
      return [date, game.gameUUID];
    default:
      return [league];
  }
};

function toHours(timeString: TimeString): number {
  switch (timeString) {
    case "1h":
      return 1;
    case "3h":
      return 3;
    case "6h":
      return 6;
    case "12h":
      return 12;
    case "1d":
      return 24;
    case "2d":
      return 48;
    case "3d":
      return 72;
  }
}

// Use for real-time notifications when it is implemented.
const matchesFilterGroup = (game: Game, filterGroup: FilterGroup): boolean => {
  return filterGroup.filters.every((filter) => {
    if (isAllFilter(filter)) return true;

    switch (filter.type) {
      case "sport":
        return (filter.value as FiltersTypeString).includes(game.realSportUUID);
      case "league":
        return (filter.value as FiltersTypeString).includes(game.leagueUUID);
      case "market":
        if (game.eventId === null || game.eventId === undefined) {
          return false;
        }
        return (filter.value as FiltersTypeInteger).includes(game.eventId);
      case "period":
        if (game.eventId !== null && game.eventId !== undefined) {
          return false;
        }
        return (filter.value as FiltersTypeInteger).includes(game.periodId);
      // case "region":
      //   return (filter.value as FiltersTypeString).includes(game.regionUUID);
      case "game":
        return (filter.value as FiltersTypeString).includes(game.gameUUID);
      case "status":
        return (filter.value as boolean) === game.liveGame;
      case "time": {
        const now = Date.now();
        const hours = toHours(filter.type as TimeString);
        return new Date(game.startTime).getTime() - now <= hours * 3600000;
      }
      default:
        return true;
    }
  });
};

const renderGroupLabel = (groupBy: GroupType, labelParts: string[]) => {
  switch (groupBy) {
    case "leagueDay":
    case "dayLeague":
    case "sportLeague":
    case "sportDay":
      return (
        <>
          <Box mb="2">
            <Text size="2" weight="bold">
              {labelParts[0]}
            </Text>
          </Box>
          <Box mb="2">
            <Text size="2" weight="bold">
              {labelParts[1]}
            </Text>
          </Box>
        </>
      );
    default:
      return null;
  }
};

const renderGameCard = (game: Game, showBanner: boolean) => (
  <Box key={game.idGame} mb="4">
    {showBanner && (
      <Box>
        <Text size="1" style={{ color: "var(--accent-11)" }}>
          {game.banners?.[0]?.description}
        </Text>
      </Box>
    )}
    <Box>
      <Text size="1" style={{ color: "var(--accent-11)" }}>
        {game.description}
      </Text>
    </Box>
    <Text size="1" style={{ color: "var(--accent-11)" }}>
      {new Date(game.startTime).toLocaleString("en-US", {
        dateStyle: "short",
        timeStyle: "short",
      })}
    </Text>
    <Box
      mt="2"
      style={{
        background: "var(--accent-4)",
        borderRadius: "var(--radius-2)",
        padding: "0.5rem",
      }}
    >
      {game.contenders.map((c) => (
        <Text key={c.id} size="2" style={{ display: "block" }}>
          {c.name}
        </Text>
      ))}
    </Box>
  </Box>
);

export default function ContentPreview({ filterGroups }: ContentPreviewProps) {
  console.log("ContentPreview", filterGroups);
  if (!filterGroups.length) {
    return (
      <Box style={{ flex: 1, padding: "0.75rem" }}>
        <InfoBanner description="Preview how the data selection looks on website" />
      </Box>
    );
  }

  const { data, isLoading } = useContentFiltered({ filterGroups });
  const groups = (data?.groups ?? []) as FilteredGameGroup[];

  if (isLoading) return <LoadingIndicator />;

  return (
    <Box style={{ flex: 1, overflowY: "auto", padding: "0.75rem" }}>
      {groups.map((group, index) => {
        const filterGroup = group.filterGroup;
        const groupBy = (filterGroup.groupBy ?? "league") as GroupType;
        const order = (filterGroup.order ?? "asc") as OrderType;
        const groupLimit = filterGroup.limit;

        // Use for real-time notifications when it is implemented.
        //const filteredGames = group.games.filter((game) => matchesFilterGroup(game, filterGroup));
        const filteredGames = group.games;
        const grouped = new Map<string, Game[]>();

        for (const game of filteredGames) {
          const groupLabel = getGroupKey(game, groupBy).join(" > ");
          if (!grouped.has(groupLabel)) grouped.set(groupLabel, []);
          grouped.get(groupLabel)?.push(game);
        }
        const key = `filterGroup-${index}`;
        return (
          <Box key={`filterGroup-${key}"}`} mb="6">
            {[...grouped.entries()].map(([groupLabel, groupedGames]) => {
              const sortedGames = [...groupedGames].sort((a, b) => {
                const aTime = new Date(a.startTime).getTime();
                const bTime = new Date(b.startTime).getTime();
                return order === "desc" ? bTime - aTime : aTime - bTime;
              });
              const displayGames = groupLimit != null ? sortedGames.slice(0, groupLimit) : sortedGames;
              const labelParts = groupLabel.split(" > ");

              return (
                <Box key={groupLabel} mb="5">
                  <Box mb="2">{renderGroupLabel(groupBy, labelParts)}</Box>
                  {displayGames.map((game) => renderGameCard(game, true))}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
