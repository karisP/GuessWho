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
        selectedCategoryId: undefined,
        selectedCategoryTitle: undefined,
        selectedAttribute: null,
        hidden: true,
        submittedQuestion: null,
        response: "yes"
    }

    isSelected (category) {
        this.setState({ selectedCategoryId: category.id, selectedCategoryTitle: category.title });
    }

    toggleCategory = () => {
        this.setState({hidden: !this.state.hidden});
    }

    handleAttribute = (e) => {
        this.setState({selectedAttribute: e}, () => console.log(this.state.selectedAttribute));
    }

    submitQuestion = (e) => {
        this.setState({submittedQuestion: e}, () => console.log(this.state.submittedQuestion));
    }

    clearQuestion = () => {
        this.setState({selectedAttribute: null, selectedCategoryTitle: undefined, hidden: true, submittedQuestion: null});
    }


    render() {
        return (
            <div className={classes.Question}>
                <p>Ask Me a Question</p>
                {this.state.categories.map((category, id) => {
                    return (
                    <Category
                        key={id}
                        id={id} 
                        title={category.title} 
                        buttons={category.buttons} 
                        onSelectButton={this.handleButton} 
                        onClick={() => {this.isSelected(category); this.toggleCategory();}} 
                        hide={this.state.hidden} 
                        selectedId={this.state.selectedCategoryId}
                        handleAttribute={this.handleAttribute}
                        />
                    )
                })
                }

                <Chat
                    attribute={this.state.selectedAttribute}
                    categoryTitle={this.state.selectedCategoryTitle} 
                    categoryId={this.state.selectedCategoryId}
                    submitQuestion={this.submitQuestion}
                    clearQuestion={this.clearQuestion}
                    answer={this.state.response}
                    submittedQuestion={this.state.submittedQuestion}
                    />
            </div>
        )

    }

}

export default Question;
