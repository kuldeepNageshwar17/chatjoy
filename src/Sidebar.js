import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import Avatar from '@material-ui/core/Avatar'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import RateReviewIcon from '@material-ui/icons/RateReview'
import SidebarChat from './SidebarChat'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import db, { auth } from './firebase'

function Sidebar () {
  const [chats, setchats] = useState([])
  const user = useSelector(selectUser)
  useEffect(() => {
    db.collection('chats').onSnapshot(snapshot => {
      console.log(snapshot)
      setchats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    })
  }, [])
  const addNewChat = () => {
    const chatName = prompt('Please enter a chat name')
    if (chatName) {
      db.collection('chats').add({
        chatName: chatName
      })
    }
  }
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar
          onClick={() => {
            // alert("Login out")
            auth.signOut()
          }}
          src={user.photo}
          className='sidebar__avatar'
        />
        <div className='sidebar__input'>
          <SearchIcon />
          <input placeholder='search' />
        </div>
        <IconButton className='sidebar__inputButton'>
          <RateReviewIcon onClick={addNewChat} />
        </IconButton>
      </div>
      <div className='sidebar__chats'>
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
