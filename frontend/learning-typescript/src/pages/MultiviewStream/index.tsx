import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css"
import Page from "../../components/Page";
import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const MultiviewStream: React.FC = () => {

    return (
        <Page
            content={
                <div className="row-block">
                    <div className="space-align-block">
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            size="large"
                        />
                    </div>
                    <div className="space-align-block">
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            size="large"
                        />
                    </div>
                    <div className="space-align-block">
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            size="large"
                        />
                    </div>
                    <div className="space-align-block">
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            size="large"
                        />
                    </div>
                </div>
            }
        />
    );
};

export default MultiviewStream;
