import { useCallback } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, query , updateDoc ,orderBy, getDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";


// Firestore에서 Todos 불러오기

export const loadTodos = (callback) => {
  console.log("✅ loadTodos 함수 호출됨");
  const q = query(collection(db, "todos"), orderBy("createdAt","asc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    console.log("📸 스냅샷 도착!");
    const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(todos);
  }, (error) => {
    console.error("❌ onSnapshot 에러:", error);
  });

  return unsubscribe;
};

export const getTodoById = async (id) => {
  const ref = doc(db, "todos", id);
  const snap = await getDoc(ref);
  return {id:snap.id, ...snap.data()};
}

// Firestore에 Todo 추가하기
export const saveTodo = async (title, desc)=>{
    try {
        const docRef = await addDoc(collection(db, "todos"),{
            title,
            desc,
            createdAt : serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding document :", error)
    }
};
// Firestore에서 Todo 삭제하기

export const deleteTodo = async (id) => {

  if (!id) {
    console.error("deleteTodo에 전달된 id가 undefined입니다.");
    return;
  }

  try {
    await deleteDoc(doc(db, "todos", id));
    console.log("삭제 성공");
  } catch (error) {
    console.error("삭제 실패:", error);
  }
};

export const updateTodo = async (id, newTitle, newDesc) => {
  try {
    await updateDoc(doc(db, "todos", id), {
      title: newTitle,
      desc: newDesc,
    });
    console.log("수정 성공");
  } catch (error) {
    console.error("수정 실패:", error);
  }
};

