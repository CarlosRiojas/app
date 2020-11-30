const express = require('express');
const router = express.Router();
const {
  createJob,
  deleteJob,
  getJobDetails,
  getUserJobs,
  updateJob
} = require('../controllers/jobs')
const { isAuth, catchErrs } = require('../middlewares')

// ------------------JOB ROUTES------------------------

router.get('/jobs', isAuth, catchErrs(getUserJobs));
router.get('/jobs/:jobId', isAuth, catchErrs(getJobDetails))
router.post('/jobs', isAuth, catchErrs(createJob))
router.put('/jobs/:jobId', catchErrs(updateJob))
router.delete('/jobs/:jobId', catchErrs(deleteJob))


module.exports = router;
