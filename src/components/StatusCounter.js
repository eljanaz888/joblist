import React from "react";
import { Button } from "react-bootstrap";

const StatusCounter = ({ onRoadCount, completedCount, onHoldCount }) => {
  return (
    <div className='d-flex justify-content-between mb-3'>
      <div className='status-box'>
        <Button
          style={{
            padding: "20px",
            fontSize: "24px",
            width: "400px",
            color: "white",
          }}
          variant='warning'
        >
          {onRoadCount} On Road
        </Button>
      </div>
      <div className='status-box'>
        <Button
          style={{
            padding: "20px",
            fontSize: "24px",
            width: "400px",
            color: "white",
          }}
          variant='success'
        >
          {completedCount} Completed
        </Button>
      </div>
      <div className='status-box'>
        <Button
          variant='danger'
          style={{
            padding: "20px",
            fontSize: "24px",
            width: "400px",
            color: "white",
          }}
        >
          {onHoldCount} On Hold
        </Button>
      </div>
    </div>
  );
};

export default StatusCounter;
