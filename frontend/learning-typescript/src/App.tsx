import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Video from "./pages/Videos";
import VideoPlayer from "./pages/VideoPlayer";
import Record from "./pages/Records";
import RecordPlayer from "./pages/RecordPlayer";
import MultiviewStream from "./pages/MultiviewStream";
import MultiviewRecord from "./pages/MultiviewRecord";
import LiveView from "./pages/LiveView";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/videos" element={<Video />} />
                <Route path="/records" element={<Record />} />
                <Route path="/multiview/streams" element={<MultiviewStream />} />
                <Route path="/multiview/records" element={<MultiviewRecord />} />
                <Route path="/videos/play/:id" element={<VideoPlayer />} />
                <Route path="/records/play/:name" element={<RecordPlayer />} />
                <Route path="/live" element={<LiveView />} />
            </Routes>
        </div>
    );
}

export default App;
