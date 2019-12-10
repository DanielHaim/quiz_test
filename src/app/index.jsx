import React, { useState, useEffect } from 'react';
import { Question } from "./question"



export const App = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [questionId, setQuestionId] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});
    const [finalGrade, setFinalGrade] = useState(undefined);
    let currentQuestion = questions[questionId];

    //load data
    useEffect(() => {
        var data = require('../utils/data.json');
        setQuestions(data.questions);
        setResponses(data.responses);
    }, []);

    //current question
    useEffect(() => {
        currentQuestion = questions[questionId];
    }, [questionId, questions]);
    
    const saveSelectedValues = (value) => {
        const id = questionId + 1;
        setSelectedValues({
            ...selectedValues,
            [id]: value 
        });
    }

    useEffect(() => { console.log(selectedValues) }, [selectedValues])

    const calculateGrade = () => {
        let grade = 0;
        console.log(selectedValues)
        responses.map((resp) => {
            if(selectedValues[resp.id]){
                if(selectedValues[resp.id] === resp.value){
                    grade = grade + (100/questions.length);
                }
            }
        })
        setFinalGrade(grade);
    }

    return (
        <div>
            {currentQuestion && !finalGrade &&
                <Question 
                    id={currentQuestion.id} 
                    title={currentQuestion.title} 
                    options={currentQuestion.options}
                    onSelect={saveSelectedValues} 
                    selectedValue={selectedValues[questionId + 1]}/>
            }
            {
                finalGrade && <h1>{finalGrade}</h1>
            }

            <div>
                <button onClick={() => setQuestionId(questionId - 1)} disabled={questionId === 0}>Prev</button>
                {
                    questionId < questions.length - 1 &&  
                        <button onClick={() => setQuestionId(questionId + 1)} >Next</button>
                }
                
                {
                    questionId === questions.length - 1 && 
                        <button onClick={() => calculateGrade()}>Done</button>
                }
            </div>
        </div>
    )
}