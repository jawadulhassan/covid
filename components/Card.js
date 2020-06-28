import React from "react";

function Card(props) {
  const {
    stat1,
    stat2,
    stat3,
    header1,
    header2,
    header3,
    statColor1,
    statColor2,
    statColor3,
    description2,
  } = props;
  return (
    <div className="small-card">
      <div className="flexed">
        <div>
          <h1>{header1}</h1>
          <div className="primary-stat" style={{ color: `${statColor1}` }}>
            {stat1}
          </div>
        </div>
        {!!header2 && (
          <div className="margined-left">
            <h1>
              {header2}{" "}
              {!!description2 && (
                <i style={{ fontSize: 10 }}>({description2})</i>
              )}
            </h1>
            <div className="secondary-stat" style={{ color: `${statColor2}` }}>
              {stat2}
            </div>
          </div>
        )}
        {!!header3 && (
          <div className="margined-left">
            <h1>{header3}</h1>
            <div className="secondary-stat" style={{ color: `${statColor3}` }}>
              {stat3}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
