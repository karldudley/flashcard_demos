import { useState, useEffect, useRef } from 'react'
import axios from "axios";
import FlashcardList from './FlashcardList';
import './set.css'

function Set() {

   // new line start
  const [flashcards, setFlashcards] = useState(null)
  const [sets, setSets] =useState([])

  const setEl = useRef()

  useEffect(() => {
    axios
    .get('/sets')
    .then(res => {
      setSets(res.data)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    axios({
      method: "GET",
      url:`/flashcards/${setEl.current.value}`,
    })
    .then((response) => {
      const res = response.data
      setFlashcards(res)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="set">Set</label>
        <select ref={setEl} id="set">
          {sets.map(set => {
            return <option value={set.id} key={set.id}>{set.set_name}</option>
          })}
        </select>
      </div>
      <div className="form-group">
        <button className="btn">Generate</button>
      </div>
    </form>
      <div className="container">
        {flashcards ? <FlashcardList flashcards={flashcards} /> : <h3> Choose set and press Generate... </h3>}
      </div>
    </>
  );
}

export default Set;
