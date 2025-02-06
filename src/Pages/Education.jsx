import React from "react";
import EducationData from "../components/EducationData";

const EducationPage = () => {
  return (
    <div className="edu-container">
        <h1>Educational Centre</h1>
      <h1>{EducationData.waste_to_energy.title}</h1>
      {
      EducationData.waste_to_energy.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationPage;
