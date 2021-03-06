import * as React from 'react';
import { ICharacter } from '../../App';
import styles from './Question.module.css';
import { ICategory, categories } from '../Category/Category';

interface IProps {
    addMessageToState: (message: string, fromUser: boolean) => void;
    character: ICharacter | null;
    onCountQuestions: () => void;
    onCountGuesses: () => void;
    onWin: (win: boolean) => void;
}

const questions = (category: ICategory, attribute: string) => [
    `Does your character have ${attribute} hair?`,
    `Does your character wear ${attribute === "hat" ? `a hat` : `glasses`}?`,
    `Is your character an ${attribute}?`,
    `Is your character of the ${attribute} ${category.title.toLowerCase()}?`,
    `Is your character a ${attribute} ${attribute === "staff" ? "member" : ''}?`,
    `Does your character have a ${attribute}?`,
    `Is your character ${attribute}?`,
    `Is your character's ${category.title.toLowerCase()} their ${attribute}?`,
    `Does your character have ${attribute}?`,

];

const Question = (props: IProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<ICategory | undefined>();
    const [finalAnswer, setFinalAnswer] = React.useState<string | undefined>();

    const onChangeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
        let selectedCategory = categories[parseInt(e.currentTarget.value)];
        if (selectedCategory) setSelectedCategory(selectedCategory);
    }
    const onChangeFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalAnswer(e.currentTarget.value);
    }

    const onChangeAttribute = (e: React.FormEvent<HTMLSelectElement>) => {
        if (selectedCategory !== undefined && selectedCategory.attributes) {
            let selectedAttribute = selectedCategory.attributes[parseInt(e.currentTarget.value)];
            let selectedAttributeTitle = selectedCategory.id === 7 ? selectedAttribute.title : selectedAttribute.title.toLowerCase();
            props.addMessageToState(questions(selectedCategory, selectedAttributeTitle)[selectedAttribute.questionId], true);
            submitQuestion(selectedAttribute.title.toLowerCase());
        }
    }

    const submitQuestion = (attribute: string) => {
        props.onCountQuestions();
        let response: boolean | undefined = undefined;
        if (props.character && attribute && selectedCategory) {
            if (selectedCategory.id === 0) {
                response = attribute === props.character.hairColor;
            } else if (selectedCategory.id === 1) {
                response = attribute === props.character.accessory;
            } else if (selectedCategory.id === 2) {
                response = attribute === props.character.age;
            } else if (selectedCategory.id === 3) {
                response = attribute === props.character.gender;
            } else if (selectedCategory.id === 4) {
                response = attribute === props.character.species;
            } else if (selectedCategory.id === 5) {
                response = attribute === props.character.role;
            } else if (selectedCategory.id === 6) {
                response = attribute === props.character.facialHair;
            } else if (selectedCategory.id === 7) {
                response = props.character.house ? attribute === props.character.house.toLowerCase() : false;
            } else if (selectedCategory.id === 8) {
                response = attribute === props.character.hairLength;
            } else if (selectedCategory.id === 9) {
                response = attribute === props.character.hairType;
            } else if (selectedCategory.id === 10) {
                response = attribute === props.character.definingFeature;
            }
        }
        //delay responses from AI chat so that it looks like it's thinking
        response !== undefined ?
            response === true ?
                setTimeout(() => props.addMessageToState("Yes", false), 3000)
                :
                setTimeout(() => props.addMessageToState("No", false), 3000)
            :
            setTimeout(() => props.addMessageToState("I don't know", false), 3000);
    }

    const onSubmitFinal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(finalAnswer && finalAnswer !== ""){
            props.addMessageToState(finalAnswer, true);
            if (props.character && (finalAnswer.toLowerCase() === props.character.name.toLowerCase())) {
                props.onWin(true);
                setFinalAnswer("");
            } else {
                props.onCountGuesses();
                props.onWin(false);
                props.addMessageToState("Not quite. Better study harder for your O.W.L.s.", false);
                setFinalAnswer("");
            }
        }
    }
    return (
        <div className={styles.questions}>
            <div>
                <select onChange={(e) => onChangeCategory(e)}>
                    <option hidden>Categories</option>
                    {categories.map(category => {
                        return (<option key={category.id} value={category.id}>{category.title}</option>)
                    })}
                </select>
                <select onChange={(e) => onChangeAttribute(e)}>
                    <option hidden>Attributes</option>
                    {selectedCategory ? categories[selectedCategory.id].attributes.map((attribute, index) => {
                        return (<option key={attribute.title} value={index}>{attribute.title}</option>)
                    }) : <option>Select category first</option>}
                </select>
            </div>
            <form onSubmit={onSubmitFinal}>
                <input placeholder="Enter your final guess" value={finalAnswer} onChange={(e) => onChangeFinal(e)}></input>
                <button type="submit" />
            </form>
        </div>

    )
}

export default Question;