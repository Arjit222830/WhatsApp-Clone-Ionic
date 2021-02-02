import React from "react"

export const loadUser= (user)=>{
    return {
        type: "loadUser",
        payload:user
    }
}

export const setNoTabs = (flag)=>{
    return {
        type: "setNoTabs",
        payload: flag
    }
}

export const setChattingWith  = (contact)=>{
    return {
        type: "setChattingWith",
        payload: contact
    }
}