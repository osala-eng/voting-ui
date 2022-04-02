import {useState, useEffect} from 'react';
import Header from "./components/Header";
import Balot from "./components/Balot";
import Chart from './components/Chart';
//import Db from './components/Db'
import Footer from './components/Footer';
import {API, graphqlOperation} from 'aws-amplify';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions'


function App() {
  const [candiDates, updateCandiDates] = useState([])
  let updateVotes = null

  useEffect(()=>{
    created()
    //Subscribe()
  },[])

  async function created() {
    try {
      const candidates = await API.graphql(graphqlOperation(queries.listCandidates))
      updateCandiDates(candidates.data.listCandidates.items)
      console.log('Candidates', candiDates)
    }
    catch (err) {
      console.log(`error fetching candidate information ... ${err}`);
    }
  }
  async function castVote(id){
    try{
      const vote = {id: id.toString()};
      API.graphql(graphqlOperation(mutations.openVote, {input: vote}));
    }
    catch(err){
      console.log('Voting failed with error...',err)
    }
  }
  async function Subscribe() {
    API.graphql(graphqlOperation(subscriptions.onCastVote)).subscribe({
      next: voteCasted  => {
        const id = voteCasted.value.data.onCastVote.id;
        const votes = voteCasted.value.data.onCastVote.votes;
        const candidates = this.candidates;
        const candidate = candidates.find(candidate => candidate.id === id);
        candidate.votes = votes;
        this.candidates = candidates;
        updateVotes = votes;
        
      }
    }); return updateVotes
  }
  let [chartData, updateChart] = useState({
    labels: candiDates.map((candidate) => candidate.name),
    datasets: [{
      label: false,
      data: candiDates.map((candidate) => candidate.votes),
      backgroundColor: ['#e53e3e', '#dd6b20', '#38a169', '#3182ce']
    }]
  })
 
  const castBalot = (id) => {
    console.log(id, Subscribe())
    castVote(id)
    updateChart(
      {
        labels: candiDates.map((candidate) => candidate.name),
        datasets: [{
          label: false,
          data: candiDates.map((candidate) => candidate.votes),
          backgroundColor: ['#e53e3e', '#dd6b20', '#38a169', '#3182ce']
        }]
      }
    )
  }
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
