"use client";

import "@/style/style.css";
import "@/style/typo.css";
import { Children, useState } from "react";

const stateoptions = [
    { label: "할 일 (To-Do)", value: "todo" },
    { label: "진행 중 (-ing)", value: "ing" },
    { label: "완료 (End)", value: "end" },
    { label: "보류 (Hold)", value: "hold" }
];

export function StateClose ( {onClick, children} ) {
    return(
    <div className="state-button" onClick={onClick}>
        <div className="state-button-text body2"> {children} </div>
        <img src="/icon-angledown.svg" className="state-button-icon" />
    </div>
)}

export function StateOpen ( {onClick, children} ) {
   return(
        <div className="state-button-text body2" onClick={onClick}> {children} </div>
)}

export function StateButton ( {selected, setSelected} ) {
    const [open, setOpen] = useState(false);

    const ClickSelect = (newstate) => {
        setSelected(newstate);
        setOpen(false);
    }

    return (
      <div>
        <StateClose onClick={()=>setOpen(true)}>
            {stateoptions.find((s) => s.value === selected).label}
        </StateClose>

        {open && (
            <div className="state-button-open">
            {stateoptions.map((option)=>(
                <StateOpen key={option.value} onClick={()=>ClickSelect(option.value)}>
                    {option.label}
                </StateOpen>
            ))}
            </div>
        )}
      </div>
    );
}