import React from 'react';
import VictimAndQuestions from './Components/Victim&Questions';
import Buttons from './Components/Buttons';

const IndexPage = () => {
  return (
    <div id="container">
      <div className="left-image-decor" />

      <div className="right-image-decor" />
      <section className="section" id="testimonials">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="center-heading">
                <h2>
                  Who is <em>NEXT?</em>
                </h2>
              </div>
            </div>

            <div className="item service-item">
              <div className="testimonial-content">
                <VictimAndQuestions />
                <Buttons />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
