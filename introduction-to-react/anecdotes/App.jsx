import { useState } from 'react'

const Button = (props) => {
    return (
      <button onClick={props.handleClick} > 
        {props.text}
      </button>
    )  
}

const Display = (props) =>{
  if(props.voteGiven===true){
    return (
      <div>has {props.points[props.selected]} votes</div>
    )
  }
} 

  const Header = ({text})=>{
    return (
      <h1>{text}</h1>
    )
  }

  const pointss= (points) =>{
    for (const key in points) {
      console.log(`${key}: ${points[key]}`);
    }
    console.log("**********************************");
  }

  const MostVotes = (props) =>{
    return (
      <div> 
        {props.anecdotes[props.index]} 
        <br />
        has {props.maxPoint} votes
      </div>
    )
  }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteGiven,setVoteGiven]=useState(false);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [maxPoint, setMax] = useState(0);
  const [index, setIndex] = useState(0) 


  const handleButtonClick = () => {
    let random = Math.floor(Math.random()* anecdotes.length);
    setSelected(random);
  }

  const handleVoteClick = () => {

    const updatedPoints = {...points};
    updatedPoints[selected] += 1;
    setPoints(updatedPoints); 

    pointss(updatedPoints);

    setVoteGiven(true);
    getMax(updatedPoints)
  }
  
  const getMax = (updatedPoints) => {
    let max=0;
    let i=0;
    for( const k in updatedPoints){
      if(max<updatedPoints[k]){
        max=updatedPoints[k]
        i=k;
      }
    }
    setIndex(i)
    setMax(max)
  } 

  return (
    <div>
      <Header text='Anecdote of the day'/> 
      {anecdotes[selected]}
      <br />
      <Display voteGiven={voteGiven} selected={selected} points={points}/>   
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleButtonClick} text='next anectode' /> 
      <br />
      <Header text='Anecdote with most votes'/>  
      <MostVotes points={points} anecdotes={anecdotes} maxPoint={maxPoint} index={index}/> 
    </div>
  )

}

export default App 