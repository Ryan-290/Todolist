import "@/style/style.css";
import "@/style/typo.css";
import Image from "next/image";
import Link from "react-router-dom";
import {HeaderHomeButton} from "@/component/button.js"
import {HeaderHoldButton} from "@/component/button.js"

export default function Header () {
    return (

    <div className="header-container">
            <img src="/background.png"/>
        <div className="profile">
            <img src="/profile.png"/>
        </div>
        <div className="header-text">
            <h3 className="head3" style={{marginBottom : "16px"}}>RYAN’s To-Do-List</h3>
            <h3 className="body1">새벽의 어둠 속에서 사람들의 눈을 속인다면, 그 모든 것은 밝은 불빛 아래에서 다 드러나게 된다.</h3>
        </div>
        <HeaderHomeButton/>
        <HeaderHoldButton/>
    </div>
    );
}