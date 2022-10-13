import React, { ReactElement } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Sider, Footer } = Layout;

interface PropTypes {
    content: ReactElement;
}

const navBarItems: MenuProps["items"] = [
    {
        label: <Link to={"/"}>Home</Link>,
        key: "home",
    },
    {
        label: <Link to={"/live"}>Live View</Link>,
        key: "live",
    },
    {
        label: <Link to={"/multiview/streams"}>Multiview Stream</Link>,
        key: "multiviewStreams",
    },
    {
        label: <Link to={"/multiview/records"}>Multiview Record</Link>,
        key: "multiviewRecords",
    },
    {
        label: <Link to={"/videos"}>Videos</Link>,
        key: "videos",
    },
    {
        label: <Link to={"/records"}>Records</Link>,
        key: "records",
    },
];

const sideBarItems: MenuProps["items"] = [
    {
        label: <Link to={"/live"}>Live View</Link>,
        key: "live",
    },
    {
        label: <Link to={"/multiview/streams"}>Multiview Stream</Link>,
        key: "multiviewStreams",
    },
    {
        label: <Link to={"/multiview/records"}>Multiview Record</Link>,
        key: "multiviewRecords",
    },
    {
        label: <Link to={"/videos"}>Videos</Link>,
        key: "videos",
    },
    {
        label: <Link to={"/records"}>Records</Link>,
        key: "records",
    },
];

const Page: React.FC<PropTypes> = props => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" items={navBarItems} />
            </Header>
            <Layout
                className="site-layout-background"
                style={{ padding: "24px 0" }}
            >
                {/*<Sider width={200} className="site-layout-background">*/}
                {/*    <Menu*/}
                {/*        mode="inline"*/}
                {/*        style={{ height: "100%", borderRight: 0 }}*/}
                {/*        items={sideBarItems}*/}
                {/*    />*/}
                {/*</Sider>*/}
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Content
                        style={{
                            alignSelf: "center",
                            padding: "0 24px",
                            minHeight: 770,
                        }}
                    >
                        {props.content}
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: "center" }}>
                NEV ©2022 Created by xxx
            </Footer>
        </Layout>
    );
};

export default Page;
