import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './Components/Writer'
import Books from './Components/Book'
import BookForm from './Components/BookF'
import LoginForm from './Components/Login'
import Recommended from './Components/Recommend'

const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  }  
  return (    
    <div style={{color: 'red'}}>    
    {errorMessage}    
    </div>  
    )
 }

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {    
    setErrorMessage(message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 10000)  
  }

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
      <button onClick={logout}>Logout</button>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('recommended')}>Recommended</button>
        <button onClick={() => setPage('add')}>Add Book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'} notify={notify}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended
        show={page === 'recommended'} notify={notify}
      />

      <BookForm
        show={page === 'add'} notify={notify}
      />
    </div>
  )
}

export default App