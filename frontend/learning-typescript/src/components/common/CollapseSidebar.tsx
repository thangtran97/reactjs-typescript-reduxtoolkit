import * as React from "react";
import { useState } from "react";
import './styles/sidebar.common.css'

interface Props {
    listMediaStream?: any
}

export const CollapseSidebar: React.FunctionComponent<Props> = (props) => {



    return (
        <div>
            <div itemID={'mySidebar'} className={'sidebar'}>
                <a href="javascript:void(0)" className={'close-btn'}>&times;</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
        </div>
    );
};

