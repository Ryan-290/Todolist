import Image from "next/image";
import "@/style/style.css";
import "@/style/typo.css";
import { CreateButton } from "@/component/button";
import { TodoCard } from "@/component/card";

export default function Home() {
  return (

  <div className="board-container">
    <div className="todo-container">
        <div className="todo-text">
            <p className="body1">할 일(To-Do)</p>
            <p className="body1" style={{flexGrow:1}}>002</p>
            <CreateButton/>
        </div>
        <TodoCard/>
    </div>

    <div className="ing-container">
        <div className="ing-text">
            <p className="body1">진행 중(-ing)</p>
            <p className="body1" style={{flexGrow:1}}>003</p>
        </div>
        <TodoCard/>
    </div>

    <div className="end-container">
        <div className="end-text">
            <p className="body1">완료(End)</p>
            <p className="body1" style={{flexGrow:1}}>004</p>
        </div>
        <TodoCard/>
    </div>
        
  </div>


  );
}