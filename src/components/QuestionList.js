import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

    function fetchingQuiz(){
      fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then((data) => { setQuestions(data)})
  }

    useEffect(() => {
      return ( fetchingQuiz())
    }, [])


    function deleteQuestion(id){
      fetch(`http://localhost:4000/questions${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(() => {
        const updatedtedQuizList = questions.filter(question => question.id !== id)
        setQuestions(updatedtedQuizList)
      })
    }


    const renderQuestion = questions.map((question) => <QuestionItem key={question.id} 
    question={question} 
    onDeleteClick={deleteQuestion}/>)


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderQuestion}</ul>
    </section>
  );
}

export default QuestionList;
