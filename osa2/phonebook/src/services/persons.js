import axios from "axios"
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => { return response.data})}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const removeID = async (id) => {
    axios.delete(`${baseUrl}/${id}`)
    const request = axios.get(baseUrl)
  const response = await request;
    return response.data;
}

const update = (id, newObject) => {
      const request = axios.put(`${baseUrl}/${id}`, newObject)
      return request.then(response => response.data).catch(error => {
        return ('fail')
      })
    
  }


export default { getAll, create, removeID, update}