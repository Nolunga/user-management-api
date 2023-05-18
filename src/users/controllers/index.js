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
    return new Promise((resolve, reject) => {
      database.all('SELECT * FROM user', [], (error, rows) => {
        if (error) {
          return reject(error)
        }
        resolve(response.status(200).send(rows))
      })
    })
  }
}
