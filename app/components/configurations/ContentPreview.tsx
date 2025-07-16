import { Box, Text } from "@radix-ui/themes";
import { GroupBy, Order } from "~/api/scs/configurations/config.consts";
import type { FilterGroup } from "~/api/scs/configurations/config.types";
import type { FilteredGameGroup, Game } from "~/api/ssm/ssm.types";
import { useContentFiltered } from "~/hooks/useContentFiltered";
import InfoBanner from "../shared/InfoBanner";
import LoadingIndicator from "../shared/LoadingIndicator";

interface ContentPreviewProps {
  filterGroups: FilterGroup[];
}

const getGroupKey = (game: Game, groupBy: GroupBy): string[] => {
  const date = new Date(game.startTime).toLocaleDateString();
  const league = game.leagueName;
  const sport = game.realSportName;
  switch (groupBy) {
    case GroupBy.League:
      return [league];
    case GroupBy.Day:
      return [date];
    case GroupBy.LeagueDay:
      return [league, date];
    case GroupBy.DayLeague:
      return [date, league];
    case GroupBy.SportLeague:
      return [sport, league];
    case GroupBy.SportDay:
      return [sport, date];
    case GroupBy.DayGame:
      return [date, game.gameUUID];
    default:
      return [league];
  }
};

// Use for real-time notifications when it is implemented.
const matchesFilterGroup = (game: Game, filterGroup: FilterGroup): boolean => {
  return filterGroup.filters.every((filter) => {
    const values = Array.isArray(filter.values) ? filter.values : [filter.values];
    switch (filter.type) {
      case "sport":
        return values.includes(game.realSportUUID);
      case "league":
        return values.includes(game.leagueUUID);
      case "market":
        if (game.eventId === null || game.eventId === undefined) {
          return false;
        }
        return values.includes(String(game.eventId));
      case "period":
        if (game.eventId !== null && game.eventId !== undefined) {
          return false;
        }
        return values.includes(String(game.periodId));
      // case "region":
      //   return values.includes(game.regionUUID);
      case "game":
        return values.includes(game.gameUUID);
      case "status":
        return values.includes(String(game.liveGame));
      case "time": {
        const now = Date.now();
        return values.some((v) => {
          const hours = Number.parseInt(v);
          if (Number.isNaN(hours)) return false;
          return new Date(game.startTime).getTime() - now <= hours * 3600000;
        });
      }
      default:
        return true;
    }
  });
};

const renderGroupLabel = (groupBy: GroupBy, labelParts: string[]) => {
  switch (groupBy) {
    case GroupBy.League:
    case GroupBy.Day:
      return (
        <Text size="2" weight="bold">
          {labelParts[0]}
        </Text>
      );
    case GroupBy.LeagueDay:
    case GroupBy.DayLeague:
    case GroupBy.SportLeague:
    case GroupBy.SportDay:
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
        const groupBy = (filterGroup.groupBy ?? GroupBy.League) as GroupBy;
        const order = (filterGroup.order ?? Order.Asc) as Order;
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
                return order === Order.Desc ? bTime - aTime : aTime - bTime;
              });
              const displayGames = groupLimit != null ? sortedGames.slice(0, groupLimit) : sortedGames;
              const labelParts = groupLabel.split(" > ");

              return (
                <Box key={groupLabel} mb="5">
                  <Box mb="2">{renderGroupLabel(groupBy, labelParts)}</Box>
                  {displayGames.map((game) => renderGameCard(game, groupBy !== GroupBy.Day))}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
