import React from 'react'
import { Card, Avatar, Typography } from 'antd'
const { Title } = Typography
function JobCard({ title, description, image, _id, company }) {
  return (
    <Card
      type="inner"
      title={title}
      extra={<a href={`/job/${_id}`}>Details</a>}
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
