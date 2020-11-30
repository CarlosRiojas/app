import React, { useState, useEffect } from 'react'
import {
  Typography,
  Row,
  Col,
  Button,
  Skeleton,
  Steps,
  Divider,
  Avatar,
  Tag
} from 'antd'
import { getJobDetails } from '../services/jobs'
import { editJob } from '../services/jobs'

const { Title, Text } = Typography

const JobDetail = ({
  match: {
    params: {
      jobId
    }
  }
}) => {
  const [job, setJob] = useState({})

  useEffect(() => {
    async function getDetails() {
      const { data } = await getJobDetails(jobId)
      setJob(data);
    }

    getDetails()
  }, [jobId])

  async function handleStatus(status) {
    const updatedJob = { ...job, status }
    const { data: newJob } = await editJob(job._id, updatedJob)
    setJob(newJob)
  }

  const { title, image, company, description, salary, skills, status } = job

  const steps = ['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']

  return job.title ? (
    <Row gutter={[16, 16]}>
      <Col>
        <Title level={1}>{title}</Title>
        <Text type="secondary" style={{ fontSize: '1.7rem' }}>
          <Avatar src={image} />   {company} |&nbsp;
          {salary && <span style={{ fontSize: '1.2rem' }}>
            Salary:&nbsp;
            ${salary[0] / 100} - ${salary[1] / 100}
          </span>}
        </Text>
      </Col>
      <Divider>Description</Divider>
      <Col span={24}>{description}</Col>
      <Col span={24}>
        <Title level={5}>Skills: </Title>
      </Col>
      {
        skills.map((skill, i) => <Col key={i} span={6}>
          <Tag style={{ width: '100%' }}>{skill}</Tag>
        </Col>)
      }
      <Col span={24}>
        <Steps
          size="small"
          current={steps.indexOf(status)}
          status={job.status === 'REJECTED' ? 'error' :
            job.status === 'OFFER' ? 'finish' : 'process'
          }
        >
          <Steps.Step
            title='Wishlist'
            onClick={() => handleStatus('WISHLIST')}
          />
          <Steps.Step
            title='Applied'
            onClick={() => handleStatus('APPLIED')}
          />
          <Steps.Step
            title='Interview'
            onClick={() => handleStatus('INTERVIEW')}
          />
          <Steps.Step
            title='Offer'
            onClick={() => handleStatus('OFFER')}
          />
          <Steps.Step
            title='Rejected'
            onClick={() => handleStatus('REJECTED')}
          />
        </Steps>
      </Col>
    </Row >
  ) : (
      <Skeleton active />
    )
}

export default JobDetail
