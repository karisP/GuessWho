import * as React from 'react';
import styles from './Character.module.css';
import cardback from '../../images/harry_potter/cardback.png';

interface IProps {
  name: string;
  img: string;
  key: number;
  resetCards: boolean;
  setResetCards: (arg: boolean) => void;
}

const Character = (props: IProps) => {
  const [flipped, setFlipped] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(props.resetCards === true) setFlipped(false);
  },[props.resetCards]);
  
  const flipCard = () => {
    setFlipped(!flipped);
    props.setResetCards(false);
    console.log(flipped);
  }
  const divStyle = {
    backgroundImage: 'url(' + props.img + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <div className={styles.flipBox} onClick={() => flipCard()}>
      <div className={flipped ? `${styles.flipOver} ${styles.flipBoxInner}` : styles.flipBoxInner}>
        <div className={styles.flipBoxFront} style={divStyle}>

          <p className={styles.name}>{props.name}</p>
        </div>
        <div className={styles.flipBoxBack}>
          <img src={cardback} alt="cardback" />
        </div>
      </div>
    </div>

  )

}

export default Character;