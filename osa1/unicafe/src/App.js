import React, { useState } from 'react';

// Enhanced feedback structure
const initialFeedback = {
  good: 0,
  neutral: 0,
  bad: 0
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ feedback }) => {
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  if (totalFeedback === 0) {
    return <p>No feedback given</p>;
  }

  const average = (feedback.good - feedback.bad) / totalFeedback;
  const positivePercentage = (feedback.good / totalFeedback) * 100;

  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Average: {average}</p>
      <p>Positive: {positivePercentage} %</p>
    </div>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState(initialFeedback);

  const handleFeedback = (type) => {
    setFeedback({ ...feedback, [type]: feedback[type] + 1 });
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => handleFeedback('good')} text='Good' />
      <Button onClick={() => handleFeedback('neutral')} text='Neutral' />
      <Button onClick={() => handleFeedback('bad')} text='Bad' />
      <Statistics feedback={feedback} />
      {/* Additional UI elements can be added here */}
    </div>
  );
};

export default App;