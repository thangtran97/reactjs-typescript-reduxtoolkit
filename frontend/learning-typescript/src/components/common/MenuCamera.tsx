// @ts-nocheck
import * as React from 'react';

import './styles/camera.menu.css'
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';
import "bootstrap/dist/css/bootstrap.min.css";

interface PropTypes {
    mouseX: number;
    mouseY: number;
    onClose: any;
    havePTZ?: boolean;
}

const MenuCamera: React.FC<PropTypes> = (props) => {
    const [menuStyle, setStyle] = useState<object>({});
    const [zoomNumber, setZoomNumber] = useState<number>(1);

    useEffect(() => {
        setStyle({
            display: 'block',
            position: 'absolute',
            left: props.mouseX,
            top: props.mouseY
        })
    }, [props]);

    const closeMenu = () => {
        props.onClose();
    }

    const zoomIn = () => {
        if (zoomNumber < 6) {
            setZoomNumber(zoomNumber + 1);
        }
    }

    const zoomOut = () => {
        if (zoomNumber > 1) {
            setZoomNumber(zoomNumber - 1);
        }
    }

    return (
        <Draggable>
            <div style={menuStyle} className={'menu-camera menu-cam-bd'}>
                <div className={'menu-cam-header'}>
                    <img src="icons/camera-menu/camera-menu.png"
                         className={'icon icon-22 icon-line'}/>
                    <a href="#javascript" className="close-btn" onClick={closeMenu}></a>

                </div>
                <li className={'menu-cam-line menu-cam-has-children menu-cam-allow-hover'}>
                    <a href="#"
                       className={'menu-cam-link'}>

                        <img src="icons/camera-menu/electronic-zoom.png"
                             className={'icon icon-24 icon-line'}/>
                        電子ズーム
                    </a>
                    <ul className={'menu-cam-children'}>
                        <li className={'menu-cam-item'}>
                            <div className={'zoomable-control-view'}>
                            </div>
                            <div className={'zoomable-control-bar d-flex justify-content-center'}>
                                <img src="icons/camera-menu/play-menu.png"
                                     className={'icon icon-34'} onClick={zoomOut} />
                                <span className={'zoom-number d-flex align-items-center'}>{zoomNumber}</span>
                                <span className={'zoom-x'}>x</span>
                                <img src="icons/camera-menu/electronic-zoom.png"
                                     className={'icon icon-34'} onClick={zoomIn}/>
                            </div>
                        </li>
                    </ul>
                </li>

                <li className={'menu-cam-line menu-cam-has-children menu-cam-allow-hover '}>
                    <a href="#"
                       className={'menu-cam-link'}>
                        <img src="icons/camera-menu/manual-recording.png"
                             className={'icon icon-24 icon-line'}/>
                        手動記録
                    </a>
                </li>

                <li className={'menu-cam-line menu-cam-has-children menu-cam-allow-hover '}>
                    <a href="#"
                       className={'menu-cam-link'}>
                        <img src="icons/camera-menu/cam-voice.png"
                             className={'icon icon-24 icon-line'}/>
                        カメラ音声
                    </a>
                </li>

                <li className={'menu-cam-line menu-cam-has-children menu-cam-allow-hover '}>
                    <a href="#"
                       className={'menu-cam-link'}>
                        <img src="icons/camera-menu/snapshot.png"
                             className={'icon icon-24 icon-line'}/>
                        スナップショット
                    </a>
                </li>

                <li className={'menu-cam-line menu-cam-has-children menu-cam-allow-hover'}>
                    <a href="#"
                       className={'menu-cam-link'}>
                        <img src="icons/camera-menu/omnidirectional.png"
                             className={'icon icon-24 icon-line'}/>
                        全方位カメラ
                    </a>
                </li>

                <li className={'menu-cam-line menu-cam-has-children menu-cam-allow-hover'}>
                    <a href="#"
                       className={'menu-cam-link'}>
                        <img src="icons/camera-menu/PTZ-Camera.png"
                             className={'icon icon-24 icon-line'}/>
                        PTZ
                    </a>
                </li>


            </div>
        </Draggable>
    );
};

export default MenuCamera;