/* const Header = (props) => {
  return (
      <span>
        Name of the course is {props.course.name} 
      </span>
  )
}

const Content= (props) => {
  return (
    <span>
      <Part part={props.content[0].name} exercise={props.content[0].exercises}/>
      <br />
      <Part part={props.content[1].name} exercise={props.content[1].exercises}/>
      <br />
      <Part part={props.content[2].name} exercise={props.content[2].exercises}/>
    </span>
  )
}

const Part = (props) => {
  return (
    <span>
    <b>Content:</b> {props.part} <b>Num of exercises:</b> {props.exercise} 
    </span>
  )
}

const Total = (props)  => {
  return (
    <span> Total num of exercisess {props.total[0].exercises+props.total[1].exercises+props.total[2].exercises}</span>
  )
}
  
const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <h1>{course.name}</h1>

      <p>
        <Header course={course}/>
      </p>

       <p>
        <Content content={course.parts}/>
      </p>  

      <p>
         <Total total={course.parts}/> 
      </p>   

    </div>
  )
}

export default App

 */

/* const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App */


/* import { useState } from 'react'

const App = () => {

  const [ counter, setCounter ] = useState(0)


  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  console.log('rendering...', counter)


  return (
    <div>{counter}</div>
  )
}

export default App */


import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  console.log('rendering with counter value', counter)

  const increaseByOne = () => {

    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 

    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {

    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  console.log('heeeeeeeeey');
  

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  )
} 

export default App