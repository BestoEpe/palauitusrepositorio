const Course = ({ course, parts}) => {
    const arr = []
    parts.forEach(element => {
        arr.push(element.exercises)
    });
    const total = arr.reduce( (s, p) => s + p , 0 )

    return(
        <div>
        <h1>{course.name}</h1>
        <ul>
            {parts.map(part =>
                <li key = {part.id}>
                    {part.name + " " + part.exercises}
                </li>
                )}
        </ul>
        <b>Total of {total} exercises</b>

        </div>
    )
}



export default Course