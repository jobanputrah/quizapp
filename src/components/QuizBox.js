import React, { useState } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import QuizReport from './QuizReport';
import { loadQuiz } from '../redux/quizActions';
import { VIEW } from '../redux/constants';

function QuizBox({ currentView, errorMsg, loadQuiz }) {
    const [ quizId, setQuizId ] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (quizId === "") {
            return;
        }

        loadQuiz(quizId);
        setQuizId("");
    }

    return (
        <>
        {(currentView === VIEW.INIT || currentView === VIEW.LOADING)  &&
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="flx flx-left">
                    <input id="quiz-id" type="text" placeholder="Enter Quiz ID"
                        autoComplete="off"
                        value={quizId}
                        onChange={e => setQuizId(e.target.value)} />
                    <button>{currentView === VIEW.LOADING ? "..." : "Start"}</button>
                </div>
                <div className="error flx flx-right">{errorMsg}</div>
            </div>
        </form>}
        {(currentView === VIEW.STARTED || currentView === VIEW.SUBMITTING) && <QuestionList />}
        {(currentView === VIEW.ENDED) && <QuizReport />}
        </>
    );
}

function mapStateToProps(state) {
    return {
        currentView: state.currentView,
        errorMsg: state.errorMsg,
    }
}

export default connect(
    mapStateToProps,
    { loadQuiz }
)(QuizBox);