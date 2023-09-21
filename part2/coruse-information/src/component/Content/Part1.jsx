const Content1 = ({parts}) => {
    return (
        parts.map((part)=>
            <li key={part.id}>
                {part.name} {part.exercises}
            </li> 
        )
    ) 
}

export default Content1