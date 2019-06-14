import React from 'react';
import styles from './Chat.module.css';
const Chat = (props) => {
    return(

    <div className={styles.Chat}>
        You have selected {props.attribute}<span>{props.category}</span>
    </div>

    )

}

export default Chat;