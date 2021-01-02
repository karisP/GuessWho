import React from 'react';
import styles from './Chat.module.css';

interface IProps {
    attribute: string | null;
    category: { id: number, title: string } | undefined;
    submitQuestion: (attribute: string) => void;
    clearQuestion: () => void;
    answer: string;
    submittedQuestion: string | null;

}
const Chat = (props: IProps) => {
    const questions = [
        `Do you want to know if my character has ${props.attribute} ${props.category ? props.category.title : ''}?`,
        `Do you want to know if my character wears ${props.attribute}?`,
        `Do you want to know if my character is ${props.attribute}?`,
        `Do you want to know if my character is of the ${props.attribute} ${props.category ? props.category.title : ''}?`
    ]

    return (

        <div className={styles.Chat}>
            {props.attribute !== null ?
                <div className={styles.chatbox}>
                    {props.category ? questions[props.category.id] : null}
                    <div className={styles.buttons}>
                        <button onClick={() => props.submitQuestion(`${props.attribute}`)}>Yes</button>
                        <button onClick={() => props.clearQuestion()}>No</button>
                    </div>
                    {props.submittedQuestion !== null ?
                        <div>{props.answer}</div>
                        :
                        null
                    }
                    <input placeholder="Enter your final guess"></input>
                </div>
                :
                ""
            }
        </div>

    )

}

export default Chat;