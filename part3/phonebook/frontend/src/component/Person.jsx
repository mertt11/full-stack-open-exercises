const Person = ({ persons, deletePerson }) => (
    persons.map((person) =>
      <Pers key={person.id} name={person.name} number={person.number} deletePerson={()=>{deletePerson(person.id)}} />
    )
  )
  
  const Pers = ({ name, number, deletePerson }) => (
    <li>
      {name} {number}
      <button onClick={deletePerson}>delete</button>
    </li>
  )
  
export default Person