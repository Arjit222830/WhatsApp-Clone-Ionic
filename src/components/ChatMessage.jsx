import React,{useContext} from "react";

import "./ChatMessage.css";
import {IonImg} from "@ionic/react";
import Utility from "../Utility";
import {AppContext} from "../State";

const ChatMessage= ({chat})=>{

    const {state, dispatch}= useContext(AppContext);

    const chat_time= Utility.getTime(chat.time);
    let converted_image = chat.type == "media" ? `data:image/jpeg;base64,${chat.file_url}`:"";

    let messageStyles= {};

    if(state.user.user_id == chat.sent_by){
        console.log("hello");
        messageStyles.backgroundColor = "#dcf8c6";
        messageStyles.float = "right";
    }

    return (
        <div style={{clear: "both"}}>
            <div className="chat-message-box" style={messageStyles}>
                {chat.type=="media" && <IonImg src={converted_image}/>}
                {chat.message}
                <div className="message-time">
                    {chat_time}
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;