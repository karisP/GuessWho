import React from 'react';
import styles from './Chat.module.css';
const Chat = (props) => {
    return(

    <div className={styles.Chat}>
        You have selected {props.attribute}
    </div>

    )

}

export default Chat;