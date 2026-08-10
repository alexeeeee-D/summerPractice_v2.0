import api from "./api.js";

export async function getQuizzes() {
    return await api.get("/quizzes");
}

export async function createQuiz(data) {
    return await api.post("/quizzes", data);
}