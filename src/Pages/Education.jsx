import React from "react";
import EducationData from "../components/EducationData";
import "./Education.css"

const EducationPage = () => {
  return (
    <>
    <h1 id="EduTitle">Educational Centre</h1>
    <div className="edu-container">
      <h1>{EducationData.waste_to_energy.title}</h1>
      {
      EducationData.waste_to_energy.sections.map((section, index) => (
        <div key={index} className="edu-card">
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default EducationPage;
