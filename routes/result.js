const express = require('express');
const router = express.Router();

/* GET home page. */
//noinspection JSUnusedLocalSymbols
router.get('/', (req, res, next) => {
    res.render('result', { title: 'Express' });
});

module.exports = router;
