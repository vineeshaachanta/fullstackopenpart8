import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_OBOOKS } from '../queries'

const OBooks = (props) => {
  const result = useQuery(ALL_OBOOKS)
  const [Obooks, setOBooks] = useState([])
  const [OfilteredOBooks, setOFilteredOBooks] = useState([])
  const [Ogenres, setOGenres] = useState([])
  const [OselectedGenre, setOSelectedGenre] = useState('')

  useEffect(() => {
    if (result.data) {
      const allOBooks = result.data.allOBooks
      setOBooks(allOBooks)
      let Ogenres = ['All Ogenres']
      allOBooks.forEach((element) => {
        element.Ogenres.forEach((g) => {
          if (Ogenres.indexOf(g) === -1) {
            Ogenres.push(g)
          }
        })
      })
      setOGenres(Ogenres)
      setOSelectedGenre('All Ogenres')
    }
  }, [result])

  useEffect(() => {
    if (OselectedGenre === 'All Ogenres') {
      setOFilteredOBooks(Obooks)
    } else {
      setOFilteredOBooks(
        Obooks.filter((b) => b.Ogenres.indexOf(OselectedGenre) !== -1)
      )
    }
  }, [Obooks, OselectedGenre])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Obooks</h2>
      <p>
        in genre <b>{OselectedGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {OfilteredOBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {Ogenres.length > 0 &&
          Ogenres.map((g) => (
            <button onClick={() => setOSelectedGenre(g)} key={g}>
              {g}
            </button>
          ))}
      </div>
    </div>
  )
}

export default OBooks