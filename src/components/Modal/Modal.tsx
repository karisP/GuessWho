import * as React from 'react';
import { ICharacter } from '../../App';
import styles from './Modal.module.css';
import cardback from '../../images/harry_potter/cardback.png';

interface IProps{
    onStartNewGame: () => void;
    dbCharacter: ICharacter | null;
}

const Modal = (props: IProps) => {
    
    return(
        <div className={styles.container}>
            <div className={styles.message}>
                <img src={cardback} alt=""/>
                <div>You've guessed {props.dbCharacter ? props.dbCharacter.name : "WHO"} correctly!
                YOU'VE WON! 50 points to your house!</div>
            </div>
            <form onSubmit={props.onStartNewGame}>
                <button type="submit">New Game</button>
            </form>
        </div>
    )
}

export default Modal;