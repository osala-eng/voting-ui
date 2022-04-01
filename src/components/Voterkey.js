
const Voterkey = ({candidate, vote,idname}) => {

  return (
    <button className='btn' onClick={()=>vote(idname)}>
        {candidate}
    </button>
  )
}

export default Voterkey