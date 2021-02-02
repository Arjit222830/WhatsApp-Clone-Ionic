import React,{useContext,useState,useRef} from 'react';
import {IonItem, IonAvatar, IonLabel, useIonViewDidEnter, useIonViewWillLeave} from "@ionic/react";
import {useHistory} from "react-router";

import {AppContext} from "../State";
import db from "../Firestore";
import {setNoTabs, setChattingWith} from "../actions";

const ChatItem= ({contact})=>{

    const {state, dispatch}= useContext(AppContext);
    const [lastMessage,setLastMessage]= useState({});

    let history = useHistory();

    let profile_photo= contact.avatar || "https://avatars2.githubusercontent.com/u/43830893?s=460&u=3312fdf89af09892129a42f42891bae6bd10c72a&v=4";

    let messageSubscription = useRef(null);
    
    useIonViewDidEnter(async()=>{

        let channel1= `${state.user.user_id},${contact.user_id}`;
        let channel2= `${contact.user_id},${state.user.user_id}`;

        messageSubscription= await db.collection("messages")
            .where("channel","in",[channel1,channel2])
            .orderBy("time","desc")
            .limit(1)
            .onSnapshot((querySnapshot)=>{
                var messages=[];
                querySnapshot.forEach((doc)=>{
                    messages.push(doc.data())
                });
                if(messages.length>0)
                    setLastMessage(messages[0]);
            });        
    });

    const goToChat= (contact)=>{
        dispatch(setChattingWith(contact));
        history.push('/chatpage');
    }

    return (
        <IonItem onClick={()=> goToChat(contact)}>
            <IonAvatar slot="start">
                <img src={profile_photo} alt="icon"/>
            </IonAvatar>
            <IonLabel>
                <h2>{contact.name}</h2>
                <p>
                    {lastMessage.message || "...."}
                </p>
            </IonLabel>
        </IonItem>
    );
}

export default ChatItem;