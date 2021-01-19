import * as React from 'react';
import styles from './Chat.module.css';

interface IProps {
    message: string;
    fromUser: boolean;
}

const Chatbox = (props: IProps) => {
    return (
        <div className={!props.fromUser ? styles.chatbox : styles['user-chatbox']}>
            {props.message}
        </div>
    )
}

export default Chatbox;