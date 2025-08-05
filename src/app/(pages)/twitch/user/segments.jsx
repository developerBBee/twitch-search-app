import { Box, Card, List } from '@mui/material'
import React from 'react'

const Segments = ({ segments }) => {
  return (
    <List>
      {segments.map((segment) => (
        <Segment key={segment.id} segment={segment} />
      ))}
    </List>
  );
}

const Segment = ({ segment }) => {
  return (
    <Card sx={{ margin: 1, padding: 2 }}>
      <h2>{segment.title}</h2>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <span>{segment.start_time}</span>
        <span>〜</span>
        <span>{segment.end_time}</span>
      </Box>
    </Card>
  )
}

export default Segments