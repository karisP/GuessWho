import * as React from 'react';
import { ICharacter } from '../../App';
import styles from './Modal.module.css';
import cardback from '../../images/harry_potter/cardback.png';

interface IProps{
    onStartNewGame: () => void;
    dbCharacter: ICharacter | null;
    winCharacter: {name: string, img: string} | null;
    submittedQuestionCount: number;
}

const Modal = (props: IProps) => {
    let points: number = 0;
    if(props.submittedQuestionCount <= 5){
        points = 100;
    } else if(props.submittedQuestionCount > 5 && props.submittedQuestionCount < 10){
        points = 50;
    }else{
        points = 25;
    }
    
    return(
        <div className={styles.container} onClick={props.onStartNewGame}>
            <div className={styles.message}>
                {props.winCharacter ? <img src={props.winCharacter.img} alt="character"/> : <img src={cardback} alt=""/>}
                <div>
                    <p>You've guessed {props.dbCharacter ? props.dbCharacter.name : "WHO"} correctly in {props.submittedQuestionCount} guesses!</p>
                    <p>YOU'VE WON {points} points to your house!</p>
                    <button type="button" onClick={props.onStartNewGame}>New Game</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;