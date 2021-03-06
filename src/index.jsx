import React from 'react';
import ReactDOM from 'react-dom';
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import App from './App';
import * as serviceWorker from './serviceWorker';

import {AppContextProvider} from './State';


const RootComponent = ()=>{
    return (
        <AppContextProvider>
            <App />
        </AppContextProvider>
    )
}

ReactDOM.render(
    <RootComponent />,
    document.getElementById('root')
);

defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
