import icon from "./assets/icon.svg"

export default function Header(){
    return (
        <div className="header">
            <img className="icon" height="40px" src={icon} alt="" />
            <h2>Meme-inator</h2>
        </div>
    )
}