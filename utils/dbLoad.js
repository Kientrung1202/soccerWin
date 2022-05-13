const db = require("../db")
const loadQuery = (query) => new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
        if (err) reject(err);
        else {
            resolve(result);
        }
    })
})
module.exports.loadQuery = loadQuery;