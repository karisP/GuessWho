import React,{Component} from 'react';
import styles from './Character.module.css';

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
    render(){
        return(
            <div className={styles.flipBox} onClick={()=>this.flipCard()}>
            <div className={this.state.flipped? `${styles.flipOver} ${styles.flipBoxInner}`:styles.flipBoxInner}>
              <div className={styles.flipBoxFront}>
                <img src={this.props.img} alt=""/>
              </div>
              <div className={styles.flipBoxBack}>
                <h2>Guess Who?!?</h2>
                <p>{this.props.name}</p>
              </div>
            </div>
          </div>
           
        )

    }
 
}

export default Character;