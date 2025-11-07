import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import type { GameRoom } from "../data/types";
import type { DocumentData } from "firebase/firestore";
import { firestore } from "../config/firebase";

export const subscribeRooms = (
  onChange: (rooms: GameRoom[]) => void,
  onError?: (e: unknown) => void
): (() => void) => {
  const colRef = collection(firestore, "rooms");

  const unsubscribe = onSnapshot(
    colRef,
    (snap: QuerySnapshot<DocumentData>) => {
      const rooms: GameRoom[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<GameRoom, "id">),
      }));

      onChange(rooms);
    },
    (err) => {
      console.error("Realtime rooms error:", err);
      onError?.(err);
    }
  );

  return unsubscribe;
};
