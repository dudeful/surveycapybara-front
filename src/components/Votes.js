import React from "react";

export function Votes (props){
    const onClick = e =>{
        e.preventDefault();
        if (props.me.myVotes.length < 3){
            props.me.setMyVotes([e.currentTarget.id, ...props.me.myVotes]);
            console.log(props);
            props.socket(props.user, 1, e.currentTarget.id);
            e.currentTarget.disabled = true;
        }
    };
    return (
        <div>
            <button id={"option_1"} onClick={onClick}>Opção a | {props.state["option_1"]}</button>
            <button id={"option_2"} onClick={onClick}>Opção b | {props.state["option_2"]}</button>
            <button id={"option_3"} onClick={onClick}>Opção c | {props.state["option_3"]}</button>
            <button id={"option_4"} onClick={onClick}>Opção d | {props.state["option_4"]}</button>
            <input value={props.state["total"]}  disabled={true} />
        </div>
    )
}