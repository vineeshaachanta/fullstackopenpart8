import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_OAUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'

const BookForm = ({show, notify}) => {
  const [Otitle, setOTitle] = useState('')
  const [Oauthor, setAuhtor] = useState('')
  const [Opublished, setOPublished] = useState(null)
  const [Ogenre, setOGenre] = useState('')
  const [Ogenres, setOGenres] = useState([])

  const [ OcreateBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ 
      { query: ALL_BOOKS }, 
      { query: ALL_OAUTHORS } 
    ],
    onError: (error) => {      
      notify(error.graphQLErrors[0].message)    
    }
  })
  
  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')
    OcreateBook({  variables: { Otitle, Oauthor, Opublished, Ogenres } })

    setOTitle('')
    setOPublished('')
    setAuhtor('')
    setOGenres([])
    setOGenre('')
  }

  const addOGenre = () => {
    setOGenres(Ogenres.concat(Ogenre))
    setOGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={Otitle}
            onChange={({ target }) => setOTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={Oauthor}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type='number'
            value={Opublished}
            onChange={({ target }) => setOPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={Ogenre}
            onChange={({ target }) => setOGenre(target.value)}
          />
          <button onClick={addOGenre} type="button">Add Genre</button>
        </div>
        <div>
          Genres: {Ogenres.join(' ')}
        </div>
        <button type='submit'>Create Book</button>
      </form>
    </div>
  )
}

export default BookForm