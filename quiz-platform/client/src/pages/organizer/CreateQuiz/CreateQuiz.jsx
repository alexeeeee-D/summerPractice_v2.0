import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../../../services/quizService.js";

function CreateQuiz() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        categoryId: "",
        coverImage: "",
        timePerQuestion: 20
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {

        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            await createQuiz(form);

            navigate("/organizer");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.error ||
                "Не удалось создать квиз"
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <div>

            <h1>Создание квиза</h1>

            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Название
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Например: Java Core"
                        required
                    />
                </div>

                <div>
                    <label>
                        Описание
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Описание квиза"
                    />
                </div>

                <div>
                    <label>
                        ID категории
                    </label>

                    <input
                        type="number"
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        placeholder="Например: 1"
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label>
                        Обложка
                    </label>

                    <input
                        type="text"
                        name="coverImage"
                        value={form.coverImage}
                        onChange={handleChange}
                        placeholder="URL изображения"
                    />
                </div>

                <div>
                    <label>
                        Время на вопрос (секунды)
                    </label>

                    <input
                        type="number"
                        name="timePerQuestion"
                        value={form.timePerQuestion}
                        onChange={handleChange}
                        min="5"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Создание..."
                        : "Создать квиз"}
                </button>

            </form>

        </div>
    );
}

export default CreateQuiz;