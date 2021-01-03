import React from 'react';
import classes from './Question.module.css';
import Category from '../Category/Category';
import Chat from '../Chat/Chat';
import { ICharacter } from '../../App';

interface IProps{
    character: ICharacter | null;
}

const Question = (props: IProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<{id: number, title: string} | undefined>();
    const [selectedAttribute, setSelectedAttribute] = React.useState<string | null>(null);
    const [hidden, setHidden] = React.useState<boolean>(true);
    const [submittedQuestion, setSubmittedQuestion] = React.useState<string | null>(null);
    const [response, setResponse] = React.useState<boolean>(false);
    const [finalAnswer, setFinalAnswer] = React.useState<string>("");
    const [win, setWin] = React.useState<boolean | null>(null);

    const categories = [{ id: 0, title: "Hair Color", buttons: [{ text: "Blonde" }, { text: "Brown" }, { text: "Black" }, { text: "Red" }, { text: "Gray" }]},
    { id: 1, title: "Accessories", buttons: [{ text: "Glasses" }, { text: "Hat" }, { text: "Necklace" }] },
     { id: 2, title: "Age", buttons: [{ text: "Child" }, { text: "Adult" }, { text: "Elderly" } ]}, 
     { id: 3, title: "Gender", buttons: [{ text: "Male" }, { text: "Female" }, { text: "Uncertain" }]},
     { id: 4, title: "Species", buttons: [{ text: "Human" }, { text: "Animal" }, { text: "Uncertain" }]}
   ]
    const isSelected = (category : {id: number, title: string}) => {
        setSelectedCategory({ id: category.id, title: category.title });
    }

    const toggleCategory = () => {
        setHidden(!hidden);
    }

    const handleAttribute = (text: string) => {
        setSelectedAttribute(text);
        console.log(selectedAttribute);
    }
    //console.log(selectedCategory, selectedAttribute, submittedQuestion, props.character);
    const submitQuestion = (attribute: string) => {
        setSubmittedQuestion(attribute);
        console.log(submittedQuestion);
        if(props.character && selectedAttribute && selectedCategory){
            if(selectedCategory.id === 0){
                setResponse(selectedAttribute.toLowerCase() === props.character.hair_color);
            }else if(selectedCategory.id === 1){
                setResponse(selectedAttribute.toLowerCase() === props.character.accessory)
            } else if(selectedCategory.id === 2){
                setResponse(selectedAttribute.toLowerCase() === props.character.age);
            } else if(selectedCategory.id === 3){
                setResponse(selectedAttribute.toLowerCase() === props.character.gender);
            } else if(selectedCategory.id === 4){
                setResponse(selectedAttribute.toLowerCase() === props.character.species);
            }
        }
    }

    const clearQuestion = () => {
        setSelectedAttribute(null);
        setSelectedCategory(undefined);
        setHidden(true);
        setSubmittedQuestion(null);
    }
    const onChangeFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalAnswer(e.currentTarget.value);
    }

    const onSubmitFinal = () => {
        console.log(finalAnswer, props.character ? props.character.name : null);
        if(props.character && (finalAnswer.toLowerCase() === props.character.name.toLowerCase())){
            setWin(true);
        }else{
            setWin(false);
        }
    }

        return (
            <div className={classes.Question}>
                <p>Ask Me a Question</p>
                {categories.map((category, id) => {
                    return (
                    <Category
                        key={id}
                        id={id} 
                        title={category.title} 
                        buttons={category.buttons} 
                        onClick={() => {isSelected(category); toggleCategory();}} 
                        hide={hidden} 
                        selectedId={selectedCategory ? selectedCategory.id : undefined}
                        handleAttribute={handleAttribute}
                        />
                    )
                })
                }

                <Chat
                    attribute={selectedAttribute}
                    category={selectedCategory} 
                    submitQuestion={submitQuestion}
                    clearQuestion={clearQuestion}
                    answer={response}
                    submittedQuestion={submittedQuestion}
                    onSubmitFinal={onSubmitFinal}
                    onChangeFinal={onChangeFinal}
                    finalAnswer={finalAnswer}
                    win={win}
                    />
            </div>
        )

    }

export default Question;
