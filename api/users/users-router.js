   
const express = require('express')
const router = express.Router()
const Users = require('./users-model')


router.get('/', (req, res, next) => {
    Users.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Users.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
})

  router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const changes = req.body
    Users.update(id, changes)
        .then((change) => {
            if( change === 1) {
                Users.findById(id)
                    .then(user => {
                        res.status(200).json({ message: `${user.username} has been updated`, user})
                    })
            }else{
                next()
            }
        })
  })

  router.delete('/:id', async (req, res, next) => {
      try {
        await Users.remove(req.params.id)
            .then(user => {
                res.status(202).json({ message:`${user.username} successfully removed.`, user})
            })
      } catch (err) {
          next()
      }
  })

module.exports = router




async function add(event) {
    return db('events').insert(event, 'event_id').then(([id]) => {
        return findById(id)
    })
}