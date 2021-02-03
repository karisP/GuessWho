import * as React from 'react';
import styles from './Toggle.module.css';

interface IProps{
    onToggle: (arg: boolean) => void;
}

const Toggle = (props: IProps) => {
    const [checked, setChecked] = React.useState<boolean>(false);
    const onChangeToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setChecked(prevState => !prevState);
        props.onToggle(checked);
    }

    return (
        <div>
            <label className={styles.switch}>
                <input type="checkbox" onChange={(e) => onChangeToggle(e)} checked={checked}/>
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    )
}

export default Toggle;