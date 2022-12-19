const router = require('express').Router()
const reviewcontroller = require('../Controllers/ReviewController')
const express = require('express');
const path = require('path')
const { check, validationResult } = require('express-validator');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post('/addreview'
// ,
//    [check('feedback').isLength({ min: 5}).isAlphanumeric().withMessage('Character only accepted '),
    
// ]
, reviewcontroller.review)
router.get('/getreview',reviewcontroller.getreview)
router.get('/getcount',reviewcontroller.getCount)
router.get('/getavg',reviewcontroller.getAvg)
router.get('/deletereview/:id', reviewcontroller.deletereview)




module.exports = router