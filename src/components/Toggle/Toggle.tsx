import * as React from 'react';
import styles from './Toggle.module.css';

interface IProps{
    onToggle: () => void;
}

const Toggle = (props: IProps) => {
    return (
        <div onClick={props.onToggle}>
            <label className={styles.switch}>
                <input type="checkbox"/>
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    )
}

export default Toggle;