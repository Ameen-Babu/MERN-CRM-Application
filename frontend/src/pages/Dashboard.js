import React, { useEffect, useState } from "react";
import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        status: "",
        notes: ""
    });
    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const loadCustomers = async () => {
        try {
            const res = await getCustomers(token);
            setCustomers(res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name) return;
        try {
            if (editingId) {
                await updateCustomer(editingId, form, token);
            } else {
                await createCustomer(form, token);
            }
            setForm({ name: "", email: "", phone: "", status: "", notes: "" });
            setEditingId(null);
            loadCustomers();
        } catch {
            alert("Save failed");
        }
    };

    const handleEdit = (customer) => {
        setEditingId(customer._id);
        setForm({
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            status: customer.status || "",
            notes: customer.notes || ""
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this customer?")) return;
        await deleteCustomer(id, token);
        loadCustomers();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container">
            <h2>Customer Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>

            <form onSubmit={handleSubmit} className="form">
                <input
                    name="name"
                    placeholder="Name *"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                />
                <input
                    name="status"
                    placeholder="Status"
                    value={form.status}
                    onChange={handleChange}
                />
                <input
                    name="notes"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={handleChange}
                />
                <button type="submit">{editingId ? "Update" : "Add"} Customer</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>{c.status}</td>
                            <td>
                                <button onClick={() => handleEdit(c)}>Edit</button>
                                <button onClick={() => handleDelete(c._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
