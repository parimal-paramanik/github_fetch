const express = require("express")
const { userModel } = require("../model/userModel")
const axios = require("axios")

// save the data into database 
const GithubPost = async (req, res) => {
    try {
        const { url } = req.body
        const response = await axios.get(url);
        const fetcheddata = response.data
        // Loop through GitHub repos and add them to MongoDB
        for (let repo of fetcheddata) {
            const isPresent = await userModel.findOne({ id: repo.id });
            if (isPresent) {
                return res.status(400).send("user already present in the mongodb")
            }

            const user = new userModel({
                id: repo.id,
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description,
                created_at: repo.created_at,
                open_issues: repo.open_issues,
                watchers: repo.watchers,
                owner: {
                    id: repo.owner.id,
                    avatar_url: repo.owner.avatar_url,
                    html_url: repo.owner.html_url,
                    type: repo.owner.type,
                    site_admin: repo.owner.site_admin,
                },
            });
            await user.save();
        }
        res.status(200).json({ msg: "Users saved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get request to retrieve user from github
const GithubGet = async (req, res) => {
    try {
        const repoID = req.params.id
        const repo = await userModel.findOne({ id: repoID });
        if (!repo) {
            res.status(404).json({ error: 'GitHub repo not found' });
        }
        res.status(200).json(repo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { GithubGet, GithubPost }