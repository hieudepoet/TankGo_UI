import { collection, doc, onSnapshot, QuerySnapshot } from "firebase/firestore";
import type { GameRoom } from "../data/types";
import type { DocumentData, DocumentSnapshot } from "firebase/firestore";
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

export const subscribeRoom = (
  roomId: string,
  onChange: (room: GameRoom | null) => void,
  onError?: (e: unknown) => void
): (() => void) => {
  const docRef = doc(firestore, "rooms", roomId);

  const unsubscribe = onSnapshot(
    docRef,
    (snap: DocumentSnapshot<DocumentData>) => {
      if (snap.exists()) {
        const room: GameRoom = {
          id: snap.id,
          ...(snap.data() as Omit<GameRoom, "id">),
        };
        onChange(room);
      } else {
        // Document deleted or not found
        onChange(null);
      }
    },
    (err) => {
      console.error(`Realtime error for room ${roomId}:`, err);
      onError?.(err);
    }
  );

  return unsubscribe;
};
