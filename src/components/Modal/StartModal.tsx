import * as React from 'react';
import styles from './Modal.module.css';
import sortinghat from '../../images/harry_potter/sortinghat.jpeg';

interface IProps{
    onCloseStartModal: () => void;
}

const StartModal = (props: IProps) => {
    const houses = ["Griffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
    let randomInt = Math.floor(Math.random() * 4);
    let randomHouse = houses[randomInt]; 
    console.log(randomHouse);
    
    return(
        <div className={styles.container} onClick={props.onCloseStartModal}>
            <div className={styles.message}>
            <div className={styles.close} onClick={props.onCloseStartModal}/>
                <img src={sortinghat} alt=""/>
                <div>
                    <p>Welcome to Guess Hoot student of...hmmm...{randomHouse}!!
                    You must ask me questions about the character I am thinking of.
                    Turn over the cards of those you have eliminated. When you are ready, submit your final guess.
                    Beware refreshing the page lest you start over. Let the game begin!!</p>
                    <button type="button" onClick={props.onCloseStartModal}>Begin</button>
                </div>
            </div>
        </div>
    )
}

export default StartModal;