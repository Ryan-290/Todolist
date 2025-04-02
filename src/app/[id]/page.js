import "@/style/style.css";
import "@/style/typo.css";
import Image from "next/image";
import { getTodoById } from "@/lib/firebaseUtils";
import { CloseBlock, CloseButton, DeleteButton, EditButton } from "@/component/button";

export default async function ContentPage ({params}) {
    const resolvetodo = await params;
    const todo = await getTodoById(resolvetodo.id);
    const rawtodo = {
        id : todo.id,
        title : todo.title,
        desc : todo.desc
    }
    
    return (
        <div className="main-overlay">
            <div key={todo.id} className="main-container">
                <div className="main-title">
                    <p className="head3 main-title-text">{todo.title}</p>
                    <CloseButton>
                        <img src="/icon-cross.svg" className="close-button-icon"/>
                    </CloseButton>
                </div>
                <div className="main-state">
                    <h1 className="head4" style={{color:"black"}}> 버튼 자리</h1>
                    <h1 className="body2" style={{color:"black"}}> 만료일 선택 자리 </h1>
                </div>
                <div className="main-description">
                    <p className="body1 main-description-text">{todo.desc}</p>
                </div>
                <EditButton todo={rawtodo} className="update-button">
                    <img src="/icon-white-pencil.svg" className="update-icon"/>
                    <h1 className="head5" style={{color:"white"}}>수정하기</h1>
                </EditButton>
                <DeleteButton id={todo.id} className="delete-button">
                    <img src="/icon-white-trash.svg" className="delete-icon"/>
                    <h1 className="head5" style={{color:"white"}}>삭제하기</h1>  
                </DeleteButton>
            </div>
        </div>

    )
    
}