
const Sum = ({parts}) => (
    parts.reduce((sum,item)=>(sum+item.exercises),0)
)

const Content2 = ({parts}) => {
    return (
        <b>Total of {Sum({parts})} exercises</b>
    ) 
}
export default Content2