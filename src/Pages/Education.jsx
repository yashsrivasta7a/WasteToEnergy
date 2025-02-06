import React from "react";
import EducationData from "../components/EducationData";
import "./Education.css";
import Navbar from "../components/Navbar";

const EducationPage = () => {
  return (
    <section id="education">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="content-container">
        <h1 id="EduTitle">Educational Centre</h1>
        <div className="edu-container">
          <h1>{EducationData.waste_to_energy.title}</h1>
          {EducationData.waste_to_energy.sections.map((section, index) => (
            <div key={index} className="edu-card">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationPage;