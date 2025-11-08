import { useParams } from "react-router-dom";
import { useRoom } from "../hooks/useRoom";

const Room = () => {
  const { roomId } = useParams();
  const room = useRoom(roomId!);
  console.log("Room data:", room);
  if (!room) return <div>Loading room {roomId}...</div>;

  return (
    <div>
      <h1>Room {room.id}</h1>
      <p>Status: {room.status}</p>
      <p>
        Players: {room.currentPlayers.length} / {room.numOfPlayers}
      </p>
    </div>
  );
};

export default Room;
