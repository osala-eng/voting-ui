import Voterkey from "./Voterkey"

const Balot = ({cands, vote}) => {
  return (
    <div className="balots">
         {
             cands.map((candidates)=>(
                 <Voterkey key={candidates.id} 
                 candidate={candidates.name}
                 vote = {vote}
                 idname = {candidates.id}
                 totVotes = {candidates.votes}
                 />
             ))
         }   
    </div>
  )
}

export default Balot