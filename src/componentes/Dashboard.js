import React from "react";
import Sidebar from "./Dashboard/Sidevar";
import Header from "./Dashboard/Header";
import Footer from "./Dashboard/Footer";
import Table from "./Table";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="contenedor-Dashboard">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="header">
        <Header />
      </div>
      <div className="contenedor">
        <Table />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
