import React, { useState } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import { loadQuiz } from '../redux/quizActions';
import { VIEW } from '../redux/constants';

function QuizBox({ currentView, loadQuiz }) {
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
        {currentView === VIEW.STARTED &&
        <div className="container">
            <h2>Sample quiz</h2>
            <QuestionList questions={null}/>
        </div>}
        </>
    );
}

function mapStateToProps(state) {
    return {
        currentView: state.currentView
    }
}

export default connect(
    mapStateToProps,
    { loadQuiz }
)(QuizBox);