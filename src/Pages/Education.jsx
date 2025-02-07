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
        <hr />
        <h2 class="faq">FAQs</h2>
        <div className="edu-container">
          <h1>{EducationData.waste_to_energy.title}</h1>
          {EducationData.waste_to_energy.sections.map((section, index) => (
            <div key={index} className="edu-card">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
        <hr />
          <h2 className="faq" >EDUCATIONAL VIDEOS</h2>

            <div className="video-container">
              <div className="video_player">
                <h2>How it works - Waste-to-Energy</h2>
                <iframe width="800" height="564" src="https://www.youtube.com/embed/O9pwV3JoqwA" title="How it works - Waste-to-Energy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <div className="video_player">
                <h2>Waste-to-Energy Virtual Tour</h2>
                <iframe width="800" height="564" src="https://www.youtube.com/embed/RAXbohaBGt8" title="Waste-to-Energy Virtual Tour" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <div className="video_player">
                <h2>WASTE TO ENERGY</h2>
                <iframe width="800" height="564" src="https://www.youtube.com/embed/1TJHS-i2EAQ" title="WASTE TO ENERGY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <div className="video_player">
                <h2>Turning agricultural waste into energy</h2>
                <iframe width="800" height="564" src="https://www.youtube.com/embed/fKpFb_QB8Ag" title="भारत का ये गांव कचरे से बिजली बनाता है [Turning agricultural waste into energy]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>

      </div>
    </section>
  );
};

export default EducationPage;