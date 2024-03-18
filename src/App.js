import './App.css';
import { useState, useEffect } from "react"

function App() {

  const [allData, setAllData] = useState([]);
  const [ques, setQuestion] = useState([]);

  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean")
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data)=>{
      setAllData(data.results);
      setQuestion(data.results[0]);
      // const rec = data.results[0];
      // console.log(ques);
      // console.log(allData);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
  },[]);


  return (
    <div className="App">
      <h1>Quiz App</h1>
      {
        <div>
          <h4>{ques.question}</h4>
          <button>{ques.correct_answer}</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button>{ques.incorrect_answers}</button>
        </div>
        // allData.map((item,id)=>{
        //   return (
        //     <div>
        //       <h4 key={id}>{item.question}</h4>
        //       <br></br>
        //       <br></br>
        //       <br></br>
        //     </div>
        //   )
        // })
      }
    </div>
  );
}

export default App;
