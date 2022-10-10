//@ts-nocheck
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import Page from "../../components/Page";
import { Button, Menu, MenuProps, Modal, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllStream, selectValues } from "../../store/streamSlice";
import WebrtcPlayer from "../../components/WebrtcPlayer";

const ONE_STREAM = "1";
const FOUR_STREAM = "2";
const SIX_STREAM = "3";
const NINE_STREAM = "4";
const THIRTEEN_STREAM = "5";
const SIXTEEN_STREAM = "6";

const MultiviewStream: React.FC = () => {
    const dispatch = useAppDispatch();
    const streams = useAppSelector(selectValues);
    const [currentIndex, setCurrentIndex] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<string>(ONE_STREAM);
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
    const [lstMediaStream, setListMedia] = useState<MediaStream[]>([]);

    const pushMediaStream = (mediaStream: MediaStream) =>{
        lstMediaStream.push(mediaStream);
        setListMedia(lstMediaStream);
    }

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

    const handleChangeViewMode = (value: string) => {
        setViewMode(value);
    };

    const setBlockSize = (position?: number) => {
        switch (viewMode) {
            case ONE_STREAM:
                return "block-100";
            case FOUR_STREAM:
                return "block-50";
            case SIX_STREAM:
                return position == 1 ? "block-66" : "block-33";
            case NINE_STREAM:
                return "block-33";
            case THIRTEEN_STREAM:
                return position == 6 ? "block-50" : "block-25";
            case SIXTEEN_STREAM:
                return "block-25";
        }
    };

    const setWidth = (position?: number) => {
        switch (viewMode) {
            case ONE_STREAM:
                return 1366;
            case FOUR_STREAM:
                return 683;
            case SIX_STREAM:
                return position == 1 ? 910.66 : 455.33;
            case NINE_STREAM:
                return 455.33;
            case THIRTEEN_STREAM:
                return position == 6 ? 683 : 341.5;
            case SIXTEEN_STREAM:
                return 341.5;
        }
    };

    const setHeight = (position?: number) => {
        switch (viewMode) {
            case ONE_STREAM:
                return 768;
            case FOUR_STREAM:
                return 384;
            case SIX_STREAM:
                return position == 1 ? 512 : 256;
            case NINE_STREAM:
                return 256;
            case THIRTEEN_STREAM:
                return position == 6 ? 384 : 192;
            case SIXTEEN_STREAM:
                return 192;
        }
    };


    useEffect(() => {
        dispatch(getAllStream());
    }, [dispatch]);

    return (
        <Page
            content={
                <div>
                    <Row style={{ marginBottom: 24 }}>
                        <Select
                            style={{ width: "15%" }}
                            value={viewMode}
                            onChange={handleChangeViewMode}
                        >
                            <Select.Option value={`${ONE_STREAM}`}>1 Stream</Select.Option>
                            <Select.Option value={`${FOUR_STREAM}`}>4 Stream</Select.Option>
                            <Select.Option value={`${SIX_STREAM}`}>6 Stream</Select.Option>
                            <Select.Option value={`${NINE_STREAM}`}>9 Stream</Select.Option>
                            {/*<Select.Option value={`${THIRTEEN_STREAM}`}>13 Stream</Select.Option>*/}
                            <Select.Option value={`${SIXTEEN_STREAM}`}>16 Stream</Select.Option>
                        </Select>
                    </Row>
                    <div style={{ width: 1366, height: 768 }}>
                        <div id="block1" className={"space-align-block " + setBlockSize(1)}>
                            {streamUrl.url1 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url1}/channel/0/webrtc?${streamUrl.url1}&channel=0`}
                                        width={setWidth(1)}
                                        height={setHeight(1)}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 1)}
                                        onClick={(e) => e.preventDefault()}
                                        id={"1"}
                                        onPushMedia={pushMediaStream}
                                    />

                                : <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size="large"
                                    onClick={(e) => handleClick(e, 1)}
                                />}
                        </div>
                        {(viewMode != ONE_STREAM) ?
                            (<div id="block2" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url2 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url2}/channel/0/webrtc?${streamUrl.url2}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 2)}
                                        onClick={(e) => e.preventDefault()}
                                        id={"2"}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 2)}
                                    />}
                            </div>): null}
                        {(viewMode != ONE_STREAM) ?
                            (<div id="block3" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url3 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url3}/channel/0/webrtc?${streamUrl.url3}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 3)}
                                        onClick={(e) => e.preventDefault()}
                                        id={"3"}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 3)}
                                    />}
                            </div>): null}
                        {(viewMode != ONE_STREAM) ?
                            (<div id="block4" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url4 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url4}/channel/0/webrtc?${streamUrl.url4}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 4)}
                                        onClick={(e) => e.preventDefault()}
                                        id={"4"}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 4)}
                                    />}
                            </div>): null}

                        {(viewMode == SIX_STREAM || viewMode == NINE_STREAM || viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block5" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url5 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url5}/channel/0/webrtc?${streamUrl.url5}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 5)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 5)}
                                    />}
                            </div>) : null}
                        {(viewMode == SIX_STREAM || viewMode == NINE_STREAM || viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block6" className={"space-align-block " + setBlockSize(6)}>
                                {streamUrl.url6 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url6}/channel/0/webrtc?${streamUrl.url6}&channel=0`}
                                        width={setWidth(6)}
                                        height={setHeight(6)}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 6)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 6)}
                                    />}
                            </div>) : null}
                        {(viewMode == NINE_STREAM || viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block7" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url7 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url7}/channel/0/webrtc?${streamUrl.url7}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 7)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 7)}
                                    />}
                            </div>) : null}
                        {(viewMode == NINE_STREAM || viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block8" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url8 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url8}/channel/0/webrtc?${streamUrl.url8}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 8)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 8)}
                                    />}
                            </div>) : null}
                        {(viewMode == NINE_STREAM || viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block9" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url9 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url9}/channel/0/webrtc?${streamUrl.url9}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 9)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 9)}
                                    />}
                            </div>) : null}
                        {(viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block10" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url10 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url10}/channel/0/webrtc?${streamUrl.url10}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 10)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 10)}
                                    />}
                            </div>) : null}
                        {(viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block11" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url11 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url11}/channel/0/webrtc?${streamUrl.url11}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 11)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 11)}
                                    />}
                            </div>) : null}
                        {(viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block12" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url12 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url12}/channel/0/webrtc?${streamUrl.url12}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 12)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 12)}
                                    />}
                            </div>) : null}
                        {(viewMode == THIRTEEN_STREAM || viewMode == SIXTEEN_STREAM) ?
                            (<div id="block13" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url13 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url13}/channel/0/webrtc?${streamUrl.url13}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 13)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 13)}
                                    />}
                            </div>) : null}
                        {(viewMode == SIXTEEN_STREAM) ?
                            (<div id="block14" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url14 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url14}/channel/0/webrtc?${streamUrl.url14}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 14)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 14)}
                                    />}
                            </div>) : null}
                        {(viewMode == SIXTEEN_STREAM) ?
                            (<div id="block15" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url15 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url15}/channel/0/webrtc?${streamUrl.url15}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 15)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 15)}
                                    />}
                            </div>) : null}
                        {(viewMode == SIXTEEN_STREAM) ?
                            (<div id="block16" className={"space-align-block " + setBlockSize()}>
                                {streamUrl.url16 ?
                                    <WebrtcPlayer
                                        url={`http://localhost:8083/stream/${streamUrl.url16}/channel/0/webrtc?${streamUrl.url16}&channel=0`}
                                        width={setWidth()}
                                        height={setHeight()}
                                        hasClose={true}
                                        onClose={(e) => handleCloseVideo(e, 16)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : <Button
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        onClick={(e) => handleClick(e, 16)}
                                    />}
                            </div>) : null}
                    </div>
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
