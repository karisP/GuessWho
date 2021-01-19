import React from 'react';
import styles from './Chat.module.css';

interface IProps {
    attribute: string | null;
    category: { id: number, title: string, questionId: number } | undefined;
    submitQuestion: (attribute: string) => void;
    clearQuestion: () => void;
    answer: boolean | undefined;
    submittedQuestion: string | null;
    onSubmitFinal: () => void;
    onChangeFinal: (e: React.ChangeEvent<HTMLInputElement>) => void;
    finalAnswer: string;
    win: boolean | null;
}
const Chat = (props: IProps) => {
    const questions = [
        `Do you want to know if my character has ${props.attribute} ${props.category ? props.category.title.toLocaleLowerCase() : ''}?`,
        `Do you want to know if my character wears ${props.attribute}?`,
        `Do you want to know if my character is ${props.attribute}?`,
        `Do you want to know if my character is of the ${props.attribute} ${props.category ? props.category.title.toLowerCase() : ''}?`,
        `Do you want to know if my character is a ${props.attribute}?`,
        `Do you want to know if my character has ${props.category ? props.category.title.toLowerCase() : ''}?`,
        `Do you want to know if my character's ${props.category ? props.category.title.toLowerCase() : ''} is a ${props.attribute}?`,

    ]

    return (

        <div className={styles.Chat}>
            <div className={styles.chatbox}>
                Hello, please select from the below categories and attributes to ask me questions.
            </div>
            {props.attribute !== null ?
                <div className={styles.chatbox}>
                    {props.category ? questions[props.category.questionId] : null}
                    <div className={styles.buttons}>
                        <button onClick={() => props.submitQuestion(`${props.attribute}`)}>Yes</button>
                        <button onClick={() => props.clearQuestion()}>No</button>
                    </div>
                </div>
                :
                ""
            }
            {props.submittedQuestion !== null ?
                <div className={styles.chatbox}>{props.answer === true ? "Yes" : "No"}</div>
                :
                null
            }
            {props.finalAnswer ?
                <div className={styles.final}>{props.finalAnswer}</div>
                :
                null
            }
            {props.win !== null ?
                <div className={styles.chatbox}>{!props.win ? "Try Again" : null}</div>
                :
                null
            }
        </div>

    )

}

export default Chat;