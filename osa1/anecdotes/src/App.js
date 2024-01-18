import { useState } from 'react';

// Enhanced data structure for anecdotes
const anecdotes = [
  { id: 1, text: 'If it hurts, do it more often.', points: 0 },
  { id: 2, text: 'Adding manpower to a late software project makes it later!', points: 0 },
  { id: 3, text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', points: 0 },
  // Additional anecdotes can be added here
];

const App = () => {
  const [anecdotesList, setAnecdotes] = useState(anecdotes);

  // Function to vote for an anecdote
  const vote = (id) => {
    const updatedAnecdotes = anecdotesList.map(anecdote =>
      anecdote.id === id ? { ...anecdote, points: anecdote.points + 1 } : anecdote
    );
    setAnecdotes(updatedAnecdotes);
  };

  // Function to add a new anecdote (Example)
  const addAnecdote = (text) => {
    const newAnecdote = { id: anecdotesList.length + 1, text, points: 0 };
    setAnecdotes(anecdotesList.concat(newAnecdote));
  };

  // Render the anecdotes
  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotesList.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.text} (Votes: {anecdote.points})</p>
          <button onClick={() => vote(anecdote.id)}>Vote</button>
        </div>
      ))}
      {/* Additional UI elements can be added here */}
    </div>
  );
};

export default App;