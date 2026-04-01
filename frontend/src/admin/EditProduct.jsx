import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
    });

    const [loading, setLoading] = useState(true);

    // ✅ Load Single Product (Better way)
    const loadProduct = async () => {
        try {
            const res = await api.get(`/products/${id}`);
            setForm(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error loading product:", error);
            alert("Product not found");
            navigate("/admin/products");
        }
    };

    useEffect(() => {
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/products/update/${id}`, form);
            alert("Product Updated Successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Update failed");
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}