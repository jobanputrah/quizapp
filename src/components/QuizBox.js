import React, { useState } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import { loadQuiz } from '../redux/quizActions';
import { VIEW } from '../redux/constants';

function QuizBox({ currentView, score, loadQuiz }) {
    const [ quizId, setQuizId ] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (quizId === "") {
            return;
        }

        loadQuiz(quizId);
    }

    return (
        <>
        {(currentView === VIEW.INIT || currentView === VIEW.LOADING)  &&
        <form onSubmit={handleSubmit}>
            <div className="container flx flx-left ">
                <input id="quiz-id" type="text" placeholder="Enter Quiz ID"
                    value={quizId}
                    onChange={e => setQuizId(e.target.value)} />
                <button>{currentView === VIEW.LOADING ? "..." : "Start"}</button>
            </div>
        </form>}
        {(currentView === VIEW.STARTED || currentView === VIEW.SUBMITTING) && <QuestionList />}
        {(currentView === VIEW.ENDED) && <h3>Score: {score}</h3>}
        </>
    );
}

function mapStateToProps(state) {
    return {
        currentView: state.currentView,
        score: state.score,
    }
}

export default connect(
    mapStateToProps,
    { loadQuiz }
)(QuizBox);