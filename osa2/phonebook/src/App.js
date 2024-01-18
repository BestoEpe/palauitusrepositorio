import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Person = ({ person }) => <p>{person.name} - {person.phone}</p>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    axios.get('https://example.com/api/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, phone: newPhone };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      {persons.map(person => <Person key={person.name} person={person} />)}
      {/* Space for additional features and UI improvements */}
    </div>
  );
};

export default App;