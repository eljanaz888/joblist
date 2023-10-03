
import React from "react";
import { Link } from "react-router-dom";

const JobSiteList = ({ jobSites, searchQuery }) => {
  const filteredJobSites = jobSites.filter((jobSite) =>
    jobSite.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <ul className='list-group'>
        {filteredJobSites.map((jobSite, index) => (
          <li
            key={jobSite.name}
            className={`list-group-item d-flex justify-content-evenly align-items-center ${
              index % 2 === 0 ? "bg-white" : "bg-light"
            }`}
          >
            <Link to={`/job-site/${jobSite.name}`} style={{width: '30%'}}>{jobSite.name}</Link>
            <span
            style={{width: '100px'}}
              className={`badge bg-${
                jobSite.status === "onRoad"
                  ? "warning"
                  : jobSite.status === "completed"
                  ? "success"
                  :  "danger"
              }`}
            >
              {jobSite.status}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default JobSiteList;