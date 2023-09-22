 import Person from './component/Person'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm' 
import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  }

  const handleNewFilter = (event) => {
    const filteredValue=event.target.value
    setNewFilter(filteredValue)
    setShowAll(filteredValue.length === 0 ? true : false)
  }

  const personsToShow= showAll
    ? persons
    : persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const isNameSame = (noteObject) => {
    return persons.some((personObj)=>
        (JSON.stringify(personObj.name)===JSON.stringify(noteObject.name)))
  }

  const addName = (event) => {
    event.preventDefault()

    const noteObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    }

    if(isNameSame(noteObject)){
      alert(`${newName} is already added to phonebook`);
    }else{
      setPersons(persons.concat(noteObject))
    }
    setNewName('')
    setNewPhone('')
  }


  return (
    <div>

      <h2>Phonebook</h2>
      <Filter value={newFilter} handleNewFilter={handleNewFilter}/> 

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNewName={handleNewName}
        handleNewPhone={handleNewPhone}
        addName={addName}
      />

      <h2>Numbers</h2>
      <Person persons={personsToShow}/>

    </div>
  )
}

export default App