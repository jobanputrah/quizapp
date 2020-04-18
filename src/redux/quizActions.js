import { ACTION } from './constants';
import { fetchQuiz, verifyQuiz } from '../api';

const errorMsgFor = code => {
    switch (code) {
        case 404: return 'No quiz with that ID';
        case 429: return 'Too many requests. Backend is rate limited to mitigate DoS. Please try again later.';
        default: return 'Oops! Something went wrong';
    }
}

export function loadQuiz (quizId) {
    return async function (dispatch) {
        dispatch({
            type: ACTION.LOAD_QUIZ,
            data: {
                quizId: quizId
            }
        });

        const response = await fetchQuiz(quizId);
        if (response.error) {
            const errorMsg = errorMsgFor(response.error);
            dispatch({
                type: ACTION.START_QUIZ_FAIL,
                data: { errorMsg }
            });
            return;
        }

        const quiz = response.data;
        dispatch({
            type: ACTION.START_QUIZ,
            data: {
                title: quiz.title,
                questions: quiz.questions
            }
        });
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

        const state = getState();
        const response = await verifyQuiz(state.quizId, state.questions.map(q => q.answer));
        if (response.error) {
            const errorMsg = errorMsgFor(response.error);
            dispatch({
                type: ACTION.FAIL_SUBMIT_QUIZ,
                data: { errorMsg }
            });
            return;
        }

        const report = response.data;
        dispatch({
            type: ACTION.SHOW_REPORT,
            data: {
                score: report.score,
            }
        });
    };
}

export function reset() {
    return {
        type: ACTION.RESET,
    }
}
