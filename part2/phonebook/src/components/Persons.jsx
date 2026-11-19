import Person from './Person'

const Persons = ({ persons }) => {
  console.log('Persons reçoit:', persons.map(p => p.name))
  return (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  )
}

export default Persons