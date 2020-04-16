import { ACTION } from './constants';
import { fetchQuiz, verifyQuiz } from '../api';

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

export function selectAnswer(qIndex, aIndex) {
    return {
        type: ACTION.SELECT_ANSWER,
        data: {
            qIndex,
            aIndex,
        }
    };
}

export function submitQuiz() {
    return async function (dispatch, getState) {
        dispatch({
            type: ACTION.START_SUBMIT_QUIZ
        });

        try {
            const state = getState();
            const report = await verifyQuiz(state.quizId, state.questions.map(q => q.answer));

            dispatch({
                type: ACTION.SHOW_REPORT,
                data: {
                    score: report.score,
                }
            });
        } catch (e) {
            // TODO: Throw error
            console.error(e);
        }
    };
}