import React from 'react';
import classes from './Question.module.css';


const Question = () => {
    return(
        <div className={classes.Question}>
            <div className={classes.hair}>
            <h3>Hair</h3>
            <button>Blonde</button>
            <button>Brunette</button>
            <button>Red</button>
            <button>Black</button>  
            <button>Long</button>
            <button>Short</button>
            <button>Bald</button>
            </div>
            <div className={classes.category}>
            <h3>Accessories</h3>
            <button>Glasses</button>
            <button>Hat</button>
            <button>Necklace</button>
            </div>
            <div className={classes.category}>
            <h3>Age</h3>
            <button>Child</button>
            <button>Young Adult</button>
            <button>Old</button>
            </div> 
            <div className={classes.category}>
            <h3>Gender</h3>
            <button>Male</button>
            <button>Female</button>
            </div>           
        </div>
    )
}

export default Question;