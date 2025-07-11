import { getAppConfig } from "~/lib/runtimeConfig";
import { mockEvents } from "./mock/mockEvents";
import type { Event } from "./ocs.types";

const ocsUrl = getAppConfig().ocs.baseUrl;

export const getEvents = async (): Promise<Event[]> => {
  const url = new URL(`${ocsUrl}/config/events`);
  console.log("getEvents: ", url);
  await new Promise((res) => setTimeout(res, 500)); // Simulate delay

  // TODO:
  //    * Replace with real API call
  //    * Handle error codes
  // const response = await fetch(url.toString());

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   throw new Error(`Failed to fetch events: ${response.status} ${errorText}`);
  // }

  // const data: Event[] = await response.json();
  // return data;

  return mockEvents;
};
