function CheckBox({
    title,
    checked,
    onChange
}:{
    title: string,
    checked: boolean,
    onChange: () => void
}) {
    return <label className="check-item" tabIndex={0}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
        <div className="checkmark"/>
        <p>{title}</p>
    </label>
}

export default CheckBox;