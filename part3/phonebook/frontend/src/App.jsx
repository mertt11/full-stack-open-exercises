import Person from './component/Person'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import personService from './services/persons';
import Notification  from './component/Notification';

import { useState, useEffect } from 'react'


const App = () => {

  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  const [message, setMessage] = useState('')
  const [className, setClassName]=useState('') 

  //codun tamamını render ediyor. Sonra useEffect calisiyor. Sonra tekrar kodun tamamını render ediyor
  useEffect(()=> {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons) 
    } )
  },[])

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

  const isNameSame = (newName) => {
    return persons.some((personObj)=>
        (JSON.stringify(personObj.name)===JSON.stringify(newName)))
  }

  const addName = (event) => {
    event.preventDefault()

    if(isNameSame(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        /* updatePerson(noteObject.name); */
      } 
    }else{
      personService
      .create({
        name: newName,
        number: newPhone,
      })
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson)) 
        setMessage(`Added ${newName}`)
        setClassName('success')
      })
      .catch(error => {
        setMessage(`${error.response.data.error}`)
        setClassName('error')
      }) 

      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
    setNewName('')
    setNewPhone('')
  }

  const deletePerson = (id) => {
    const person=persons.find(person=>person.id===id)
    if(window.confirm(`Delete ${person.name} ?`)){
      personService
      .deletePersn(id)
      .then(()=> {setPersons(persons.filter((person)=>person.id!==id))})
      .catch((error)=>{
        alert(error)

        setMessage(`Person '${person.name}' was already removed from server`)
        setClassName('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      });
    }
  }

/*   const updatePerson = (name) => {
    const person=persons.find(person=>person.name===name)
    const changedPerson={...person,number:newPhone}

    personService
    .update(person.id,changedPerson)
    .then(() => {
      setPersons(persons.map(pers=>(pers.name!==name?pers:changedPerson)))
    })
  } */

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter value={newFilter} handleNewFilter={handleNewFilter}/> 

      <Notification msg={message} className={className}/> 

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNewName={handleNewName}
        handleNewPhone={handleNewPhone}
        addName={addName}
      />

      <h2>Numbers</h2>
      <Person persons={personsToShow} deletePerson={deletePerson}/>

    </div>
  )
}

export default App