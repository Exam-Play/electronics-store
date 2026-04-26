function CheckBox({
    title
}:{
    title: string
}) {
    return <label className="check-item" tabIndex={0}>
        <input type="checkbox"/>
        <div className="checkmark"/>
        <p>{title}</p>
    </label>
}

export default CheckBox;