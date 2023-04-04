import React from 'react'
import { useQuery  } from '@apollo/client'
import BornYearForm from './BornYear'
import { ALL_AUTHORS } from '../queries'

const Authors = ({show, notify}) => {
  const Oresult = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (Oresult.loading)  {
    return <div>Wait...</div>
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {Oresult.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <BornYearForm notify={notify} allAuthors={Oresult.data.allAuthors}/>
    </div>
  )
}

export default Authors
