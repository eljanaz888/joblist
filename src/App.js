import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobSiteDetail from "./components/JobSiteDetail";
import JobSiteList from "./components/JobSiteList";
import SearchBar from "./components/SearchBar";
import StatusCounter from "./components/StatusCounter";
import CreateButton from "./components/CreateButton";
import CreateJobSiteModal from "./components/CreateJobSiteModal";

const App = () => {
  const [onRoadCount, setOnRoadCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [onHoldCount, setOnHoldCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [jobSites, setJobSites] = useState(
    JSON.parse(localStorage.getItem("jobSites")) || [],
  );
  const [searchQuery, setSearchQuery] = useState("");

  const saveJobSite = (jobSite) => {
    setJobSites([...jobSites, jobSite]);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredJobSites = jobSites.filter((jobSite) =>
      jobSite.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const onRoadCount = filteredJobSites.filter(
      (jobSite) => jobSite.status === "onRoad",
    ).length;
    const completedCount = filteredJobSites.filter(
      (jobSite) => jobSite.status === "completed",
    ).length;
    const onHoldCount = filteredJobSites.filter(
      (jobSite) => jobSite.status === "onHold",
    ).length;

    setOnRoadCount(onRoadCount);
    setCompletedCount(completedCount);
    setOnHoldCount(onHoldCount);
  }, [jobSites, searchQuery]);

  return (
    <Router>
      <div className='container mt-4'>
        <Routes>
          <Route
            path='/job-site/:name'
            element={<JobSiteDetail jobSites={jobSites} />}
          />

          <Route
            path='/'
            element={
              <>
                {" "}
                <StatusCounter
                  onRoadCount={onRoadCount}
                  completedCount={completedCount}
                  onHoldCount={onHoldCount}
                />
                <div
                  className='d-flex mb-3 gap-2'
                  style={{ width: "100%" , justifyContent: 'flex-end'}}
                >
                  <SearchBar onSearch={handleSearch} />
                  <CreateButton showModal={handleShowModal} />
                </div>
                <JobSiteList jobSites={jobSites} searchQuery={searchQuery} />
              </>
            }
          />
        </Routes>
        {showModal && (
          <CreateJobSiteModal
            showModal={showModal}
            handleClose={handleCloseModal}
            saveJobSite={saveJobSite}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
