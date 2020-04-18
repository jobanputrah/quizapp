import React from 'react';
import { connect } from 'react-redux';
import QuizQuestion from './QuizQuestion';
import LoadingButton from './LoadingButton';
import { selectAnswer, submitQuiz } from '../redux/quizActions';
import { VIEW } from '../redux/constants';

function QuestionList({ currentView, title, questions, errorMsg, selectAnswer, submitQuiz }) {
    const isLoading = currentView === VIEW.SUBMITTING;

    return (
        <div className="container">
            <h2>{title}</h2>
            <div className="question-list">
                {questions.map((q, i) => <QuizQuestion key={i} index={i} question={q} selectAnswer={selectAnswer} />)}
            </div>
            <div className="flx flx-right">
                <div className="error">{errorMsg}</div>
                <LoadingButton
                    onClick={() => submitQuiz()}
                    disabled={isLoading}
                    loading={isLoading}>Submit</LoadingButton>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentView: state.currentView,
        title: state.quizTitle,
        errorMsg: state.errorMsg,
        questions: state.questions,
    }
}

export default connect(
    mapStateToProps,
    { selectAnswer, submitQuiz }
)(QuestionList);