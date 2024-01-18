import Filter from './Filter'

const Person = ({ person, filter, remove}) => {
    console.log(person.number, filter)
     if (filter === '') {
         return(
        <li>{person.name + ' ' + person.number}
            <button onClick={remove}>{'delete'}</button>
        </li>
         )
        }

    if (!Filter(person.name, filter))
        {  
            console.log('filter not true')
            return(
                ''
             )
        }
    console.log('end of file' , person.number)
    return(
        <li>{person.name + ' ' + person.number}
        <button onClick={remove}>{'delete'}</button>
        </li>
         )
    
  }
  
  export default Person