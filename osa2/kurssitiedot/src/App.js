import React, { useState } from 'react';

// Enhanced Course structure with more details
const courses = [
  { id: 1, name: 'Half Stack application development', credits: 8, parts: [
    { name: 'Fundamentals of React', exercises: 10, hours: 25 },
    { name: 'Using props to pass data', exercises: 7, hours: 20 },
    { name: 'State of a component', exercises: 14, hours: 30 }
  ]},
  // Additional courses can be added here
];

const Course = ({ course }) => {
  // Calculating total exercises and total hours
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  const totalHours = course.parts.reduce((sum, part) => sum + part.hours, 0);

  return (
    <div>
      <h2>{course.name}</h2>
      <p>Credits: {course.credits}</p>
      {course.parts.map(part => (
        <p key={part.name}>{part.name} - {part.exercises} exercises - {part.hours} hours</p>
      ))}
      <strong>Total of {totalExercises} exercises and {totalHours} hours</strong>
    </div>
  );
};

const App = () => {
  const [coursesList, setCourses] = useState(courses);

  // Rendering the courses with additional details
  return (
    <div>
      <h1>Course Information</h1>
      {coursesList.map(course => <Course key={course.id} course={course} />)}
      {/* Space for additional UI elements and functionalities */}
    </div>
  );
};

export default App;