const Filter = (person, filter) => {
    console.log(person, filter)
    const result = person.toUpperCase().includes(filter.toUpperCase())
    if (result) {
        console.log("filter contains")
        return ( true)
    }
    console.log("filter false")
    return false
}
export default Filter 