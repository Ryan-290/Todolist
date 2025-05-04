import { useCallback } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, query , updateDoc ,orderBy, getDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";


// Firestore에서 Todos 불러오기

export const loadTodos = (callback) => {
  const q = query(collection(db, "todos"), orderBy("createdAt","asc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
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
export const saveTodo = async (title, desc, deadline, selected)=>{
    try {
        const docRef = await addDoc(collection(db, "todos"),{
            title,
            desc,
            deadline,
            selected,
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
  } catch (error) {
    console.error("삭제 실패:", error);
  }
};

export const updateTodo = async (id, newTitle, newDesc, newDeadline) => {
  try {
    await updateDoc(doc(db, "todos", id), {
      title: newTitle,
      desc: newDesc,
      deadline : newDeadline
    });
  } catch (error) {
    console.error("수정 실패:", error);
  }
};

