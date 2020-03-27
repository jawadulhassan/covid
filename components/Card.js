import React from "react";

function Card(props) {
  const { header1, stat1, header2, stat2, statColor1, statColor2 } = props;
  return (
    <div className="small-card">
      <div className="flexed">
        <div>
          <h1>{header1}</h1>
          <div className="primary-stat" style={{ color: `${statColor1}` }}>
            {stat1}
          </div>
        </div>
        <div className="margined-left">
          <h1>{header2}</h1>
          <div className="secondary-stat" style={{ color: `${statColor2}` }}>
            {stat2}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
