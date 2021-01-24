import * as React from 'react';
import styles from './Chat.module.css';

interface IProps {
    message: string;
    fromUser: boolean;
}

const Chatbox = (props: IProps) => {
    return (
        <>
            {props.message}
        </>
    )
}

export default Chatbox;