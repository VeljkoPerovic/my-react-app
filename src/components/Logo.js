import logo from "../images/logo.png"
export default function Logo() {

    return (
        <div className="logoAndTitle">
            <img src={logo} className="App-logo" alt="logo" />
            <p className="headerParagraph">
                <b>Blue Grid App</b>
            </p>
        </div>
    )
}
