const express = require('express');
const router = express.Router();
const { addJob, getJobs } = require('../controllers/jobController');

router.post('/add', addJob);
router.get('/', getJobs);

module.exports = router;
