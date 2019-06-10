import React, { Component } from 'react';
import classes from './Question.module.css';
import Category from '../Category/Category';
import Chat from '../Chat/Chat';


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
                <p>Ask Me a Question</p>
                {this.state.categories.map((category, id) => {
                    return (<Category key={id} id={id} title={category.title} buttons={category.buttons} onSelectButton={this.handleButton} onClick={() => {this.isSelected(category.id); this.toggleCategory();}} hide={this.state.hidden} selectedId={this.state.selected}/>
                    )
                })
                }

                <Chat/>
            </div>
        )

    }

}

export default Question;
