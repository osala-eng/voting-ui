import { useState, useReducer } from 'react';
import Header from "./components/Header";
import Balot from "./components/Balot";
import Chart from './components/Chart';
import Footer from './components/Footer';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions'


const candiDates = {
 id:'', name: '', votes: null 
}

function reducer(state, action){
  switch(action.type){
    case 'UPDATE_UI':
      return {...state, votes: action.votes}
    case 'CAST_VOTE':
      return { ...state, [action.key]: action.value}
    default:
      return state
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer.candiDates)

  useEffect(() => {
    created()
  }, [])

  async function created() {
    try{
      const candidates = await API.graphql(graphqlOperation(queries.listCandidates))
      dispatch({ type: 'UPDATE_UI', votes: candidates.data.listCandidates.items})
      //updateCandiDates(candiDates = candidates.data.listCandidates.items)
    }
    catch(err){
      console.log("Error recieving data from the backend ",err)
    }
  }

  async function castVote(){
    const vote = 
  }

  let [chartData, updateChart] = useState({
    labels: candiDates.map((candidate) => candidate.name),
    datasets:
      [{
        label: "Poll results",
        data: candiDates.map((candidate) => candidate.votes),
        backgroundColor: ['#e53e3e', '#dd6b20', '#38a169', '#3182ce']
      }]
  })

  function method(id){
      const vote = {id: id.toString()};
      try{
        API.graphql(graphqlOperation(mutations.castVote, {input: vote})) &&
        console.log(`A vote has been cast for ${vote.id}`)
      }
      catch(err){
        console.log(err)
      }
    }
  API.graphql(graphqlOperation(subscriptions.onCastVote)).subscribe({
    next: voteCasted => {
      const id = voteCasted.value.data.onCastVote.id;
      const votes = voteCasted.value.data.onCastVote.votes;
      const candidates = this.candidates;
      const candidate = candidates.find(candidate => candidate.id === id);
      candidate.votes = votes;
      this.candidates = candidates;
    }
  })
  /* data(){
     return{
       candidates:[],
       candidatecolors: ['red','orange','green','blue']
     };
   }*/

  /* 
   methods: {
     castVote(candidateId){
       const vote = {id: candidateId};
       API.graphql(graphqlOperation(mutations.castVote, {input: vote}));
     }
   }
   mounted(){
     API.graphql(graphqlOperation(subscriptions.onCastVote)).subscribe({
       next: voteCasted => {
         const id = voteCasted.value.data.onCastVote.id;
         const votes = voteCasted.value.data.onCastVote.votes;
         const candidates = this.candidates;
         const candidate = candidates.find(candidate => candidate.id === id);
         candidate.votes = votes;
         this.candidates = candidates;
       }
     });
   }};
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
   //poll*/
  const castBalot = (id) => {
      method(id)
    
     
      
  
    updateChart({
      labels: candiDates.map((candidate) => candidate.name),
      datasets:
        [{
          label: "Poll results",
          data: candiDates.map((candidate) => candidate.votes),
          backgroundColor: ['#e53e3e', '#dd6b20', '#38a169', '#3182ce']
        }]
    })
  }

  return (
    <div className="app">
      <Header />
      <Balot cands={candiDates}
        vote={castBalot} />
      <div className='chart-plot'>
        <Chart indata={chartData} />
      </div>
      <Footer />

    </div>
  );
}
//
export default App;
