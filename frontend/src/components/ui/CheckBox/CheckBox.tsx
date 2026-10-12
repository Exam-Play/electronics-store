import styles from './CheckBox.module.scss'

interface CheckBoxProps {
    title?: string,
    name?: string,
    checked?: boolean,
    onChange?: () => void
    transition: boolean
}

export function CheckBox({ title, name, checked, onChange, transition }: CheckBoxProps) {
    return <label className={`${styles.checkItem} ${transition && styles.withTransition}`} tabIndex={0}>
        <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
        />
        <div className={styles.checkmark}/>
        {title && <p>{title}</p>}
    </label>
}