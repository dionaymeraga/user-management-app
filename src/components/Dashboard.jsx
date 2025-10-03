import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100">
            <Link
              to="/users"
              className="d-flex align-items-center mb-3 text-white text-decoration-none w-100 justify-content-center justify-content-sm-start"
            >
              <span className="fs-5 fw-bolder text-center d-none d-sm-inline align-items-center">
                User Management App
              </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-auto w-100 align-items-center align-items-sm-start">
              <li className="nav-item w-100">
                <Link
                  to="/users"
                  className="nav-link text-white px-0 d-flex align-items-center justify-content-center justify-content-sm-start"
                >
                  <i className="fs-4 bi-people me-2"></i>
                  <span className="d-none d-sm-inline">User Info</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link
                  to="/users/add"
                  className="nav-link text-white px-0 d-flex align-items-center justify-content-center justify-content-sm-start"
                >
                  <i className="fs-4 bi-person-plus me-2"></i>
                  <span className="d-none d-sm-inline">Manage Users</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col p-0">
          <div className="p-3 shadow text-center bg-light">
            <h3 className="m-0">User Management App</h3>
          </div>
          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
