import { Box, Text } from "@radix-ui/themes";
import type { FilterGroup } from "~/api/ssm/ssm.types";
import { useContentFiltered } from "~/hooks/useContentFiltered";
import InfoBanner from "../shared/InfoBanner";
import LoadingIndicator from "../shared/LoadingIndicator";

interface ContentPreviewProps {
  filterGroups: FilterGroup[];
}

export default function ContentPreview({ filterGroups }: ContentPreviewProps) {
  const { data, isLoading } = useContentFiltered({ filterGroups });
  const games = data?.games ?? [];

  if (filterGroups === null || filterGroups.length === 0) {
    return (
      <Box style={{ flex: 1, padding: "0.75rem" }}>
        <InfoBanner description="Preview how the data selection looks on website" />
      </Box>
    );
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const filterGroup = filterGroups[0];
  const league = filterGroup.filters[0].value;

  const groupedByLeague = games.reduce(
    (acc, game) => {
      if (league === game.leagueName) {
        if (!acc[game.leagueName]) acc[game.leagueName] = [];
        acc[game.leagueName].push(game);
      }
      return acc;
    },
    {} as Record<string, typeof games>,
  );

  return (
    <Box style={{ flex: 1, overflowY: "auto", padding: "0.75rem" }}>
      {Object.entries(groupedByLeague).map(([league, games]) => (
        <Box key={league} mb="5">
          <Box mb="2">
            <Text size="2" weight="bold">
              {league}
            </Text>
          </Box>
          {games.slice(0, filterGroup.limit).map((game) => (
            <Box key={game.idGame} mb="4">
              <Box>
                <Text size="1" color="gray">
                  {game.banners?.[0]?.description}
                </Text>
              </Box>
              <Box>
                <Text size="1" color="gray">
                  {game.description}
                </Text>
              </Box>
              <Text size="1" color="gray">
                {new Date(game.startTime).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </Text>
              <Box
                mt="2"
                style={{
                  background: "var(--gray-4)",
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
          ))}
        </Box>
      ))}
    </Box>
  );
}
