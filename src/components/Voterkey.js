
const Voterkey = ({candidate, vote, idname, totVotes}) => {

  return (
    <button className='btn' onClick={()=>vote(idname)}>
        <p>{candidate}</p>
        <p>{totVotes}</p>
    </button>
  )
}

export default Voterkey