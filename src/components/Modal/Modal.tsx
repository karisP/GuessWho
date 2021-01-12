import * as React from 'react';
import { ICharacter } from '../../App';
import styles from './Modal.module.css';
import cardback from '../../images/harry_potter/cardback.png';

interface IProps{
    onStartNewGame: () => void;
    dbCharacter: ICharacter | null;
    submittedQuestionCount: number;
}

const Modal = (props: IProps) => {
    
    return(
        <div className={styles.container} onClick={props.onStartNewGame}>
            <div className={styles.message}>
                <img src={cardback} alt=""/>
                <div>
                    <p>You've guessed {props.dbCharacter ? props.dbCharacter.name : "WHO"} correctly in {props.submittedQuestionCount} guesses!</p>
                    <p>YOU'VE WON! 50 points to your house!</p>
                    <button type="button" onClick={props.onStartNewGame}>New Game</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;