import React from 'react'
import MessageView from '../MessageView/MessageView'
import style from './MessageWindow.module.css'

function MessageWindow():JSX.Element {
  return (
      <div className={style.messageWindow}>MessageWindow
      <MessageView/></div>
  )
}

export default MessageWindow