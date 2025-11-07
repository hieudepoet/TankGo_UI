import { useEffect, useState } from "react";
import type { GameRoom } from "../data/types";
import { subscribeRooms } from "../service/room";

export const useRooms = () => {
  const [rooms, setRooms] = useState<GameRoom[]>([]);
  useEffect(() => {
    const unsub = subscribeRooms(setRooms);
    return () => unsub();
  }, []);
  return rooms;
};
