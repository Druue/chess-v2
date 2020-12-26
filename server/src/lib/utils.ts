import * as WebSocket from "ws";
import { socketMap } from "./types";

/**
 * Attempts to retrieve the id for the given websocket.
 * 
 * @param conn The websocket
 * @throws {Error} Connection not found
 */
export const getConnId = (conn: WebSocket): number => {
  const id = socketMap.get(conn);
  if (id == null) throw new Error("Connection not found!");
  return id;
};

export const setConnId = (conn: WebSocket, id: number) => socketMap.set(conn, id);