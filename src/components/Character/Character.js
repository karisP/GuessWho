import React,{Component} from 'react';
import styles from './Character.module.css';
import cardback from '../../images/harry_potter/cardback.png';
class Character extends Component{
    constructor(props){
        super(props);
        this.state={
            flipped: false
        }
    
    this.flipCard = this.flipCard.bind(this);
    }
    flipCard = () =>{
        this.setState({flipped:!this.state.flipped});
        console.log(this.state.flipped);
    }
    divStyle = {
      backgroundImage: 'url(' + this.props.img + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
    render(){
        return(
            <div className={styles.flipBox} onClick={()=>this.flipCard()}>
            <div className={this.state.flipped? `${styles.flipOver} ${styles.flipBoxInner}`:styles.flipBoxInner}>
              <div className={styles.flipBoxFront} style={this.divStyle}>
                
                <p className={styles.name}>{this.props.name}</p>
              </div>
              <div className={styles.flipBoxBack}>
                <img src={cardback} alt="cardback"/>
              </div>
            </div>
          </div>
           
        )

    }
 
}

export default Character;