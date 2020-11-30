import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Card, Button, Modal } from 'antd'
import { useContextInfo } from '../hooks/context'
import { getUsrJobs } from '../services/jobs'
import JobCard from '../components/JobCard'
import CreateJobForm from '../components/CreateJobForm'

const { Title, Text } = Typography

const Home = () => {
  const { user } = useContextInfo()
  const [jobs, setJobs] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function getJobs() {
      const { data } = await getUsrJobs()
      setJobs(data);
    }

    getJobs()
  }, [])
  // Para separar los trabajos por status, creamos un objeto que justo tenga una propiedad como arreglo para cada uno.
  const jobsFiltered = {
    'WISHLIST': [],
    'APPLIED': [],
    'INTERVIEW': [],
    'OFFER': [],
    'REJECTED': []
  }

  function addJob(job) {
    setJobs([...jobs, job])
    setShowModal(false)
  }
  // Iteramos los trabajos para acceder a su status y asignamos ese trabajo a la propiedad del estado al que corresponden.
  //Hacemos un tipo de push a la propiedad correspondiente del trabajo
  jobs.forEach(job => {
    jobsFiltered[job.status] = [...jobsFiltered[job.status], job]
  })

  return user ? (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button type="dashed" block size="middle" onClick={() => setShowModal(true)}>+</Button>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Card title="Wishlist">
          {jobsFiltered.WISHLIST.map(job => <JobCard key={job._id} {...job} />)}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Card title="Applied">
          {jobsFiltered.APPLIED.map(job => <JobCard key={job._id} {...job} />)}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Card title="Interview">
          {jobsFiltered.INTERVIEW.map(job => <JobCard key={job._id} {...job} />)}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Card title="Offer">
          {jobsFiltered.OFFER.map(job => <JobCard key={job._id} {...job} />)}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Card title="Rejected">
          {jobsFiltered.REJECTED.map(job => <JobCard key={job._id} {...job} />)}
        </Card>
      </Col>

      <Modal
        visible={showModal}
        title="Create a new job"
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <CreateJobForm addJob={addJob} />
      </Modal>
    </Row>
  ) : <>
      <Title level={1}>Huntfake</Title>
      <Text type="secondary">Start tracking your job applications</Text>
    </>
}

export default Home
