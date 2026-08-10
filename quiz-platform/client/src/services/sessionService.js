import api from "./api.js";

export async function getQuizzes() {
    return await api.get("/quizzes");
}
