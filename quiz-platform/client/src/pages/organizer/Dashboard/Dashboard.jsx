import { useEffect, useState } from "react";
import { getQuizzes } from "../../../services/quizService.js";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        async function loadQuizzes() {

            try {

                const response = await getQuizzes();

                setQuizzes(response.data);

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.error ||
                    "Не удалось загрузить квизы"
                );

            } finally {

                setLoading(false);

            }
        }

        loadQuizzes();

    }, []);

    if (loading) {
        return <h2>Загрузка квизов...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>

            <h1>Панель организатора</h1>
            <button onClick={() => navigate("/organizer/create")}>
                Создать квиз
            </button>

            <h2>Мои квизы</h2>

            {quizzes.length === 0 ? (

                <p>У вас пока нет квизов.</p>

            ) : (

                quizzes.map((quiz) => (

                    <div key={quiz.id}>

                        <h3>{quiz.title}</h3>

                        <p>
                            {quiz.description || "Без описания"}
                        </p>

                        <p>
                            Категория: {quiz.category?.name}
                        </p>

                        <p>
                            Вопросов: {quiz.questions.length}
                        </p>

                        <p>
                            Время на вопрос: {quiz.timePerQuestion} сек.
                        </p>

                        <p>
                            Статус:{" "}
                            {quiz.isPublished
                                ? "Опубликован"
                                : "Черновик"}
                        </p>

                        <hr />

                    </div>

                ))

            )}

        </div>
    );
}

export default Dashboard;