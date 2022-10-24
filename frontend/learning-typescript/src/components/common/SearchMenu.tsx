// @ts-nocheck
import * as React from 'react';

import './styles/search.menu.css'
import {ReactElement, useEffect, useState} from "react";
import {MultiSelect} from "react-multi-select-component";
import ReactDatePicker from "react-datepicker";
import axios from "axios";
import {TableCommon} from "./TableCommon";
import {DEFAULT_RECORD_MAP, TABLE_HEADER_RECORD, VIDEO_1_ID} from "../../utils/constant";

interface PropTypes {

}

const SearchMenu: React.FC<PropTypes> = (props) => {
    const [comboboxValue, setCombobox] = useState<any>([]);
    const [comboboxSelected, setCbSelected] = useState<any>([]);

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(null);
    const [lstVideoPlay, setPlayVideo] = useState<Map>(DEFAULT_RECORD_MAP);
    const [videoIdSelected, setIdSelected] = useState<string>(VIDEO_1_ID);
    const [dataSearch, setDataSearch] = useState<any[]>([]);
    const [elementSearch, setElementSearch] = useState<ReactElement>(<div></div>);
    const [selectedRow, setSelectedRow] = useState<number>(-1);
    const [thumbnailData, setThumbnailData] = useState<any[]>([]);
    const [thumbnailImg, setThumbnailImg] = useState<ReactElement>(<div></div>);
    useEffect(() => {
        axios.get("/get-all-cb-data").then(res => {
            if (res.status === 200) {
                setCombobox(res.data);
            }
        }).catch(error => console.log(error));
    }, []);

    const setComboboxSelected = (data) => {
        setCbSelected(data);
    };

    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const onSelectedRow = (index: number) => {
        setSelectedRow(index);
    };

    const onSearch = () => {
        let dataSearch = {
            startDate: startDate,
            endDate: endDate,
            comboBoxSelected: comboboxSelected
        };
        axios({
            method: "post",
            url: "/search",
            data: JSON.stringify(dataSearch),
            headers: {"Content-Type": "application/json"}
        })
            .then(function (response) {
                if (response.status === 200) {
                    setDataSearch(response.data);
                    setElementSearch(<TableCommon colName={TABLE_HEADER_RECORD} colSize={["2em", "2em"]}
                                                  selectedIndex={selectedRow} data={response.data}
                                                  onSelected={onSelectedRow}/>);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const loadPlayer = () => {
        const fileName = dataSearch[selectedRow].fileName;
        const filePath = dataSearch[selectedRow].url;
        axios({
            method: "post",
            url: "/get-thumbnail",
            data: JSON.stringify({fileName: fileName, filePath: filePath}),
            headers: {"Content-Type": "application/json"}
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response.data);
                    setThumbnailData(response.data);
                    let thumb = [];
                    response.data.forEach((item, i) => {
                        thumb.push(
                            <img key={i} src={item} className={"i-thumbnail"}/>
                        );
                    });
                    setThumbnailImg(<div className={"row col-12"}>{thumb}</div>);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };


    return (
        <div className={"search-menu-container"}>
            <div className={"search-menu"}>
                <div className={"row col-12 mt-2"}>
                    <label className={"col-4 text-white"}>Pick camera</label>
                    <MultiSelect
                        options={comboboxValue}
                        value={comboboxSelected}
                        onChange={setComboboxSelected}
                        labelledBy="Select"
                        className={"col-8"}
                    />
                </div>
                <div className={"d-flex justify-content-center mt-2"}>
                    <ReactDatePicker
                        selected={startDate}
                        onChange={onChangeDate}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                    />
                </div>
                <button className={"btn btn-primary"} onClick={onSearch}>Search</button>
                <div className={"col-12"}>
                    {elementSearch}
                </div>
                <button className={"btn btn-primary"} onClick={loadPlayer}>Play</button>
                {thumbnailImg}
            </div>
        </div>
    );
};

export default SearchMenu;