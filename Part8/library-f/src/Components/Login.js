import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [Ousername, setOUsername] = useState('')
  const [Opassword, setOPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {    
      onError: (error) => {
        setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {    
      if ( result.data ) {      
          const token = result.data.login.value      
          setToken(token)      
          localStorage.setItem('library-user-token', token)    
        }  
    }, [result.data]) 
    
  const submit = async (event) => {
    event.preventDefault()
    
    login({ variables: { Ousername, Opassword } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username <input
           value={Ousername}
            onChange={({ target }) => setOUsername(target.value)}
          />
        </div>
        <div>
          Password <input
            type='Opassword'
            value={Opassword}
            onChange={({ target }) => setOPassword(target.value)}
          />
        </div>
        <button type='submit'>LogIn</button>
      </form>
    </div>
  )
}

export default LoginForm