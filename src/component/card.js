"use client";
import "@/style/style.css";
import "@/style/typo.css";
import Image from "next/image";
import { useEffect , useState } from "react";
import Link from "next/link";
import { loadTodos } from "@/lib/firebaseUtils";

export function TodoCard() {
    const [create, setCreate] = useState(false);
    const [todo, setTodo] = useState([]);

        const fetchTodos = async ()=>  {
            const data = await loadTodos();
            setTodo(data);
        };
        fetchTodos();

    return (
        <div>

            <div onClick={()=>setCreate(true)}>
            {todo.map((todo) => (
                <div key={todo.id} className="card-container">
                    <p className="head5 card-title">{todo.title}</p>
                    <p className="body2 card-description">{todo.desc}</p>
                    <p className="body3 card-deadline">마감일 : 2025. 00. 00</p>
                </div>
            ))}
            </div>


            {create && (
                <div className="main-overlay" onClick={()=> setCreate(false)}>
                {todo.map((todo) => (
                    <div key={todo.id} className="main-container" onClick={(e)=>e.stopPropagation()}>
                        <div className="main-title">
                            <p className="head3 main-title-text">{todo.title}</p>
                            <img src="/icon-cross.svg" width={24} height={24} onClick={()=> setCreate(false)}/>
                        </div>
                        <div className="main-state">
                            <h1 className="head4" style={{color:"black"}}> 버튼 자리</h1>
                            <h1 className="body2" style={{color:"black"}}> 만료일 선택 자리 </h1>
                        </div>
                        <div className="main-description">
                            <p className="body1 main-description-text">{todo.desc}</p>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}

export function HoldTodoButton() {
    const [create, setCreate] = useState(false);

    return (
        <div>
            <div onClick={()=>setCreate(true)}>
                <div className="holdcard">
                    <div className="holdcard-text">
                        <p className="head5">제목입니다. title is...</p>
                        <p className="body2">본문입니다. description is...  </p>
                    </div>
                </div>
            </div>

            {create && (
                <div className="main-overlay" onClick={()=> setCreate(false)}>
                    <div className="main-container" onClick={(e)=>e.stopPropagation()}>
                        <div className="main-title">
                            <p className="head3 main-title-text">제목입니다.</p>
                            <img src="/icon-cross.svg" width={24} height={24} onClick={()=> setCreate(false)}/>
                        </div>
                        <div className="main-state">
                            <h1 className="head4" style={{color:"black"}}> 버튼 자리</h1>
                            <h1 className="body2" style={{color:"black"}}> 만료일 선택 자리 </h1>
                        </div>
                        <div className="main-description">
                            <p className="body1 main-description-text">해야할 일을 적고 이제 하고 있는 일, 이미 끝난 일이 적혀있는 곳.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}