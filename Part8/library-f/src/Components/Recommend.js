import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ME, ALL_BOOKS_WITH_GENRE } from '../queries'

const Recommended = ({ show }) => {
  const user = useQuery(ME)
  const [OgetOFavoriteBooks, Oresult] = useLazyQuery(ALL_BOOKS_WITH_GENRE)
  const [OfavoriteBooks, setOFavoriteBooks] = useState([])

  useEffect(() => {
    if (Oresult.data) {
      setOFavoriteBooks(Oresult.data.allBooks)
    }
  }, [setOFavoriteBooks, Oresult])

  useEffect(() => {
    if (user.data) {
      OgetOFavoriteBooks({ variables: { genre: user.data.me.favoriteGenre } })
    }
  }, [OgetOFavoriteBooks, user])

  if (!show) {
    return null
  }

  return (
    <div>
      <p>
        Books in Your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {OfavoriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended