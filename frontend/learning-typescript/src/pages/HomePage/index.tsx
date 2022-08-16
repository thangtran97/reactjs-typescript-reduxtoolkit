import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import Page from "../../components/Page";
import logo from "../../logo.svg";

const HomePage: React.FC = () => (
    <Page
        content={
            <video width="1200" controls>
                <source src="http://localhost:5000/records/play?name=sample.mp4" type="video/mp4" />
            </video>
        }
    />
);

export default HomePage;
