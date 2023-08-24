import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { RoomJoinPage } from "./components/RoomJoinPage";
import { CreateRoomPage } from "./components/CreateRoomPage";
import { Room } from "./components/Room";

function App() {
    return (
      
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/join" element={<RoomJoinPage/>} />
                <Route path="/create" element={<CreateRoomPage/>} />
                <Route path="/room/:roomCode" element={<Room/>} />
            </Routes>
    )
}

export default App