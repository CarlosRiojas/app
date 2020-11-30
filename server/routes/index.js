const express = require('express');
const router = express.Router();
const {
  createJob,
  deleteJob,
  getJobDetails,
  getUserJobs,
  updateJob
} = require('../controllers/jobs')


// ------------------JOB ROUTES------------------------

router.get('/jobs', getUserJobs);
router.get('/jobs/:jobId', getJobDetails)
router.post('/jobs', createJob)
router.put('/jobs/:jobId', updateJob)
router.delete('/jobs/:jobId', deleteJob)


module.exports = router;
