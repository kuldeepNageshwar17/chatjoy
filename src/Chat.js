import { IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import MicNoneIcon from '@material-ui/icons/MicNone'
import Message from './Message'
import { selectchatId, selectchatName } from './features/chatSlice'
import { useSelector } from 'react-redux'
import db from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/userSlice'
import FlipMove from "react-flip-move"
function Chat () {
  const user = useSelector(selectUser)

  const [Input, setInput] = useState('')
  const chatName = useSelector(selectchatName)
  const chatId = useSelector(selectchatId)
  const [messages, setmessages] = useState([])
  useEffect(() => {
    if (chatId) {
      db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot =>
          setmessages(          
            snapshot.docs.map(doc =>{
              console.log("data",doc.data)
              return{
              id: doc.id,
              data: doc.data()
            }})
          )
        )
        
    }
  }, [chatId])
  const sendMessage = e => {
    e.preventDefault()
    db.collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: Input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName
      })
      setInput('')

  }

  return (
    <div className='chat'>
      {/* chat header */}
      <div className='chat__header'>
        <h4>
          to: <span className='chat__name'>{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      {/* chat messages */}
      <div className='chat__message'>
        <FlipMove>
        {messages.map(({ id, data }) => (
          <Message key={id} content={data} />
        ))}

        </FlipMove>
        
      </div>
      {/* chat input */}
      <div className='chat__input'>
        <form>
          <input
            value={Input}
            placeholder='imessage'
            onChange={e => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className='chat__mic' />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
