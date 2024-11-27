const express=require('express')
const answerRoute=express.Router()
const {answer,allAnswers}=require('../controller/userAnswer')
const middleware = require('../middleware/auth')
answerRoute.post('/answers/:question_id',middleware,answer)
answerRoute.get('/answers/allanswers',middleware,allAnswers)



module.exports=answerRoute