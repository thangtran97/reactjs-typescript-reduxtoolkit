import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { Button, Table } from "antd";
import {
    PlayCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllRecord, selectIsLoading, selectRecordList } from "../../store/recordSlice";

const Record: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector(selectIsLoading);
    const recordList = useAppSelector(selectRecordList);

    const columns = [
        {
            title: "ID",
            dataIndex: "",
            key: "id",
            render: (text: string, record: String, index: number) => {
                return (
                    <div>{index + 1}</div>
                );
            },
        },
        {
            title: "Name",
            dataIndex: "",
            key: "name",
        },
        {
            title: "",
            dataIndex: "action",
            key: "action",
            render: (text: string, record: String, index: number) => {
                return (
                    <div>
                        <Button
                            shape="circle"
                            style={{ color: "green", borderColor: "green" }}
                            icon={<PlayCircleOutlined />}
                            onClick={event => play(record)}
                        />
                    </div>
                );
            },
        },
    ];

    const play = (name: String) => {
        navigate(`/records/play/${name}`);
    };

    useEffect(() => {
        dispatch(getAllRecord());
    }, [dispatch]);

    return (
        <Page
            content={
                <div>
                    <Table
                        loading={isLoading}
                        style={{ marginTop: 50 }}
                        dataSource={recordList}
                        columns={columns}
                    />
                </div>
            }
        />
    );
};

export default Record;
