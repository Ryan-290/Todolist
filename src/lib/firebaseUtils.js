import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, query , orderBy,getDocs, deleteDoc, doc } from "firebase/firestore";


// Firestore에서 Todos 불러오기
export const loadTodos = async () => {
  const q = query(collection(db, "todos"), orderBy("createdAt","desc"));
  const contentdata = await getDocs(q);
  return contentdata.docs.map((doc)=>({
    id : doc.id,
    ...doc.data()
  }));
};

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
  
};
