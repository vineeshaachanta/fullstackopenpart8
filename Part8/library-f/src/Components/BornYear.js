import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { EDIT_BORN_YEAR, ALL_AUTHORS } from '../queries'


const BornYearForm = ({notify, allAuthors}) => {
  const [OnameOptions, setONameOptions] = useState(null)
  const [OsetBornTo, setBornYear] = useState('')

  const [ OchangeBornYear, Oresult ] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [ 
        { query: ALL_AUTHORS } 
      ]
  })

  const options = []
  allAuthors.forEach(author => options.push(
      {
        value: author.name,
        label: author.name
    }))
  
  const submit = (event) => {
    event.preventDefault()

    const name = OnameOptions.value

    OchangeBornYear({ variables: { name, OsetBornTo } })
    setONameOptions('')
    setBornYear('')
  }

  useEffect(() => {    
      if (Oresult.data && Oresult.data.editAuthor === null) {      
          notify('Author not found')    
        }  
    }, [Oresult.data])  // eslint-disable-line 

  return (
    <div>
      <h2>Set Birth Year</h2>

      <form onSubmit={submit}>
        <div>
          <Select
            value={OnameOptions}
            onChange={setONameOptions}
            options={options}
          />
        </div>
        <div>
          Born <input
            value={OsetBornTo}
            onChange={({ target }) => setBornYear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default BornYearForm