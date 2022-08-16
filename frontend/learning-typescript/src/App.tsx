import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Video from "./pages/Videos";
import VideoPlayer from "./pages/VideoPlayer";
import Record from "./pages/Records";
import RecordPlayer from "./pages/RecordPlayer";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/videos" element={<Video />} />
                <Route path="/records" element={<Record />} />
                <Route path="/videos/play/:id" element={<VideoPlayer />} />
                <Route path="/records/play/:name" element={<RecordPlayer />} />
            </Routes>
        </div>
    );
}

export default App;
