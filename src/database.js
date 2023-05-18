const sqlite3 = require('sqlite3').verbose()

const database = new sqlite3.Database('./user-management.db')

const seedData = require('./ScreenMockupData.json')

/**
 *
 */
const createUserTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS user(
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      user text,
      idNumber text UNIQUE,
      gender text,
      contactNumber text,
      contactEmail text,
      addressNumber text,
      addressStreet text,
      addressSuburb text,
      addressPostalCode integer
    )`
  return database.run(query)
}

createUserTable()

const seedUserTable = () => {
  const now = new Date().toISOString()
  const createdAt = now
  const updatedAt = now
  seedData.map((userData) => {
    const { user, idnumber, gender, contactdetails, addressdetails } = userData
    const contactNumber = contactdetails.number
    const contactEmail = contactdetails.email
    const addressNumber = addressdetails.number
    const addressStreet = addressdetails.street
    const addressSuburb = addressdetails.suburb
    const addressPostalCode = addressdetails.postalcode

    database.run(
      'INSERT INTO user (createdAt,updatedAt,user,idNumber,gender,contactNumber,contactEmail,addressNumber,addressStreet,addressSuburb,addressPostalCode) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
      [
        createdAt,
        updatedAt,
        user,
        idnumber,
        gender,
        contactNumber,
        contactEmail,
        addressNumber,
        addressStreet,
        addressSuburb,
        addressPostalCode
      ],
      (error) => {
        if (error) {
          console.log('error seeding DB', error)
        } else {
          console.log('DB seeded')
        }
      }
    )
  })
}
//On First time running the backend - run this to populate the user table
// seedUserTable()

module.exports = database
