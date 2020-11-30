import React from 'react'
import { Card, Avatar, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography


function JobCard({ title, description, image, _id, company }) {
  return (
    <Card
      type="inner"
      title={title}
      extra={<Link to={`/job/${_id}`}>Details</Link>}
      style={{ marginBottom: '8px' }}
      hoverable
    >
      <center>
        <Avatar src={image} style={{ backgroundColor: 'white' }} />
        <Title level={4}>{company}</Title>
      </center>
      {description}
    </Card>
  )
}

export default JobCard
