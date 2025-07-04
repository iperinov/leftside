import type { Configuration } from "../config.types";

export const mockLeagues: Configuration[] = [
  {
    uuid: "09bef6e0-351d-4065-922a-6ce6241a1d85",
    rev: "14-f04499aa1dc7258169beeb08b6ab78b6",
    name: "Default",
    books: [1, 2, 3, 5, 10, 11, 13, 16, 22, 23, 26, 27, 28, 29, 30, 31, 33, 34, 35, 39, 40, 41, 42],
    lmt: Date.parse("2025-04-09T15:42:00Z"),
    lmu: "username1",
  },
  {
    uuid: "09bef6e0-351d-4065-922a-6ce6241a1d86",
    rev: "14-f04499aa1dc7258169beeb08b6ab78b6",
    name: "BC_PS_BO_TC",
    books: [44, 45, 48, 49, 50, 51, 53, 54, 55, 56, 58, 60, 64, 65],
    lmt: Date.parse("2025-04-09T15:42:00Z"),
    lmu: "username2",
  },
  {
    uuid: "09bef6e0-351d-4065-922a-6ce6241a1d87",
    rev: "14-f04499aa1dc7258169beeb08b6ab78b6",
    name: "Configuration Alpha",
    books: [70, 71, 72, 73, 80, 81, 89, 90, 100, 101, 102],
    lmt: Date.parse("2025-04-06T08:42:00Z"),
    lmu: "username3",
  },
  {
    uuid: "09bef6e0-351d-4065-922a-6ce6241a1d88",
    rev: "14-f04499aa1dc7258169beeb08b6ab78b6",
    name: "Configuration Beta",
    books: [104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 119, 120, 121, 122, 123, 124],
    lmt: Date.parse("2025-05-07T10:42:00Z"),
    lmu: "username4",
  },
  {
    uuid: "09bef6e0-351d-4065-922a-6ce6241a1d89",
    rev: "14-f04499aa1dc7258169beeb08b6ab78b6",
    name: "Configuration Gamma",
    books: [126, 127, 128, 129, 130, 131, 132, 133, 134, 137, 140, 141, 142, 143, 144, 145, 146, 147, 148],
    lmt: Date.parse("2025-03-09T15:42:00Z"),
    lmu: "username5",
  },
  {
    uuid: "09bef6e0-351d-4065-922a-6ce6241a1d90",
    rev: "14-f04499aa1dc7258169beeb08b6ab78b6",
    name: "Configuration Delta",
    books: [],
    lmt: Date.parse("2025-04-08T16:42:00Z"),
    lmu: "username5",
  },
];
