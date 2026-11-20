const Person = ({ person, onDelete }) => (
  <p>
    {person.name} {person.number}
    <button onClick={() => onDelete(person.id, person.name)}>delete</button> 
  </p>
)

export default Person