import React, { Component } from 'react';
import classes from './Question.module.css';
import Category from '../Category/Category';


class Question extends Component {
    state = {
        categories: [{ id: 0, title: "Hair", buttons: [{ text: "Blonde" }, { text: "Brown" }, { text: "Black" }, { text: "Red" }]},
         { id: 1, title: "Accessories", buttons: [{ text: "Glasses" }, { text: "Hat" }, { text: "Necklace" }] },
          { id: 2, title: "Age", buttons: [{ text: "Child" }, { text: "Adult" }, { text: "Elderly" } ]}, 
          { id: 3, title: "Gender", buttons: [{ text: "Male" }, { text: "Female" }, { text: "Uncertain" }]}
        ],
        selected: undefined,
        hidden: true
    }

    isSelected (id) {
        this.setState({ selected: id }, () => { 
          console.log(this.state.selected) })
      }

    toggleCategory = () => {
        this.setState({hidden: !this.state.hidden});
    }

    render() {
        return (
            <div className={classes.Question}>
                {this.state.categories.map((category, id) => {
                    return (<Category key={id} id={id} title={category.title} buttons={category.buttons} onClick={() => {this.isSelected(category.id); this.toggleCategory();}} hide={this.state.hidden} selectedId={this.state.selected}/>
                    )
                })
                }


            </div>
        )

    }

}

export default Question;


/* <div className={classes.hair}>
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
</div>    */