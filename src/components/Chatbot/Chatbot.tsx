import React, { useEffect, useRef } from 'react';
import { ICharacter } from '../../App';
import styles from './Chatbot.module.css';
import Question from '../Question/Question';

interface IProps {
    character: ICharacter | null;
    onWin: (win: boolean) => void;
    win: boolean | null;
    onCountQuestions: () => void;
    minimize: boolean;
    setMinimize: (arg: boolean) => void;
}

interface IMessage {
    message: string;
    fromUser: boolean;
}


const Chatbot = (props: IProps) => {

    const chatEl = useRef<HTMLDivElement | null>(null);
    const [messageState, setMessageState] = React.useState<IMessage[]>([{ message: "Hello student, please select from the below categories and attributes to ask me questions.", fromUser: false }]);

    const addMessageToState = (message: string, fromUser: boolean) => {
        setMessageState(prevState => (
            [...prevState, { message: message, fromUser: fromUser }]
        ))
    }

    //autoscroll chat component
    useEffect(() => {
        if (chatEl.current) {
            chatEl.current.addEventListener('DOMNodeInserted', event => {
                let target = event.currentTarget as HTMLDivElement;
                if (target) target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}><span className={styles['hat-image']}></span>Hat Chat <button onClick={() => props.setMinimize(true)}/></div>
            <div className={styles.chat} ref={chatEl}>
                {messageState ? messageState.map((m, key) => (
                    <div key={key} className={!m.fromUser ? styles.chatbox : styles['user-chatbox']}>
                        {m.message}
                    </div>
                )) : null}
            </div>
            <Question
                addMessageToState={addMessageToState}
                character={props.character}
                onCountQuestions={props.onCountQuestions}
                onWin={props.onWin} />
        </div>
    )

}

export default Chatbot;
