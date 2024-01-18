const Country = (country) => {

    console.log(typeof country)
    console.log(country)
    return(
        < div>
        <h1> {country.name.common}</h1>
        <p>capital {country.capital} </p>
        <p>area {country.area}</p>

        <h2>languages</h2>
        {
            Object.keys(country.languages).map((i) => (
                <li> 
                    {country.languages[i]}
                </li>
            )
        )}
        <div className='flag'> 
            {
            country.flag
            }
        </div>     
         </div>
         )
        
    
  }

  export default Country