import React from 'react';
import styles from './Chat.module.css';

const Chat = (props) => {
    const questions = {
        0: `Do you want to know if my character has ${props.attribute} ${props.categoryTitle}?`,
        1: `Do you want to know if my character wears ${props.attribute}?`,
        2: `Do you want to know if my character is ${props.attribute}?`,
        3: `Do you want to know if my character is of the ${props.attribute} ${props.categoryTitle}?`
    }
    let question = props.categoryId;
    return (

        <div className={styles.Chat}>
            {props.attribute !== null ?
                <div className={styles.chatbox}>
                    {questions[question]}
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