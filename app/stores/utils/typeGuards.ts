import type { ResponseOk } from "~/api/sccs/types.gen";

export function isResponseError(obj: unknown): obj is ResponseOk {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "code" in obj &&
    typeof (obj as { code?: unknown }).code === "number" &&
    "description" in obj &&
    typeof (obj as { description?: unknown }).description === "string" &&
    obj.code !== 200
  );
}
