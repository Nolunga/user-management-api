const router = require('express').Router()
const { addUser, getUsers, updateUser } = require('../controllers')

router.post('/add-user', async (request, response) => {
  return addUser(request, response)
})

router.get('/get-users', async (request, response) => {
  return getUsers(request, response)
})

router.post('/update-user', async (request, response) => {
  return updateUser(request, response)
})

module.exports = router
