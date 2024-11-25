const {questions,allquestions}=require('../controller/userQuestion')
const express = require("express");
const middleware =require('../middleware/auth')
const questionRouter = express.Router();

questionRouter.post("/questions",middleware, questions);
questionRouter.get("/question/allquestions",middleware, allquestions)



module.exports=questionRouter
