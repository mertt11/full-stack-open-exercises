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
      <Part part={props.content[0].part} exercise={props.content[0].exercise}/>
      <br />
      <Part part={props.content[1].part} exercise={props.content[1].exercise}/>
      <br />
      <Part part={props.content[2].part} exercise={props.content[2].exercise}/>
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

  const part1 = 'Fundamentals of React'
  const exercises1 = 10

  const part2 = 'Using props to pass data'
  const exercises2 = 7
  
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts=[
    {part:part1,exercise:exercises1},
    {part:part2,exercise:exercises2},
    {part:part3,exercise:exercises3},
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
         <Total total={exercises1+exercises2+exercises3}/> 
      </p>

    </div>
  )
}

export default App