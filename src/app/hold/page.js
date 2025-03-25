import Image from "next/image";
import "@/style/style.css";
import "@/style/typo.css";
import { HoldTodoButton } from "@/component/card";

export default function Hold() {
    return (
        <>
        <div className="hold-header">
            <div className="hold-header-text">
                <img src="/icon-hold.svg" width={24} height={24}/>
                <p className="head4">보류(Hold)</p>
            </div>
        </div>
        <div className="holdlist-container">
            <HoldTodoButton/>
        </div>
        </>
    )
}