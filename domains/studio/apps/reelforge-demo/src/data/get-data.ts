import { DEMO_DATA } from "./demo-data";
import type { Broker } from "./types";

export function getOrg() {
  return DEMO_DATA.org;
}

export function getBrokers() {
  return DEMO_DATA.brokers;
}

export function getBroker(slug: string): Broker | undefined {
  return DEMO_DATA.brokers.find((b) => b.slug === slug);
}

export function getHookTypes() {
  return DEMO_DATA.hookTypes;
}

export function getHookType(id: string) {
  return DEMO_DATA.hookTypes.find((h) => h.id === id);
}

export function getMarketData() {
  return DEMO_DATA.marketData;
}
