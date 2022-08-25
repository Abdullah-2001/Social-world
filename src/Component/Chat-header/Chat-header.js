import React from 'react';
import './Chat-header.css';

const ChatHeader = (chat) => {
  const { firstName, lastName, profileImage } = chat.chat
  return (
    <div>
      <h1>{firstName + " " + lastName}</h1>
      <img className='friends-img' src={profileImage} />
    </div>
  )
}

export default ChatHeader