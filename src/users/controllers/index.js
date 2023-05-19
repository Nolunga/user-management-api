const database = require('../../database.js')

const now = new Date().toISOString()

module.exports = {
  addUser: (request, response) => {
    const { userName, idNumber, gender } = request.body
    const createdAt = now
    const updatedAt = now

    return new Promise((resolve, reject) => {
      database.run(
        'INSERT INTO user (createdAt, updatedAt,user,idNumber,gender) VALUES (?,?,?,?,?)',
        [createdAt, updatedAt, userName, idNumber, gender],
        (error) => {
          if (error) {
            return reject(error)
          }
          resolve(response.status(200).send('Success'))
        }
      )
    })
  },
  updateUser: (request, response) => {
    const {
      id,
      contactNumber,
      contactEmail,
      addressNumber,
      addressStreet,
      addressSuburb,
      addressPostalCode
    } = request.body
    const updatedAt = now

    return new Promise((resolve, reject) => {
      database.run(
        'UPDATE user SET contactNumber = ?, contactEmail = ?, addressNumber = ?,addressStreet=?,addressSuburb=?,addressPostalCode=? WHERE id=?',
        [
          contactNumber,
          contactEmail,
          addressNumber,
          addressStreet,
          addressSuburb,
          addressPostalCode,
          id
        ],
        (error, rows) => {
          if (error) {
            return reject(error)
          }
          resolve(response.status(200).send('Success'))
        }
      )
    })
  },
  getUsers: (request, response) => {
    const { offset } = request.query
    return new Promise((resolve, reject) => {
      database.all('SELECT COUNT(*) FROM user', [], (error, rows) => {
        const total = rows[0]['COUNT(*)']
        const pages = Math.ceil(total / 5)
        database.all(
          'SELECT * FROM user LIMIT 5 OFFSET ?',
          [offset],
          (error, rows) => {
            if (error) {
              return reject(error)
            }
            const data = {
              users: rows,
              total,
              pages
            }
            resolve(response.status(200).send(data))
          }
        )
      })
    })
  },
  searchUsers: (request, response) => {
    const { search } = request.body
    return new Promise((resolve, reject) => {
      database.all(
        'SELECT * FROM user WHERE user LIKE ? OR idNumber LIKE ? LIMIT 5',
        ['%' + search + '%', '%' + search + '%'],
        (error, rows) => {
          if (error) {
            return reject(error)
          }
          resolve(response.status(200).send(rows))
        }
      )
    })
  }
}
