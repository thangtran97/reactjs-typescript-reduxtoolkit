import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css"
import Page from "../../components/Page";
import { Button, Dropdown, Menu, MenuProps, Space } from "antd";
import { AppstoreOutlined, BorderOutlined, CameraOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { selectIsLoading } from "../../store/videoSlice";
import { getAllStream, selectValues } from "../../store/streamSlice";
import html2canvas from "html2canvas";
import { uploadImage } from "../../store/imageSlice";

const MultiviewStream: React.FC = () => {

    const dispatch = useAppDispatch();
    const streams = useAppSelector(selectValues);

    console.log(streams);

    const handleSelectStream: MenuProps["onClick"] = async e => {

        switch (e.key) {
            case "1":
                canvas = await html2canvas(videoRef.current || document.body, {
                    width: videoRef.current!.width,
                    height: videoRef.current!.height
                });
                break;
            case "2":
                canvas = await html2canvas(videoContainerRef.current || document.body, {
                    width: videoRef.current!.width * 2,
                    height: videoRef.current!.height * 2
                });
                break;
            default:
                break;
        }

        // @ts-ignore
        let base64_image = canvas.toDataURL("image/png", 1.0);

        let req = {
            name: "img_" + Math.round(videoRef.current!.currentTime * 1000),
            image: base64_image
        };

        dispatch(uploadImage(req));
    };

    useEffect(() => {
        dispatch(getAllStream());
    }, [dispatch])

    return (
        <Page
            content={
                <div className="row-block">
                    <div className="space-align-block">
                        {/*<Button*/}
                        {/*    shape="circle"*/}
                        {/*    icon={<PlusOutlined />}*/}
                        {/*    size="large"*/}
                        {/*/>*/}
                        <Dropdown.Button
                            trigger={['click']}
                            icon={<PlusOutlined />}
                            size="large"
                            overlay={<Menu
                                items={streams}
                            />}
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
