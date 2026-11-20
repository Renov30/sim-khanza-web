"use client";

import { useSyncExternalStore } from "react";

const tanpaLangganan = () => () => {};
const diKlien = () => true;
const diServer = () => false;

export function useKlien() {
  return useSyncExternalStore(tanpaLangganan, diKlien, diServer);
}
