import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Blog Ekleme
export const addBlog = async (blog) => {
    try {
        const blogRef = collection(db, "blogs");
        await addDoc(blogRef, blog);
        console.log("Blog başarıyla eklendi!");
    } catch (error) {
        console.error("Hata: ", error);
    }
};

// Blogları Listeleme
export const fetchBlogs = async () => {
    try {
        const blogRef = collection(db, "blogs");
        const snapshot = await getDocs(blogRef);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Hata: ", error);
        return [];
    }
};

// Blog Güncelleme
export const updateBlog = async (id, updatedData) => {
    try {
        const blogDoc = doc(db, "blogs", id);
        await updateDoc(blogDoc, updatedData);
        console.log("Blog başarıyla güncellendi!");
    } catch (error) {
        console.error("Hata: ", error);
    }
};

// Blog Silme
export const deleteBlog = async (id) => {
    try {
        const blogDoc = doc(db, "blogs", id);
        await deleteDoc(blogDoc);
        console.log("Blog başarıyla silindi!");
    } catch (error) {
        console.error("Hata: ", error);
    }
};

