import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "PARTICIPANT"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(form);

            alert("Регистрация успешна!");

            navigate("/login");

        } catch (error) {
            alert(error.response?.data?.error || "Ошибка регистрации");
        }
    };

    return (
        <div>
            <h1>Регистрация</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Имя"
                    value={form.username}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="PARTICIPANT">Участник</option>
                    <option value="ORGANIZER">Организатор</option>
                </select>

                <br /><br />

                <button type="submit">
                    Зарегистрироваться
                </button>

            </form>

        </div>
    );
}

export default Register;