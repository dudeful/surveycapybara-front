import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import {Votes} from "./components/Votes.js";
//import {Chat} from "./components/Chat.js";

const URL = 'wss://ws-server-surveycapybara.dudeful.com';

function App() {

  const [user, setUser] = useState('FabricioFront');
  const [message, setMessage] = useState([]);
	const [messages, setMessages] = useState([]);
 	const [ws, setWs] = useState(new WebSocket(URL));
  const [votes, setVotes] = useState({'option_1': "",'option_2':"",'option_3':"",'option_4':"",'total':0});
  const [myVotes, setMyVotes] = useState([]);
  const voting = {myVotes, setMyVotes}

  const submitMessage = (usr, type, msg) => {
    const message = { user: usr, code: type, message: msg };
    ws.send(JSON.stringify(message));
    if (type === 2){
      setMessages([message, ...messages]);
    }
  }

  useEffect(() => {
    ws.onopen = () => {
      try {
        const data = {
          user,
          status:"connection open",
        };  
        ws.send(JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
      console.log('WebSocket Connected');
    }

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (e.code === 2){
        setMessages([message, ...messages]);
      }else{
        setVotes(message);
      }
    }

    return () => {
      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setWs(new WebSocket(URL));
      }
    }
  }, [ws.onmessage, ws.onopen, ws.onclose, messages]);

  return (
    <div className="App">
      <Votes user={user} socket={submitMessage} state={votes} me={voting} />
    </div>
  );
}

export default App;
