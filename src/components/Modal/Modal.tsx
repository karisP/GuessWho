import * as React from 'react';
import { ICharacter } from '../../App';
import styles from './Modal.module.css';
import cardback from '../../images/harry_potter/cardback.png';
import { useLocation, useParams } from 'react-router-dom';

interface IParams {
    id: string;
}
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
    const location = useLocation();
    const params = useParams<IParams>();
    const ref = React.useRef<HTMLInputElement>(null);
    let points: number = 0;
    if (props.submittedQuestionCount && props.submittedQuestionCount <= 5) {
        points = 100;
    } else if (props.submittedQuestionCount && props.submittedQuestionCount > 5 && props.submittedQuestionCount < 10) {
        points = 50;
    } else {
        points = 25;
    }

    const copyToClipboard = () => {
        /* Get the text field */
        let copyText: HTMLInputElement;
        if (ref.current) {
            copyText = ref.current;

            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* Alert the copied text */
            alert("Copied the text: " + copyText.value);
        }
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
                                <p>So you would rather play with another student than with the old Sorting Hat, hmmm?</p>
                                <p>You have {props.winCharacter.name} and you must provide clues about the character to the other player.</p>
                                {
                                    !params.id ?
                                        <>
                                            <p>Call a friend and invite them to play by sending this link:
                                                 <input type="text" value={`https://guess-hoot.herokuapp.com/${props.dbCharacterTwoId}`} ref={ref} readOnly />
                                            </p>
                                            <button onClick={copyToClipboard}>Copy text</button>
                                        </>
                                        : null
                                }
                                <div className={styles.disclaimer}>Disclaimer: Please note no copywrite infringement is intended, and I do not own or claim to own the characters created by J.K. Rowling or music written by John Williams. This game is for fun and not to be reproduced or sold.</div>
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