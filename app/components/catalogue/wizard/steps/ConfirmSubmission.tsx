import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import type { LeagueRegion } from "~/api/ocs/ocs.types";
import { BaseDialog } from "~/components/shared/BaseDialog";
import { CreationStep } from "~/stores/createLeagueStore";

interface ConfirmSubmissionProps {
  handler: () => void;
  onClose: () => void;
  onBack: (step: number) => void;
  sportTitle: string;
  regionTitle: string;
  leagueTitle: string;
}

export function ConfirmSubmission({
  handler,
  onClose,
  onBack,
  sportTitle,
  regionTitle,
  leagueTitle,
}: ConfirmSubmissionProps) {
  return (
    <BaseDialog
      open={true}
      onClose={onClose}
      onBack={() => {
        onBack(CreationStep.CreateLeague);
      }}
      onConfirm={handler}
      title="Confirm Submission"
      confirmLabel="Submit"
      showCancel={false}
    >
      <Box style={{ marginTop: "1rem", marginBottom: "1.25rem" }}>
        <Text size="1" color="gray">
          Add Sport
        </Text>
        <Text
          size="3"
          weight="medium"
          as="div"
          style={{ marginTop: "0.25rem" }}
        >
          {sportTitle}
        </Text>
      </Box>

      <Box style={{ marginBottom: "1.25rem" }}>
        <Text size="1" color="gray">
          Add Region
        </Text>
        <Text
          size="3"
          weight="medium"
          as="div"
          style={{ marginTop: "0.25rem" }}
        >
          {regionTitle}
        </Text>
      </Box>

      <Box>
        <Text size="1" color="gray">
          Add League
        </Text>
        <Text
          size="3"
          weight="medium"
          as="div"
          style={{ marginTop: "0.25rem" }}
        >
          {leagueTitle}
        </Text>
      </Box>
    </BaseDialog>
  );
}
