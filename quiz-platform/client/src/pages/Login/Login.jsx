import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

function Login() {

    const navigate = useNavigate();
    const auth = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
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

            const response = await login(form);

            auth.login(response.data.user, response.data.token);
            
            alert("Вход выполнен!");

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.error || "Ошибка входа");

        }

    };

    return (

        <div>

            <h1>Вход</h1>

            <form onSubmit={handleSubmit}>

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

                <button type="submit">
                    Войти
                </button>

            </form>

        </div>

    );

}

export default Login;