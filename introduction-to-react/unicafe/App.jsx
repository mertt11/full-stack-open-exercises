import { useState } from 'react'

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = (props) => {
  return (
    <span>
      <h1>{props.course}</h1> 
    </span>
  )
}

const StatisticLine = (props) => {
  if(props.text==='positive'){
    return (
      <div>
        {props.text} {props.value} %
      </div>
    ) 
  }

  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = ({count}) => {
  let total=count[0]+count[1]+count[2];

  if(total===0){
    return (
      <div>No feedback given</div> 
    )
  }

  return (
    <div>
        <StatisticLine text="good" value ={count[0]} />
        <StatisticLine text="neutral" value ={count[1]} />
        <StatisticLine text="bad" value ={count[2]} />
        <StatisticLine text="all" value ={total} />
        <StatisticLine text="average" value ={(1*count[0]+0*count[1]+(-1*count[2]))/total} />
        <StatisticLine text="positive" value ={(count[0]/total)*100} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleLeftClick = () => {
    setGood(good+1);
  }

  const handleMiddleClick = () => {
    setNeutral(neutral+1);
  }

  const handleRightClick = () => {
    setBad(bad+1);
  }

  const course = {
    firstHeader:'give feedback',
    secondHeader:'statistics'
  }

  return (
    <div>

      <div>
        <Header course={course.firstHeader}/>
      </div>

      <p>
        <Button handleClick={handleLeftClick} text='good' />
        <Button handleClick={handleMiddleClick} text='neutral' />
        <Button handleClick={handleRightClick} text='bad' />
      </p>

      <div>
        <Header course = {course.secondHeader}/>
      </div> 

      <div>
        <Statistics count={[good,neutral,bad]}/>
      </div>

    </div>
  )
}

export default App
