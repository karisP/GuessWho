import * as React from 'react';
import { ICharacter } from '../../App';
import styles from './Modal.module.css';
import cardback from '../../images/harry_potter/cardback.png';

interface IProps {
    onStartNewGame?: () => void;
    dbCharacter?: ICharacter | null;
    dbCharacterTwoId?: number | null;
    winCharacter: { name: string, img: string } | null;
    win?: boolean | null;
    submittedQuestionCount?: number;
    revealAnswer?: boolean;
    twoPlayers?: boolean;
    setMinimizeCharacter?: (arg: boolean) => void;
    onClose: () => void;
}

const Modal = (props: IProps) => {
    let points: number = 0;
    if (props.submittedQuestionCount && props.submittedQuestionCount <= 5) {
        points = 100;
    } else if (props.submittedQuestionCount && props.submittedQuestionCount > 5 && props.submittedQuestionCount < 10) {
        points = 50;
    } else {
        points = 25;
    }

    return (
        <div className={styles.container} onClick={props.onClose}>
            <div className={styles.message}>
                <div className={styles.close} onClick={props.onClose} />
                {props.winCharacter ? <img src={props.winCharacter.img} alt="character" /> : <img src={cardback} alt="" />}
                <div>
                    {
                        props.revealAnswer ?
                        <>
                                <p>I was thinking of {props.dbCharacter ? props.dbCharacter.name : ""}!</p>
                                <p>You have failed your O.W.L.s and 50 points will be subtracted from your house!</p>
                            </>
                            :
                            props.win ?
                            <>
                                <p>You've guessed {props.dbCharacter ? props.dbCharacter.name : "WHO"} correctly in {props.submittedQuestionCount} guesses!</p>
                                <p>YOU'VE WON {points} points to your house!</p>
                            </>
                            :
                            null
                    }
                    {
                        props.twoPlayers && props.winCharacter ?
                            <div>
                                <p>You have {props.winCharacter.name}.</p>
                                <p>Play with a friend by sending this link: /{props.dbCharacterTwoId}</p>
                            </div>
                             : null
                    }
                    {!props.twoPlayers ? <button type="button" onClick={props.onClose}>New Game</button> : null}
                </div>
            </div>
        </div>
    )
}

export default Modal;