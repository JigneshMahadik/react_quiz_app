import './App.css';
import { useState, useEffect } from "react"
import axios from "axios";

function App() {

  const [allData, setAllData] = useState([]);
  const [ques, setQuestion] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  // useEffect(()=>{
  //   fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return res.json();
  //   })
  //   .then((data)=>{
  //     setAllData(data.results);
  //     setQuestion(data.results[index]); //data.results[index]
  //   })
  //   .catch((error) => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });
  // },[]);

  useEffect(()=>{
    getData();
  },[]);
  
  async function getData(){
    try{
      const res = await axios.get("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple");
      const data = res.data;
      setAllData(data.results);
      setQuestion(data.results[index]); //data.results[index]
    }
    catch(error){
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  useEffect(()=>{
    setQuestion(allData[index]);
  },[index]);

  function checkAnswer(ans){
    if(count === 10){
      return;
    }
    if(ans === true){
      setIndex(prevIndex=>prevIndex+1);
      // setQuestion(allData[index]);
      setScore(prevScore=>prevScore+1);
    }
    else if(ans === false){
      setIndex(prevIndex=>prevIndex+1)
      // setQuestion(allData[index]);
    }
    setCount(prevCount=>prevCount+1);
  }


  return (
    <div className="App">
      <h1>Quiz App</h1>
      {
        
        <div>
          <h4>
          {
            count>9 ? <p></p> : <span>Q.{count+1}]&nbsp;</span>
          }
          {
            ques?.question
          }</h4>
          {
            count>9 ? <p></p> : <button onClick={()=>{checkAnswer(true)}}>{ques?.correct_answer}</button>
          }
          <br></br>
          <br></br>
          {
            ques?.incorrect_answers && ques?.incorrect_answers.map((item,id)=>{
              return(
                <div>
                  <button key={id} onClick={()=>{checkAnswer(false)}}>{item}</button><br></br><br></br>
                </div>
              )
            })
          }
          {
            count>9?<p id="score">Your Score is : {score}</p>:<p></p>
          }
          {/* <button>{ques.incorrect_answers}</button> */}
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
      {
        count>9 ? <p></p> : <button id="btnSkip" onClick={()=>{checkAnswer(false)}}>Skip Question</button>
      }
    </div>
  );
}

export default App;
