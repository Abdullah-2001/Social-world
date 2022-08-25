import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFriendsAsync } from '../../Store/Users/AsyncUser';
import { auth } from '../../Config/Firebase';
import Sidebar from '../../Component/Sidebar/Sidebar';
import ChatHeader from '../../Component/Chat-header/Chat-header';
import ChatFooter from '../../Component/Chat-footer/Chat-footer';
import { getMessagesAsync } from '../../Store/Chat/AsyncChat';
import './Messages.css'

const Messages = () => {

  const [chat, setChat] = useState("");
  const chatUsers = useSelector((state) => state.users.users);
  const messages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();
  const user1 = auth.currentUser?.uid
  const user2 = chat?.uid

  useEffect(() => {
    dispatch(setFriendsAsync())
  }, [])

  const selectUserChat = (v) => {
    setChat(v)
  }

  useEffect(() => {
    dispatch(getMessagesAsync({ user1: user1, user2: user2 }))
  }, [chat])

  console.log(messages);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar className="messages-sidebar">
        <p className='friends'>Active users</p>
        {chatUsers?.map((v) => {
          return (
            <>
              <div className='chat-users'>
                <div style={{ width: "12px", height: "12px", position: "absolute", left: "35px", top: "0px", borderRadius: "50%" }} className={v.isOnline === true ? "online" : "offline"} ></div>
                <img className='friends-img' src={v.profileImage} onClick={() => selectUserChat(v)}></img>
                <p style={{ marginLeft: "15px", fontSize: "16px" }}>{v.firstName + " " + v.lastName}</p>
              </div>
            </>
          )
        })}
      </Sidebar>
      <div className='message-box'>
        <div>
          {chat ? (
            <>
              <ChatHeader chat={chat} />
              {messages?.map(({ text, to, from }) => {
                return (
                  <div className='message-container'>
                    <p className={`${auth.currentUser.uid === from ? "sender" : "receiver"}`}>{text}</p>
                  </div>
                )
              })}
              <ChatFooter userId={{ user1, user2 }} />
            </>
          ) : (
            <h1>Select Chat</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages