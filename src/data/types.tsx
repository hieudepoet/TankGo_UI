import type { DocumentReference } from "firebase/firestore/lite";

export interface FsUser {
  uid: string;
  name: string;
  email: string;
  photo: string;
}

export interface GameRoom {
  id: string;
  numOfPlayers: number;
  currentPlayers: DocumentReference<FsUser>[];
  status: "waiting" | "started";
}

export interface GameMatch {
  id: string;
  numOfPlayers: number;
  currentPlayers: DocumentReference<FsUser>[];
  winner: DocumentReference<FsUser> | null;
  log?: string[];
  status: "started" | "completed" | "banned";
}
