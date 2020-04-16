import React from 'react';

export default function Question({ index, question, selectAnswer }) {
    const name = "q" + index;
    const ansId = j => name + "a" + j;

    return (<div className="question-cont">
        <div className="question">{question.text}</div>
        <div className="options">
            {question.options.map((o, j) =>
            <div className="option" key={j}>
                <input id={ansId(j)}
                    type="radio"
                    name={name}
                    checked={j === question.answer}
                    onChange={() => selectAnswer(index, j)}
                />
                <label htmlFor={ansId(j)}>{o}</label>
            </div>)}
        </div>
    </div>);
}