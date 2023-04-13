'use client'
import Pusher from "pusher-js";
import { useEffect,useState } from "react";
import React from 'react'
import axios from "axios";

const Chat = () => {

  const [subscribe,setsubscriber]=useState([])
  const username='muthu'
  const pusher = new Pusher("e248e83fcce2773cf872", {
    cluster: "ap2",
    // use jwts in prod
    authEndpoint: `/api/detalis/auth`,
    auth: { params: {username}}
  });
  console.log(pusher);

  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [usersRemoved, setUsersRemoved] = useState([]);

  useEffect(() => {
    console.log(chats)
    const channel = pusher.subscribe("presence-channel"); 

    // when a new member successfully subscribes to the channel
    channel.bind("pusher:subscription_succeeded", (members) => {
      // total subscribed
      setOnlineUsersCount(members.count);
    });

    // when a new member joins the chat
    channel.bind("pusher:member_added", (member) => {
      // console.log("count",channel.members.count)
      setOnlineUsersCount(channel.members.count);
      setOnlineUsers((prevState) => [
        ...prevState,
        { username: member.info.username, userLocation: member.info.userLocation },
      ]);
    });

    // when a member leaves the chat
    channel.bind("pusher:member_removed", (member) => {
      setOnlineUsersCount(channel.members.count)
      setUsersRemoved((prevState) => [...prevState, member.info.username])
    })

    // updates chats
    channel.bind("chat-update", function (data) {
      const {username, message} = data
      setChats((prevState) => [
        ...prevState,
        { username, message },
      ]);
   
    });

    return () => {
      pusher.unsubscribe("presence-channel");
    };
  }, []);

  const handleSubmit = async () => {

    // await axios.post("/api/detalis/chat-update", {
    //   message: messageToSend,
    //   username
    // });
   await fetch("/api/detalis/chat-update", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({username:username,message:messageToSend}),
    }).then( (res) => res.json())
    .then((data)=>{
      console.log(data)
    })

    console.log(pusher);
  };
  return (
    <div>
      welcome
  <div>
    {/* <input type="text" onChange={()=>{
      setsubscriber(e.target.value)
    }} />
    <button onClick={send}>send</button> */}
  </div>

      <input type="text"  onChange={(e)=>{
        setMessageToSend(e.target.value)
      }}/>
     
      <button onClick={handleSubmit}>handleSubmit</button>
    </div>
  )
}

export default Chat
