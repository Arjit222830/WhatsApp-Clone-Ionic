import React,{useContext} from 'react';
import { IonContent, IonAvatar, IonItem, IonList, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, useIonViewWillEnter} from '@ionic/react';
import ChatItem from '../components/ChatItem';
import './Tab1.css';

import {AppContext} from "../State";
import {setNoTabs,setChattingWith} from "../actions";
import "../App.css";

const Tab1 = () => {
  const {state, dispatch}=  useContext(AppContext);

  useIonViewWillEnter(()=>{
    console.log("IonViewEnter ChatItem");
    dispatch(setNoTabs(false));
    dispatch(setChattingWith({}));
},[]);

  const Contacts= ()=>{
    return state.user.contacts.map((contact)=>{
      return <ChatItem contact={contact} key={contact.user_id} />
    });
  }

  return (
    <IonPage>
      <IonContent className="chat-screen">
        <IonList>
          <Contacts />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
