"use client";

import "@/style/style.css";
import "@/style/typo.css";
import Image from "next/image";
import { Children, useState, useEffect } from "react";
import { deleteTodo, saveTodo, updateTodo } from "@/lib/firebaseUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { format } from "date-fns"; 
import 'react-datepicker/dist/react-datepicker.css';
import { StateButton } from "./ statebutton";

export function SaveButton ({handleSave}) {
    return (
        <button className="create-button-layer" onClick={handleSave} >
            <img src="/icon-white-save.svg" width={20} height={20}/>
            <h1 className="head5" style={{color:"white"}}>저장하기</h1>
        </button>
    )
}

export function DateSelect ({className, children, deadlinedata, onchange}) {
    return (
        <DatePicker
            className={className}
            selected={deadlinedata}
            onChange={onchange}
            dateFormat = "yyyy년 MM월 dd일"
            isClearable>{children}</DatePicker>
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
    const [deadline, setDeadline] = useState(null);
    const [selected, setSelected] = useState("todo");
    const handleSave = async () => {
        if (!title.trim()) {
            alert("제목을 입력해주세요!!")
            return;
        }
        const id = await saveTodo(title, desc, deadline);
            setTitle("");
            setDesc("");
            setDeadline(null);
            setSelected("todo");
            setCreate(false);
        };

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
                            <StateButton className="head4" selected={selected} setSelected={setSelected}/>
                            <DateSelect 
                                className="body2"
                                deadlinedata={deadline}
                                onchange={(date) => setDeadline(date)}
                                > 만료일 선택
                            </DateSelect>
                            
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

export function CloseButton ({children, className}) {
    const router = useRouter();
    return (
        <div 
            onClick={()=>router.back()}
            className={className}
            >    
            {children}
        </div>
    )
}


export function DeleteButton ({ id, onDeleted, children, className}) {
    const [closeconfirm, setCloseconfirm] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        await deleteTodo(id);
        setCloseconfirm(false);
        onDeleted && onDeleted();
        router.push("/"); 
    }
    return (
      <div>
        {!closeconfirm ? (
            <div className={className} onClick={()=>setCloseconfirm(true)}>
            {children}
            </div>
        ) : (
            <div className = "delete-confirm-back">
                <div className="delete-confirm">
                    <h1 className="head4"> 정말 삭제하시겠습니까? </h1>
                    <div className="delete-clickbox">
                        <div className="delete-click head5" onClick={handleDelete}> 네 </div>
                        <div className="head5"> | </div>
                        <div className="delete-click head5" onClick={()=>setCloseconfirm(false)}> 아니요 </div>
                    </div>
                </div>
            </div>

        )}
      </div>
    )
};


export const EditButton = ({ todo, onUpdated, className, children }) => {
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo?.title || "");
    const [newDesc, setNewDesc] = useState(todo?.desc || "");
    const [newDeadline, setNewDeadline] = useState(todo?.deadline?.toDate ? todo.deadline.toDate() : null);
    const router = useRouter();

    const handleUpdate = async () => {
      await updateTodo(todo.id, newTitle, newDesc, newDeadline);
      setEditing(false);
      onUpdated && onUpdated(); // 수정 후 부모 컴포넌트에 알려줌
      router.push("/"); 
    };

    return (
      <div>
        {!editing ? (
        <div className={className} onClick={() => setEditing(true)}>
            {children}
        </div>
            ) : (
            <div className="main-overlay">
            <div className="main-container">
                <div className="main-title">
                    <input 
                        type="text" 
                        className="head3 main-title-text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}/>
                    <CloseButton>
                        <img src="/icon-cross.svg" className="close-button-icon"/>
                    </CloseButton>
                </div>
                <div className="main-state">
                    <h1 className="head4" style={{color:"black"}}> 버튼 자리</h1>
                    <DateSelect 
                        className="body2"
                        deadlinedata={newDeadline}
                        onchange={(date) => setNewDeadline(date)}
                        > 만료일 수정
                    </DateSelect>
                </div>
                <div className="main-description">
                    <textarea
                        type="text"
                        className="body1 main-description-text"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}/>
                </div>
                <div className="update-confirm" onClick={handleUpdate}>
                    <img src="/icon-confirm-white.svg" className="update-icon"/>
                    <h1 className="head5" style={{color:"white"}}>수정완료</h1>
                </div>
                <div className="update-cancel" onClick={() => setEditing(false)}>
                    <img src="/icon-white-cross.svg" className="update-icon"/>
                    <h1 className="head5" style={{color:"white"}}>수정취소</h1>
                </div>
            </div>
        </div>
        )}
      </div>
    );
  };
  