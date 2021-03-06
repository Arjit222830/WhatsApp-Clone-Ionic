import React,{useContext, useEffect, useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import {AppContext} from "./State";

import "./App.css"

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";


const App= () => {
  
  const {state,dispatch}= useContext(AppContext);
  console.log(state);
  if(state.user)
    console.log(`name:${state.user.name} chattingWith:${state.chattingWith.name}`)

  const TabFlag= ()=>{
    if(state.noTabs)
      return <IonTabBar></IonTabBar>;

    return (
      <IonTabBar slot="top" className="menu-bar">
        <IonTabButton tab="tab1" href="/tab1"  className="tabButton">
          <IonLabel>CHATS</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2" className="tabButton">
          <IonLabel>STATUS</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3" className="tabButton">
          <IonLabel>CALLS</IonLabel>
        </IonTabButton>
      </IonTabBar>
    );
  }

  const BeforeLogin=()=>{
    return (
      <IonApp>
        <Login />
      </IonApp>
    )
  }

  if(!state.user)
    return  <BeforeLogin />

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/tab1" component={Tab1} exact={true} />
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route path="/tab3" component={Tab3} />
            <Route path="/chatpage" component={ChatPage} />
            <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
          </IonRouterOutlet>
          {TabFlag()}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
