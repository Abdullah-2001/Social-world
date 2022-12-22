import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '../../Config/Firebase';
import Button from '../Button/Button';
import Input from '../Input/Input';

const ChatFooter = (userId) => {

  const [text, setText] = useState("")
  const { user1, user2 } = userId.userId
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

  const sendMessage = async () => {
    await addDoc(collection(firestore, "messages", id, "chat"), {
      from: user1,
      to: user2,
      text,
      createdAt: serverTimestamp()
    })
    setText("")
  }

  return (
    <div>
      <Input type="text" placeholder="Enter a message" className="message-input" value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={sendMessage} className="send-btn" title="Send" />
    </div>
  )
}

export default ChatFooter