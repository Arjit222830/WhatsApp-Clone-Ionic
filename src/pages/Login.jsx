import React,{useState,useContext} from 'react';
import {IonHeader, IonLoading, IonToolbar, IonButton, IonTitle, IonPage,IonContent,IonItem,IonInput} from '@ionic/react';

import "../App.css";

import db from '../Firestore';

import {AppContext} from '../State';
import {loadUser} from '../actions';


const Login= ()=>{

    const [passcode, setPasscode]= useState();
    const [showLoading, setShowLoading]= useState(false);

    const {state, dispatch}= useContext(AppContext);

    const onInputChange= (e)=>{
        setPasscode(e.detail.value);
    }

    const login= async()=>{
        setShowLoading(true);

        let user;
        const fetchUser= await db.collection("users").where("passcode","==",passcode).get();

        fetchUser.forEach((doc)=>{
            user= doc.data();
            user.id= doc.id;
            console.log(user);
        });

        await dispatch(loadUser(user));

        setShowLoading(false);
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="login-bar">
                    <IonTitle>Two-step verification</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="passcode-text"> 
                    Enter a four digit passcode which you'll be asked for when you register your phone number with WhatsApp-Clone:
                </div>

                <div className="passcode-input-section"> 
                    <IonItem className="passcode-input">
                        <IonInput value={passcode} onIonChange={onInputChange}></IonInput>
                    </IonItem>
                </div>

                <IonButton onClick={()=> login()} className="login-button" disabled={!passcode}>
                    Login
                </IonButton>

                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}
                />
            </IonContent>
        </IonPage>
    );
}

export default Login;