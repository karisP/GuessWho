import * as React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Toggle.module.css';
interface IParams{
    id: string;
  }
interface IProps{
    onToggle: (arg: boolean) => void;
    onOpenModal: (arg: boolean) => void;
}

const Toggle = (props: IProps) => {
    const params = useParams<IParams>();
    const [checked, setChecked] = React.useState<boolean>(false);

    //pre-set the toggle to 2 Player
    React.useEffect(() => {
        if(params.id) setChecked(true);
    }, [params.id]);

    const onChangeToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
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