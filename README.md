첫 번째 프로젝트 : 투두리스트

라언의 첫 번째 프로젝트입니다. 

메모장용 코드

import { db } from "./firebase"; // 너가 만든 Firebase 설정 파일 경로
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

// 삭제 함수
export const deleteItem = async (id) => {
  try {
    await deleteDoc(doc(db, "yourCollectionName", id));
    console.log("삭제 성공");
  } catch (error) {
    console.error("삭제 실패:", error);
  }
};

// 수정 함수
export const updateItem = async (id, newTitle, newDesc) => {
  try {
    await updateDoc(doc(db, "yourCollectionName", id), {
      title: newTitle,
      desc: newDesc,
    });
    console.log("수정 성공");
  } catch (error) {
    console.error("수정 실패:", error);
  }
};


import { useState } from "react";
import { deleteItem, updateItem } from "../../firebase/firebaseutils";

export const DeleteButton = ({ id, onDeleted }) => {
  const handleDelete = async () => {
    if (confirm("정말 삭제할까요?")) {
      await deleteItem(id);
      onDeleted && onDeleted(); // 삭제 후 부모 컴포넌트에 알려줌 (리렌더링용)
    }
  };

  return <button onClick={handleDelete}>삭제</button>;
};

export const EditButton = ({ item, onUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [newDesc, setNewDesc] = useState(item.desc);

  const handleUpdate = async () => {
    await updateItem(item.id, newTitle, newDesc);
    setEditing(false);
    onUpdated && onUpdated(); // 수정 후 부모 컴포넌트에 알려줌
  };

  return (
    <div>
      {editing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="제목"
          />
          <input
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="설명"
          />
          <button onClick={handleUpdate}>저장</button>
          <button onClick={() => setEditing(false)}>취소</button>
        </>
      ) : (
        <button onClick={() => setEditing(true)}>수정</button>
      )}
    </div>
  );
};

