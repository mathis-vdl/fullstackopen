import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  const notify = (text) => {
    console.log("notif: ", text);
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log("load: ", initialPersons);
      setPersons(initialPersons);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("newName: ", newName);

    const existingPerson = persons.find((person) => person.name === newName);
    console.log("existing person: ", existingPerson);

    if (existingPerson) {
      const ok = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );
      if (!ok) {
        return;
      }

      const changedPerson = { ...existingPerson, number: newNumber };

      personService
        .update(existingPerson.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === existingPerson.id ? returnedPerson : person,
            ),
          );
          setNewName("");
          setNewNumber("");
          notify(`Changed number of ${returnedPerson.name}`);
        });
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      notify(`Added ${returnedPerson.name}`);
    });
  };

  const deletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) {
      return;
    }

    console.log("delete: ", id);

    personService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id != id));
    });
  };

  const handleNameChange = (event) => {
    console.log("input: ", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLocaleLowerCase()),
  );
  console.log(
    "person to show: ",
    personsToShow.map((p) => p.name),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
