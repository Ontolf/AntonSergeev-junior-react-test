import "./Header.css";
import {Link} from "react-router-dom";

export default function Header({navigation, currencySwitcher, cartOverlay}) {
    return (
        <div className={"header"}>
            {navigation}
            <div className={"logo-holder "}>
                <Link to={"/"} className={"link-styles-none"}>
                    <img src={"./logo.png"} alt=""/>
                </Link>
            </div>
            <div className={"interaction-container"}>
                {currencySwitcher}
                {cartOverlay}
            </div>
        </div>
    )
}