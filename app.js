const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')
const userRouter = require('./routes/api/user')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'common'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/contacts', contactsRouter)

app.use((err, req, res, next) => {
	res.status(400).json({ message: 'NOT_FOUND' })
})

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message })
})

module.exports = app
