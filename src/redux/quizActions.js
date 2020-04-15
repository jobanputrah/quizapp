import { ACTION } from './constants';
import { fetchQuiz } from '../api';

export function loadQuiz (quizId) {
    return async function (dispatch) {
        dispatch({
            type: ACTION.LOAD_QUIZ,
            data: {
                quizId: quizId
            }
        });

        try {
            const quiz = await fetchQuiz(quizId);
            dispatch({
                type: ACTION.START_QUIZ,
                data: {
                    title: quiz.title,
                    questions: quiz.questions
                }
            });
        } catch (e) {
            // TODO: Throw error
            console.error(e);
        }
    };
}
