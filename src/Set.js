import { useState, useEffect, useRef } from 'react'
import axios from "axios";
import FlashcardList from './FlashcardList';
import './set.css'

function Set() {

   // new line start
  const [flashcards, setFlashcards] = useState(null)
  const [cardsets, setCardsets] =useState(null)

  const setEl = useRef()

  useEffect(() => {
    axios
    .get('https://my-study-club.herokuapp.com/sets')
    .then(res => {
      setCardsets(res.data)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    axios({
      method: "GET",
      url:`https://my-study-club.herokuapp.com/flashcards/${setEl.current.value}`,
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
          {cardsets ? cardsets.map(cardset => {
            return <option value={cardset.id} key={cardset.id}>{cardset.set_name}</option>
          }) : <option> Loading </option>}
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
