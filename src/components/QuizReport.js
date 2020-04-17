import React from 'react';
import { connect } from 'react-redux';
import { reset } from '../redux/quizActions';

function QuizReport({ title, score, reset }) {
    return (<div className="container">
        <h2>{title} - Report</h2>
        <h3>You scored {score} {score === 1 ? "point" : "points"}!</h3>
        <div className="flx flx-right">
            <button onClick={reset}>Take Another</button>
        </div>
    </div>);
}

function mapStateToProps(state) {
    return {
        title: state.quizTitle,
        score: state.score,
    }
}

export default connect(
    mapStateToProps,
    { reset }
)(QuizReport);