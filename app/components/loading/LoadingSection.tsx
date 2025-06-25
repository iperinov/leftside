import { Flex } from "@radix-ui/themes";
import styles from "./LoadingSection.module.css";

export default function LoadingSection() {
  return (
    <Flex direction="column" align="center" justify="center" width="100%" height="100%">
      <svg className={styles.spinnerIcon} viewBox="0 0 24 24" fill="none">
        <circle
          className={styles.spinnerBg}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className={styles.spinnerFg}
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </Flex>
  );
}