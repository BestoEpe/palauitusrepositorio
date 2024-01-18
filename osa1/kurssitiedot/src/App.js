import React, { useState } from 'react';

// Enhanced Course structure
const courses = [
  { id: 1, name: 'Half Stack application development', parts: [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]},
  // Additional courses can be added here
];

const Course = ({ course }) => {
  // Calculating total exercises
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => (
        <p key={part.name}>{part.name} - {part.exercises} exercises</p>
      ))}
      <strong>Total of {totalExercises} exercises</strong>
    </div>
  );
};

const App = () => {
  const [coursesList, setCourses] = useState(courses);

  // Function to add a new course part (Example)
  const addPart = (courseId, partName, partExercises) => {
    const updatedCourses = coursesList.map(course =>
      course.id === courseId
        ? { ...course, parts: [...course.parts, { name: partName, exercises: partExercises }] }
        : course
    );
    setCourses(updatedCourses);
  };

  // Render the courses
  return (
    <div>
      <h1>Course Information</h1>
      {coursesList.map(course => <Course key={course.id} course={course} />)}
      {/* Additional UI elements can be added here */}
    </div>
  );
};

export default App;