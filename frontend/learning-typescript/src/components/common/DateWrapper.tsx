import * as React from 'react';

import ReactDatePicker from "react-datepicker";
import {FunctionComponent, useState} from "react";

interface IProps {
}

const DateWrapper: FunctionComponent<IProps> = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const onChangeDate = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <ReactDatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
        />
    );
};

export default DateWrapper;
