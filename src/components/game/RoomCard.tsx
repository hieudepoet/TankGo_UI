import React from "react";
import type { GameRoom } from "../../data/types";

const RoomCard: React.FC<GameRoom> = ({
  id,
  numOfPlayers,
  currentPlayers,
  status,
}) => {
  return (
    <div className="border p-4 rounded mb-4 bg-red-400">
      <h3 className="text-lg font-bold">Room ID: {id}</h3>
      <p>
        Players: {currentPlayers.length}/{numOfPlayers}
      </p>
      <p>Status: {status}</p>
    </div>
  );
};

export default RoomCard;
