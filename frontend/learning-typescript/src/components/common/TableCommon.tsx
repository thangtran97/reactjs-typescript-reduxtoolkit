import * as React from "react";
import { useState } from "react";
import './styles/table.common.css'

interface Props {
    colName: string[];
    colSize: string[];
    data: any;
    onSelected: any;
    selectedIndex: number;
}

export const TableCommon: React.FunctionComponent<Props> = (props) => {

    const [selectedIdx, setSelectedRow] = useState<number>(props.selectedIndex);

    const selectedRow = (index: number) => {
        props.onSelected(index);
        setSelectedRow(index);
    };

    let itemCol: any = [];
    let itemHead: any = [];
    let itemData: any = [];
    props.colName.forEach((item, i) => {
        itemHead.push(
            <th key={i}>{item}</th>
        );
    });
    props.colSize.forEach((item, i) => {
        itemCol.push(
            <col key={i} style={{ width: item }} />
        );
    });
    props.data.forEach((item: any, i: number) => {
        let row: any = [];
        Object.values(item).forEach((val: any, index) => {
            const chkHiddenCol = index >= itemHead.length;
            row.push(
                <td key={index} className={chkHiddenCol ? "d-none" : ""}>{val}</td>
            );
        });
        itemData.push(
            <tr key={i} onClick={() => selectedRow(i)} className={(i === selectedIdx) ? 'selected-row' : ''}>
                {row}
            </tr>
        );
    });

    return (
        <div>
            <table className={"table table-striped table-dark col col-12"}>
                <colgroup>
                    {itemCol}
                </colgroup>
                <thead>
                <tr>
                    {itemHead}
                </tr>
                </thead>
                <tbody>
                {itemData}
                </tbody>
            </table>
        </div>
    );
};

