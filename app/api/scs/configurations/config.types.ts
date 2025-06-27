import type { ExitCodes } from "./config.exitCodes";

/* Common */
export interface ApiError {
  ExitCode: Exclude<ExitCodes, ExitCodes.Success>;
  Description: string;
}

/* Rename */
export interface RenameConfigApiIn {
  uuid: string;
  rev: string;
  name: string;
}

export interface RenameConfigApiSuccess {
  ExitCode: ExitCodes.Success;
  uuid: string;
  rev: string;
}

//Discriminated Union for API Responses
export type RenameConfigApiResponse = RenameConfigApiSuccess | ApiError;

/* Duplicate */
export interface DuplicateConfigApiIn {
  uuid: string;
  rev: string;
}

export interface DuplicateConfigApiSuccess {
  ExitCode: ExitCodes.Success;
  uuid: string;
  name: string;
  rev: string;
}

export type DuplicateConfigApiResponse = DuplicateConfigApiSuccess | ApiError;

/* Create */
export interface Filter {
  type:
    | "sport"
    | "region"
    | "league"
    | "game"
    | "period"
    | "market"
    | "time"
    | "status";
  value: string;
}

export interface FilterGroup {
  filters: Filter[];
  "group-by": string;
  order: "asc" | "desc";
  limit: number;
}

export interface Category {
  uuid: string;
  name: string;
  type: "flat" | "nested";
  "filter-groups": FilterGroup[];
  children: Category[];
}

export interface CreateConfigApiIn {
  name: string;
}

export interface CreateConfigApiSuccess {
  ExitCode: ExitCodes.Success;
  uuid: string;
  rev: string;
  name: string;
  categories: Category[];
}

export type CreateConfigApiResponse = CreateConfigApiSuccess | ApiError;

export interface DeleteConfigApiIn {
  uuid: string;
  rev: string;
}

export interface DeleteConfigApiSuccess {
  ExitCode: ExitCodes.Success;
  rev: string;
}

export type DeleteConfigApiResponse = DeleteConfigApiSuccess | ApiError;
