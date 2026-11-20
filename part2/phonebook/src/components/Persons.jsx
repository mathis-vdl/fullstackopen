import Person from './Person'

const Persons = ({ persons, onDelete }) => {
  console.log('Persons: ', persons.map(p => p.name))
  return (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default Persons