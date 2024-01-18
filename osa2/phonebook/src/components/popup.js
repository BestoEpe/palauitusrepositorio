import '../popup.css'

const Popup = ({popupText}) => {

    if (popupText !== "") {
        return (
            <div className="popup">
                <h3>{popupText}</h3>
            </div>
        )
    } 
    return null
}
export default Popup;