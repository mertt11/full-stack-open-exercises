import Header from './Header'
import Content1 from './Content/Part1'
import Content2 from './Content/Part2'

const Course = ({ course }) => {
    return (    
      <div>
        <h1>Web developmen cirriculum</h1> 
        <Header name={course[0].name}/> 
        <Content1 parts={course[0].parts}/>  
        <Content2 parts={course[0].parts}/>    
        <Header name={course[1].name}/>  
        <Content1 parts={course[1].parts}/>  
        <Content2 parts={course[1].parts}/>
      </div>  
    )
}
  
export default Course