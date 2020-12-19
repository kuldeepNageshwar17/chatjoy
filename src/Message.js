import { Avatar } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import './Message.css'
import * as timeago from 'timeago.js';

const Message = forwardRef(({ id, content:{timestamp,displayName,email,message,photo,uid }} , ref) => {
  const user = useSelector(selectUser);
  return (
    <div ref={ref} className={`message ${email===user.email && 'message_sender'}`}>
      <Avatar src ={photo} className="message_photo"/>
      <p>{message}</p>
      {/* <small>{ new Date( timestamp?.toDate()).toLocaleString()}</small> */}
      <small>{ timeago.format(new Date( timestamp?.toDate()))}</small>
    </div>
  )
})

export default Message
