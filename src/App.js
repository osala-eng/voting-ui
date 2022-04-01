import {useState} from 'react';
import Header from "./components/Header";
import Balot from "./components/Balot";
import Chart from './components/Chart';
import Db from './components/Db'
import Footer from './components/Footer';

function App() {
  // Candidates
  const candiDates = Db;
  let [newVotes] = useState({details: candiDates.map((data)=>data.votes)})
  let graph = {colors: ['red', 'green', 'blue', 'c4c4c4']}

  let [chartData, syNc] = useState(
    {
    
      labels : candiDates.map((data) => data.name),
      datasets : [{ 
        label: 'Polling results',
        data: newVotes.details,
        backgroundColor: graph.colors
      }]
    })

  //casting a vote
  const castBalot = (id) =>{
    newVotes.details[id-1]++
    syNc(
      {
        labels : candiDates.map((data) => data.name),
        datasets : [{ 
          label: 'Polling results',
          data: newVotes.details,
          backgroundColor: graph.colors
        }]
      }
    )
    console.log(`A vote has been cast for candidate ${id}`);
   
  }
  //poll

  return (
    <div className="app">
        <Header/>
        <Balot cands = {candiDates} 
          vote = {castBalot}/>
          <div className='chart-plot'>
             <Chart indata={chartData}/>
          </div>
          <Footer/>
       
    </div>
  );
}

export default App;
