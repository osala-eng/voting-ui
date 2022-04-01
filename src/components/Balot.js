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
                 />
             ))
         }   
    </div>
  )
}

export default Balot