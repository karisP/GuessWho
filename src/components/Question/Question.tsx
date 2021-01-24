import * as React from 'react';
import { ICharacter } from '../../App';
import styles from './Question.module.css';
import { ICategory, categories } from '../Category/Category';

interface IProps {
    addMessageToState: (message: string, fromUser: boolean) => void;
    character: ICharacter | null;
    onCountQuestions: () => void;
    onWin: (win: boolean) => void;
}

const questions = (category: ICategory, attribute: string) => [
    `Does your character have ${attribute} ${category.title.toLocaleLowerCase()}?`,
    `Does your character wear ${attribute}?`,
    `Is your character ${attribute}?`,
    `Is your character of the ${attribute} ${category.title.toLowerCase()}?`,
    `Is your character a ${attribute}?`,
    `Does your character have ${category.title.toLowerCase()}?`,
    `Is your character's ${category.title.toLowerCase()} a ${attribute}?`,
];

const Question = (props: IProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<ICategory | undefined>();
    const [finalAnswer, setFinalAnswer] = React.useState<string>("");

    const onChangeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCategory(categories[parseInt(e.currentTarget.value)]);
    }
    const onChangeFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalAnswer(e.currentTarget.value);
    }

    const onChangeAttribute = (e: React.FormEvent<HTMLSelectElement>) => {
        if (selectedCategory) {
            props.addMessageToState(questions(selectedCategory, e.currentTarget.value.toLowerCase())[selectedCategory.questionId], true);
        }
        submitQuestion(e.currentTarget.value.toLowerCase());
    }

    const submitQuestion = (attribute: string) => {
        props.onCountQuestions();
        let response = undefined;
        if (props.character && attribute && selectedCategory) {
            if (selectedCategory.id === 0) {
                response = attribute === props.character.hairColor;
            } else if (selectedCategory.id === 1) {
                response = attribute === props.character.accessory;
            } else if (selectedCategory.id === 2) {
                response = attribute === props.character.age;
            } else if (selectedCategory.id === 3) {
                response = attribute === props.character.gender.trim();
            } else if (selectedCategory.id === 4) {
                response = attribute === props.character.species;
            } else if (selectedCategory.id === 5) {
                response = attribute === props.character.role;
            } else if (selectedCategory.id === 6) {
                response = props.character.facialHair;
            } else if (selectedCategory.id === 7) {
                response = attribute === props.character.house;
            } else if (selectedCategory.id === 8) {
                response = attribute === props.character.hairLength;
            } else if (selectedCategory.id === 9) {
                response = attribute === props.character.hairType;
            } else if (selectedCategory.id === 10) {
                response = attribute === props.character.definingFeature;
            }
        }

        response !== undefined ?
            response === true ?
                setTimeout(() => props.addMessageToState("Yes", false), 3000)
                :
                setTimeout(() => props.addMessageToState("No", false), 3000)
            :
            setTimeout(() => props.addMessageToState("I don't know", false), 3000);
    }

    const onSubmitFinal = () => {
        props.addMessageToState(finalAnswer, true);
        if (props.character && (finalAnswer.toLowerCase() === props.character.name.toLowerCase())) {
            props.onWin(true);
        } else {
            props.onWin(false);
            props.addMessageToState("Try again", false);
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
                    {selectedCategory ? categories[selectedCategory.id].attributes.map(attribute => {
                        return (<option key={attribute} value={attribute}>{attribute}</option>)
                    }) : <option>Select category first</option>}
                </select>
            </div>
            <div>
                <input placeholder="Enter your final guess" value={finalAnswer} onChange={(e) => onChangeFinal(e)}></input>
                <button type="button" onClick={onSubmitFinal}>Submit</button>
            </div>
        </div>

    )
}

export default Question;