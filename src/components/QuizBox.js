import React, { useState } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import QuizReport from './QuizReport';
import LoadingButton from './LoadingButton';
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
    }

    const isLoading = currentView === VIEW.LOADING;

    return (
        <>
        {(currentView === VIEW.INIT || currentView === VIEW.LOADING)  &&
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="flx flx-left">
                    <input id="quiz-id" type="text" placeholder="Enter Quiz ID"
                        autoComplete="off"
                        disabled={isLoading}
                        value={quizId}
                        onChange={e => setQuizId(e.target.value)} />
                    <LoadingButton disabled={isLoading} loading={isLoading}>Start</LoadingButton>
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