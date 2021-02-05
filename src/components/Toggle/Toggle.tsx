import * as React from 'react';
import styles from './Toggle.module.css';

interface IProps{
    onToggle: (arg: boolean) => void;
    onOpenModal: (arg: boolean) => void;
}

const Toggle = (props: IProps) => {
    const [checked, setChecked] = React.useState<boolean>(false);
    const onChangeToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.checked);
        setChecked(e.currentTarget.checked);
        props.onToggle(e.currentTarget.checked);
        if(e.currentTarget.checked === true) props.onOpenModal(false);
    }

    return (
        <div className={styles.toggle}>
            Solo
            <label className={styles.switch}>
                <input type="checkbox" onChange={(e) => onChangeToggle(e)} checked={checked}/>
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            2 Player
        </div>
    )
}

export default Toggle;