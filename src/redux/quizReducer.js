import { ACTION, VIEW } from './constants';

const INIT_STATE = {
    currentView: VIEW.INIT, // loading, error, started, ended
    quizId: null,
    quizTitle: null,
    questions: [],
    score: null
};

export default function quiz (state = INIT_STATE, action) {
    switch (action.type) {
        case ACTION.LOAD_QUIZ: {
            return {
                ...state,
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
        default: {
            console.warn('[reducer] Unhandled action ' + action.type);
            return state
        }
    }
}
