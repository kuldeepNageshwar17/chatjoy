import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setChat } from './features/chatSlice'
import db from './firebase'
import './SidebarChat.css'
import * as timeago from 'timeago.js';

function SidebarChat ({ id, chatName }) {
  const dispatch = useDispatch()
  const [chatInfo, setChatInfo] = useState([])
  useEffect(() => {
    db.collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setChatInfo(snapshot.docs.map(doc => doc.data()))
      })
  }, [id])
  return (
    <div
      className='sidebarChat'
      onClick={() => {
        dispatch(
          setChat({
            id: id,
            chatName: chatName
          })
        )
      }}
    >
      <Avatar src={chatInfo[0]?.photo} />
      <div className='sidebarChat__info'>
        <h3>{chatName}</h3>
        <p> {chatInfo[0]?.message}</p>
        <small>
          {/* {new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleDateString()} */}
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
        </small>
      </div>
    </div>
  )
}

export default SidebarChat
