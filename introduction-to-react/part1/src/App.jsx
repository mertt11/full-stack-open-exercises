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

  const parts=[
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
         <Total total={parts[0].exercises+parts[1].exercises+parts[2].exercises}/> 
      </p>

    </div>
  )
}

export default App