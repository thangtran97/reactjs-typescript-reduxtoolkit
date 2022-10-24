import React, {ChangeEvent, useRef, useState} from "react";
import Page from "../../components/Page";
import "./index.css";
import "react-simple-keyboard/build/css/index.css";
import KeyboardWrapper from "../../components/common/KeyboardWrapper";

const Login: React.FC = () => {
    const [input, setInput] = useState("");
    const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
    const keyboard = useRef<any>(null);

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInput(value);
        keyboard?.current?.setInput(value);
    };

    return (
        <Page
            content={
                <div style={{marginTop: 10}}>
                    <div className={'login-container d-flex align-items-center justify-content-center'}>
                        <div className={'login-border d-flex align-items-center justify-content-center'}>
                            <div className={'login-panel row'}>
                                <div className={'login-logo col-12 d-flex align-items-end justify-content-center'}>
                                    <img className={'login-img'}/>
                                </div>

                                <div className={'login-info col-12'}>
                                    <div className={'col-12 d-flex justify-content-center'}>
                                        <input className={'login-input mg-b-20'}/>
                                    </div>
                                    <div className={'col-12 d-flex justify-content-center'}>
                                        <span style={{width: 47}}></span>
                                        <input type={'password'} className={'login-input mg-b-20'}
                                               onChange={e => onChangeInput(e)}
                                               value={input}/>

                                        <span style={{width: 47, marginBottom: 20}}>
                                            <img src="icons/virtual-keyboard.png"
                                                 className={'virtual-key-img mg-b-20'}
                                                 onClick={() => setShowKeyboard(!showKeyboard)}/>
                                        </span>
                                    </div>
                                    <div className={'col-12 d-flex align-items-end justify-content-center'}>
                                        <a href={'/live'}>
                                            <img src="icons/login.JPG" className={'login-button'}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'key-board'}>
                        {(showKeyboard) ?
                            (<KeyboardWrapper keyboardRef={keyboard} onChange={setInput}/>)
                            : <></>}
                    </div>
                </div>
            }
        />
    );
}

export default Login;
