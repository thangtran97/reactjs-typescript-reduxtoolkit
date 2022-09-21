import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import Page from "../../components/Page";
import { Button, Menu, MenuProps, Modal, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllStream, selectValues } from "../../store/streamSlice";
import WebrtcPlayer from "../../components/WebrtcPlayer";

const MultiviewStream: React.FC = () => {
    const dispatch = useAppDispatch();
    const streams = useAppSelector(selectValues);
    const [currentIndex, setCurrentIndex] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [streamUrl, setStreamUrl] = useState({
        url1: "",
        url2: "",
        url3: "",
        url4: "",
        url5: "",
        url6: "",
        url7: "",
        url8: "",
        url9: "",
        url10: "",
        url11: "",
        url12: "",
        url13: "",
        url14: "",
        url15: "",
        url16: ""
    });

    const handleSelectStream: MenuProps["onClick"] = e => {
        setStreamUrl(prevState => ({
            ...prevState,
            [`url${currentIndex}`]: e.key
        }));
        setIsModalOpen(false);
    };

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: number) => {
        setCurrentIndex(id);
        setIsModalOpen(true);
    };

    const handleCloseVideo = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>, id: number) => {
        e.preventDefault();
        setStreamUrl(prevState => ({
            ...prevState,
            [`url${id}`]: ""
        }));
    };

    useEffect(() => {
        dispatch(getAllStream());
    }, [dispatch]);

    return (
        <Page
            content={
                <div>
                    <Row style={{ width: 1400, marginTop: 24 }}>
                        <div className="space-align-block">
                            {streamUrl.url1 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url1}/channel/0/webrtc?${streamUrl.url1}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 1)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 1)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url2 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url2}/channel/0/webrtc?${streamUrl.url2}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 2)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 2)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url3 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url3}/channel/0/webrtc?${streamUrl.url3}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 3)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 3)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url4 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url4}/channel/0/webrtc?${streamUrl.url4}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 4)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 4)}
                                />}
                        </div>
                    </Row>
                    <Row style={{ width: 1400 }}>
                        <div className="space-align-block">
                            {streamUrl.url5 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url5}/channel/0/webrtc?${streamUrl.url5}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 5)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 5)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url6 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url6}/channel/0/webrtc?${streamUrl.url6}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 6)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 6)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url7 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url7}/channel/0/webrtc?${streamUrl.url7}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 7)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 7)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url8 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url8}/channel/0/webrtc?${streamUrl.url8}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 8)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 8)}
                                />}
                        </div>
                    </Row>
                    <Row style={{ width: 1400 }}>
                        <div className="space-align-block">
                            {streamUrl.url9 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url9}/channel/0/webrtc?${streamUrl.url9}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 9)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 9)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url10 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url10}/channel/0/webrtc?${streamUrl.url10}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 10)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 10)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url11 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url11}/channel/0/webrtc?${streamUrl.url11}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 11)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 11)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url12 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url12}/channel/0/webrtc?${streamUrl.url12}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 12)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 12)}
                                />}
                        </div>
                    </Row>
                    <Row style={{ width: 1400 }}>
                        <div className="space-align-block">
                            {streamUrl.url13 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url13}/channel/0/webrtc?${streamUrl.url13}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 13)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 13)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url14 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url14}/channel/0/webrtc?${streamUrl.url14}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 14)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 14)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url15 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url15}/channel/0/webrtc?${streamUrl.url15}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 15)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 15)}
                                />}
                        </div>
                        <div className="space-align-block">
                            {streamUrl.url16 ?
                                <WebrtcPlayer
                                    url={`http://localhost:8083/stream/${streamUrl.url16}/channel/0/webrtc?${streamUrl.url16}&channel=0`}
                                    width={341}
                                    height={192}
                                    onClose={(e) => handleCloseVideo(e, 16)}
                                    onClick={(e) => e.preventDefault()}
                                />
                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 16)}
                                />}
                        </div>
                    </Row>
                    <Modal
                        title="Select stream"
                        open={isModalOpen}
                        footer={null}
                        onCancel={() => setIsModalOpen(false)}
                    >
                        <Menu
                            items={streams}
                            onClick={(e) => handleSelectStream(e)}
                        />
                    </Modal>
                </div>
            }
        />
    );
};

export default MultiviewStream;
