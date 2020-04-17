import { ACTION, VIEW } from './constants';

const INIT_STATE = {
    currentView: VIEW.INIT,
    quizId: null,
    quizTitle: null,
    questions: [],
    score: null,
    errorMsg: null,
};

export default function quiz (state = INIT_STATE, action) {
    switch (action.type) {
        case ACTION.LOAD_QUIZ: {
            return {
                ...state,
                errorMsg: null,
                currentView: VIEW.LOADING,
                quizId: action.data.quizId,
            };
        }
        case ACTION.START_QUIZ: {
            return {
                ...state,
                currentView: VIEW.STARTED,
                quizTitle: action.data.title,
                questions: action.data.questions,
            }
        }
        case ACTION.START_QUIZ_FAIL: {
            return {
                ...state,
                currentView: VIEW.INIT,
                errorMsg: action.data.errorMsg,
            }
        }
        case ACTION.SELECT_ANSWER: {
            const { qIndex, aIndex } = action.data;
            return {
                ...state,
                questions: state.questions.map((q, i) => i !== qIndex ? q : {...q, answer: aIndex})
            };
        }
        case ACTION.START_SUBMIT_QUIZ: {
            return {
                ...state,
                errorMsg: null,
                currentView: VIEW.SUBMITTING
            }
        }
        case ACTION.FAIL_SUBMIT_QUIZ: {
            return {
                ...state,
                currentView: VIEW.STARTED,
                errorMsg: action.data.errorMsg,
            }
        }
        case ACTION.SHOW_REPORT: {
            return {
                ...state,
                errorMsg: null,
                currentView: VIEW.ENDED,
                score: action.data.score,
            }
        }
        case ACTION.RESET: {
            return INIT_STATE;
        }
        default: {
            console.warn('[reducer] Unhandled action ' + action.type);
            return state
        }
    }
}
