const Job = require('../models/Job')
const User = require('../models/User')

exports.getUserJobs = async (req, res) => {
  const { user: { id } } = req
  const { jobs } = await User.findById(id).populate('jobs')

  res.status(200).json(jobs)
}

exports.getJobDetails = async (req, res) => {
  const { jobId } = req.params
  const job = await Job.findById(jobId)

  res.status(200).json(job)
}

exports.createJob = async (req, res) => {
  const {
    title,
    company,
    location,
    description,
    salary,
    skills,
    image,
    status
  } = req.body
  const { user: { id } } = req
  const newJob = await Job.create({
    title,
    company,
    location,
    description,
    salary,
    skills,
    image,
    status
  })

  await User.findByIdAndUpdate(id, { $push: { jobs: newJob._id } })

  res.status(201).json(newJob)

}

exports.updateJob = async (req, res) => {
  const { jobId } = req.params
  const {
    title,
    company,
    location,
    description,
    salary,
    skills,
    image,
    status
  } = req.body

  const updatedJob = await Job.findByIdAndUpdate(jobId, {
    title,
    company,
    location,
    description,
    salary,
    skills,
    image,
    status
  }, { new: true })

  res.status(200).json(updatedJob)
}

exports.deleteJob = async (req, res) => {
  const { jobId } = req.params
  await Job.findByIdAndDelete(jobId)
  res.status(200).json({ message: 'Job deleted' })
}