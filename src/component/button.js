"use client";
import "@/style/style.css";
import "@/style/typo.css";
import Image from "next/image";
import { useState } from "react";
import { saveTodo } from "@/lib/firebaseUtils";
import Link from "next/link";


export function SaveButton ({handleSave}) {
    return (
        <div className="create-button-layer" onClick={handleSave} >
            <img src="/icon-save.svg" width={20} height={20} style={{color:"white"}} />
            <h1 className="head5" style={{color:"white"}}>저장하기</h1>
        </div>
    )
}

export function HeaderHomeButton () {
    return (
        <Link href = "/" className="home-button">
            <img src="/icon-home.svg" width={16} height={16}/>
            <h1 className="body2">Home</h1>
        </Link>
    )
}

export function HeaderHoldButton () {
    return (
        <Link href="/hold" className="hold-button">
            <img src="/icon-hold.svg" width={16} height={16}/>
            <h1 className="body2">Hold</h1>
        </Link>        
    )
}

export function CreateButton() {
    const [create, setCreate] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const handleSave = async () => {
        if (!title.trim()) {
            alert("제목을 입력해주세요!!")
            return;
        }
        const id = await saveTodo(title, desc);
            alert(`"할 일이 저장되었습니다 !" (ID:${id})`);
            setTitle("");
            setDesc("");
            }

    return (
        <div>
            <div onClick={()=>setCreate(true)}>
                <img src="/icon-red-plus.svg" width={20} height={20} style={{cursor : "pointer", userSelect:"none"}}/>
            </div>

            {create && (
                <div className="main-overlay" onClick={()=> setCreate(false)}>
                    <div className="main-container" onClick={(e)=>e.stopPropagation()}>
                        <div className="main-title">
                            <input 
                            type="text" 
                            className="head3 main-title-text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)} 
                            placeholder="제목을 입력하세요."/>
                            <img src="/icon-cross.svg" width={24} height={24} onClick={()=> setCreate(false)}/>
                        </div>
                        <div className="main-state">
                            <h1 className="head4" style={{color:"black"}}> 버튼 자리</h1>
                            <h1 className="body2" style={{color:"black"}}> 만료일 선택 자리 </h1>
                        </div>
                        <div className="main-description">
                            <textarea
                            type="text"
                            className="body1 main-description-text"
                            value={desc}
                            onChange={(e)=>setDesc(e.target.value)} 
                            placeholder="할 일을 입력해주세요."/>
                        </div>
                        <SaveButton handleSave={handleSave}/>
                    </div>
                </div>
            )}
        </div>
    )
};
