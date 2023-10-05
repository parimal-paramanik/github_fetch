
const express = require("express")
const UserRouter= express.Router()
UserRouter.use(express.json())

const {GithubGet,GithubPost} = require("../Controller/userController")

UserRouter.post("/",GithubPost )
UserRouter.get("/:id", GithubGet)

module.exports ={UserRouter}