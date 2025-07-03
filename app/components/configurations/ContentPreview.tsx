import { Box, Text } from "@radix-ui/themes";
import type { FilterGroup, Game } from "~/api/ssm/ssm.types";
import { GroupBy, Order } from "~/api/ssm/ssm.types";
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
    case GroupBy.Date:
      return [date];
    case GroupBy.LeagueDate:
      return [league, date];
    case GroupBy.DateLeague:
      return [date, league];
    case GroupBy.SportLeague:
      return [sport, league];
    case GroupBy.SportDate:
      return [sport, date];
    case GroupBy.DateGame:
      return [date, game.gameUUID];
    default:
      return [league];
  }
};

//TODO: Implement the rest of the filters.
const matchesFilterGroup = (game: Game, filterGroup: FilterGroup): boolean => {
  return filterGroup.filters.every((filter) => {
    switch (filter.type) {
      case "sport":
        return filter.value.includes(game.realSportUUID);
      // case "region":
      //   return filter.value.includes(game.regionUUID);
      case "league":
        return filter.value.includes(game.leagueUUID);
      case "game":
        return filter.value.includes(game.gameUUID);
      // case "period":
      //   return filter.value.includes(game.periodUUID);
      // case "market":
      //   return filter.value.includes(game.marketUUID);
      case "time":
        return filter.value.includes(game.startTime); // Or transform as needed
      // case "status":
      //   return filter.value.includes(game.status);
      default:
        return false;
    }
  });
};

const renderGroupLabel = (groupBy: GroupBy, labelParts: string[]) => {
  switch (groupBy) {
    case GroupBy.League:
    case GroupBy.Date:
      return (
        <>
          <Text size="2" weight="bold">
            {labelParts[0]}
          </Text>
        </>
      );
    case GroupBy.LeagueDate:
    case GroupBy.DateLeague:
    case GroupBy.SportLeague:
    case GroupBy.SportDate:
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
  const { data, isLoading } = useContentFiltered({ filterGroups });
  const games = (data?.games ?? []) as Game[];

  if (!filterGroups.length) {
    return (
      <Box style={{ flex: 1, padding: "0.75rem" }}>
        <InfoBanner description="Preview how the data selection looks on website" />
      </Box>
    );
  }

  if (isLoading) return <LoadingIndicator />;

  return (
    <Box style={{ flex: 1, overflowY: "auto", padding: "0.75rem" }}>
      {filterGroups.map((filterGroup) => {
        const groupBy = (filterGroup.groupBy ?? GroupBy.League) as GroupBy;
        const order = (filterGroup.order ?? Order.Asc) as Order;
        const groupLimit = filterGroup.limit;

        const filteredGames = games.filter((game) =>
          matchesFilterGroup(game, filterGroup),
        );
        const grouped = new Map<string, Game[]>();

        for (const game of filteredGames) {
          const groupLabel = getGroupKey(game, groupBy).join(" > ");
          if (!grouped.has(groupLabel)) grouped.set(groupLabel, []);
          grouped.get(groupLabel)?.push(game);
        }

        return (
          <Box key={`filterGroup-${groupBy}-${groupLimit ?? "all"}`} mb="6">
            {[...grouped.entries()].map(([groupLabel, groupedGames]) => {
              const sortedGames = [...groupedGames].sort((a, b) => {
                const aTime = new Date(a.startTime).getTime();
                const bTime = new Date(b.startTime).getTime();
                return order === Order.Desc ? bTime - aTime : aTime - bTime;
              });
              const displayGames =
                groupLimit != null
                  ? sortedGames.slice(0, groupLimit)
                  : sortedGames;
              const labelParts = groupLabel.split(" > ");

              return (
                <Box key={groupLabel} mb="5">
                  <Box mb="2">{renderGroupLabel(groupBy, labelParts)}</Box>
                  {displayGames.map((game) =>
                    renderGameCard(game, groupBy !== GroupBy.Date),
                  )}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
