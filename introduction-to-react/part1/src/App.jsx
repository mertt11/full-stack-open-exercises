const Header = (props) => {
  return (
      <span>
        Name of the course is {props.course} 
      </span>
  )
}

const Total = (props)  => {
  return (
    <span> Total num of exercisess {props.total}</span>
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

const App = () => {
  
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts=[
    part1,
    part2,
    part3,
  ]


  return (
    <div>
      <h1>{course}</h1>

      <p>
        <Header course={course}/>
      </p>

      <p>
        <Content content={parts}/>
      </p>

      <p>
         <Total total={part1.exercises+part2.exercises+part3.exercises}/> 
      </p>

    </div>
  )
}

export default App