import React, { useState, useEffect } from "react";
import { addBlog, fetchBlogs, updateBlog, deleteBlog } from "./firebaseFunctions";

function Tunbur() {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({
        title: "",
        subtitle: "",
        text: "",
        image: "",
        link: "",
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        const fetchedBlogs = await fetchBlogs();
        setBlogs(fetchedBlogs);
    };

    const handleAdd = async () => {
        if (editingId) {
            await updateBlog(editingId, newBlog);
            setEditingId(null);
        } else {
            await addBlog(newBlog);
        }
        setNewBlog({ title: "", subtitle: "", text: "", image: "", link: "" });
        loadBlogs();
    };

    const handleEdit = (blog) => {
        setNewBlog(blog);
        setEditingId(blog.id);
    };

    const handleDelete = async (id) => {
        await deleteBlog(id);
        loadBlogs();
    };

    return (


        <div className="admin-panel">
            <h2>Admin Paneli</h2>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Başlık"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Alt Başlık"
                    value={newBlog.subtitle}
                    onChange={(e) => setNewBlog({ ...newBlog, subtitle: e.target.value })}
                />
                <textarea
                    placeholder="Metin"
                    value={newBlog.text}
                    onChange={(e) => setNewBlog({ ...newBlog, text: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Resim URL"
                    value={newBlog.image}
                    onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Link"
                    value={newBlog.link}
                    onChange={(e) => setNewBlog({ ...newBlog, link: e.target.value })}
                />
                <button onClick={handleAdd} className="btn-submit">
                    {editingId ? "Güncelle" : "Ekle"}
                </button>
            </div>

            <h3>Mevcut Bloglar</h3>
            <ul className="blog-list">
                {blogs.map((blog) => (
                    <li key={blog.id} className="blog-item">
                        <h4>{blog.title}</h4>
                        <div className="blog-actions">
                            <button onClick={() => handleEdit(blog)} className="btn-edit">
                                Düzenle
                            </button>
                            <button onClick={() => handleDelete(blog.id)} className="btn-delete">
                                Sil
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tunbur;
