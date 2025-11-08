import { useEffect, useState } from "react";
import type { GameRoom } from "../data/types";
import { subscribeRoom } from "../service/room";

export const useRoom = (roomId: string) => {
  const [room, setRoom] = useState<GameRoom | null>(null);
  useEffect(() => {
    const unsub = subscribeRoom(roomId, setRoom);
    return () => unsub();
  }, [roomId]);
  return room;
};
