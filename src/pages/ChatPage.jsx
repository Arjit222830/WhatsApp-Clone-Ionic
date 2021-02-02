import React,{useContext,useState, useRef} from "react";
import { IonGrid, IonInput, IonIcon, IonButton, IonCol,IonRow,IonTitle,IonAvatar,IonFooter, IonToolbar,IonPage, IonHeader,IonContent, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";

import {AppContext} from "../State";
import {setNoTabs} from "../actions";
import {sendSharp, happyOutline, linkOutline} from "ionicons/icons"

import db from "../Firestore";
import Utility from "../Utility";

import ChatMessage from "../components/ChatMessage";

import {Plugins, CameraResultType} from "@capacitor/core";
const {Camera}= Plugins;

const ChatPage= ()=>{

    const {state, dispatch}=  useContext(AppContext);
    
    const [message, setMessage]= useState(null);

    const [chatMessages,setChatMessages]= useState([]);
    let messageSubscription= useRef(null);

    useIonViewWillEnter(async()=>{
        
        dispatch(setNoTabs(true));
        let channel1= `${state.user.user_id},${state.chattingWith.user_id}`;
        let channel2= `${state.chattingWith.user_id},${state.user.user_id}`;
        messageSubscription = await db.collection("messages")
            .where("channel","in",[channel1, channel2])
            .orderBy("time")
            .limit(100)
            .onSnapshot((querySnapshot)=>{
                let messages=[];
                querySnapshot.forEach((doc)=>{
                    messages.push(doc.data());
                });
                setChatMessages(messages);
                console.log(messages);
            });
    },[]);

    useIonViewWillLeave(()=>{
        messageSubscription();
    });

    const sendMessage= async ()=>{
        if(message){
            let messageBody={
                message_id: Utility.getRandom(),
                sent_by: state.user.user_id,
                channel: `${state.user.user_id},${state.chattingWith.user_id}`,
                type: "text",
                message: message,
                file_url: null,
                time: +Date.now() 
            };
            const send_response= await db.collection("messages").add(messageBody);
            setMessage(null);
        }
    }

    const screenMessages= ()=>{
        console.log("Screen Messages");
        return chatMessages.map((chat)=> { 
            return <ChatMessage key={chat.message_id} chat={chat}/>
        });
    }

    const getImage= async()=>{
        const image= await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64
        });

        console.log(image);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="menu-bar">
                    <IonAvatar slot="start" style={{width: "40px",height:"40px",marginLeft:"10px"}}>
                        <img src={state.chattingWith.avatar} />
                    </IonAvatar>
                    <IonTitle>{state.chattingWith.name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="chat-page-content">
                {screenMessages()}
            </IonContent>

            <IonFooter>
                <IonToolbar>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="10">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol  size="2">
                                            <IonIcon icon={happyOutline} size="large"></IonIcon>
                                        </IonCol>
                                        <IonCol>
                                            <IonInput value={message} onIonChange={(e)=>setMessage(e.detail.value)} placeholder="Type a message"></IonInput>
                                        </IonCol>
                                        <IonCol size="2">
                                            <IonIcon className="media-icon" icon={linkOutline} size="large" onClick={()=>getImage()}></IonIcon>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCol>
                            <IonCol size="2">
                                <IonButton onClick={()=> sendMessage()} className="chat-send-button">
                                    <IonIcon icon={sendSharp}></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}

export default ChatPage;