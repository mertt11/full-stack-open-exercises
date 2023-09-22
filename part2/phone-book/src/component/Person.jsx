const Pers = ({name, phone}) => (
    <li>{name} {phone}</li>
)

const Person = ({persons})  => (
    persons.map((person)=>
        < Pers key={person.id} name ={person.name} phone={person.phone}/>
    )
)

export default Person