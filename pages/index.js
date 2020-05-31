import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { isEmpty } from "lodash";

import Card from "../components/Card";
import SimpleLoader from "../components/SimpleLoader";

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    const result = await axios.get(
      "https://coronavirus-tracker-api.herokuapp.com/v2/locations/177"
    );
    setData(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  if (isEmpty(data) || isLoading) {
    return (
      <div
        style={{
          padding: 0,
          margin: 0,
          width: "100%",
          minHeight: "100vh",
          paddingTop: "100px",
          backgroundColor: "#141d28",
          transition: "all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1)",
        }}
      >
        <SimpleLoader />
      </div>
    );
  }
  const { latest } = data && data.location;
  let recoveredCases = 25271;

  return (
    <div className="app">
      <Head>
        <title>Covid-19</title>
        <link rel="icon" href="static/images/virus.png" />
      </Head>
      <div className="header-wrapper">
        <img src="static/images/virus.png" alt="virus icon" />
        <h1>Covid - 19 (Pakistan)</h1>
      </div>
      <div className="big-card">
        <div className="flexed">
          <div className="text-aligned-center">
            <h1>Total Cases</h1>
            <div className="primary-stat">
              {numberWithCommas(latest.confirmed)}
            </div>
          </div>
          <div className="text-aligned-center">
            <h1>Active cases</h1>
            <div className="secondary-stat">
              {numberWithCommas(
                latest.confirmed - recoveredCases - latest.deaths
              )}
            </div>
          </div>
        </div>
        <div className="text-aligned-center">
          <h1>Recovered</h1>
          <div className="recovered-stat">
            {numberWithCommas(recoveredCases)}
          </div>
        </div>
      </div>
      <div className="flexed" style={{ marginTop: 40 }}>
        <Card
          header1="Reported Today"
          stat1={291}
          statColor1="#4d44fc"
          header2="Deaths Today"
          stat2={34}
          statColor2="#de3a3d"
        />
        <Card
          header1="Total Deaths"
          stat1={latest.deaths}
          statColor1="#de3a3d"
          header2="Critical Cases"
          stat2={107}
          statColor2="#ff6164"
        />
        <Card
          header1="Cases/Population"
          stat1={`${((latest.confirmed / 2200000) * 100).toFixed(2)}%`}
          statColor1="#39faf0"
          header2="Fatality Ratio"
          stat2={`${((latest.deaths / latest.confirmed) * 100).toFixed(2)}%`}
          statColor2="#8b39f7"
        />
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        @media screen and (max-width: 992px) {
          .app {
            padding: 30px 10px 10px 10px;
            background-color: #141d28;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .header-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-bottom: 50px;
            margin-left: -30px;
          }
          .header-wrapper img {
            height: 80px;
          }
          .header-wrapper h1 {
            color: #fff;
            font-family: auto;
            font-size: 25px;
            width: 50%;
          }
          .flexed {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .big-card {
            width: 60%;
            border-radius: 5px;
            background-color: #fcfcfc;
            padding: 20px;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          h1 {
            font-family: auto;
            font-size: 20px;
          }
          .recovered-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 58px;
            color: #02ad46;
            font-weight: bolder;
          }
          .primary-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 50px;
            color: orange;
            font-weight: bolder;
          }
          .secondary-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 50px;
            color: #73a2de;
            font-weight: bolder;
          }
          .small-card {
            display: flex;
            border-radius: 5px;
            background-color: #fcfcfc;
            padding: 20px;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 15px;
          }
          .margined-left {
            margin-left: 0px;
          }
        }

        @media screen and (min-width: 992px) {
          .app {
            padding: 20px 60px;
            background-color: #141d28;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .header-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-bottom: 50px;
            margin-left: -50px;
          }
          .header-wrapper img {
            height: 120px;
          }
          .header-wrapper h1 {
            color: #fff;
            font-family: auto;
            font-size: 35px;
          }
          .big-card {
            width: 35%;
            border-radius: 5px;
            background-color: #fcfcfc;
            padding: 12px 25px;
          }
          .small-card h1 {
            font-family: auto;
            font-size: 20px;
          }
          .small-card .primary-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 40px;
            font-weight: bolder;
          }
          .small-card .secondary-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 40px;
            font-weight: bolder;
          }
          h1 {
            font-family: auto;
            font-size: 25px;
          }
          .recovered-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 55px;
            color: #02ad46;
            font-weight: bolder;
          }
          .primary-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 55px;
            color: orange;
            font-weight: bolder;
          }
          .secondary-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 55px;
            color: #73a2de;
            font-weight: bolder;
          }
          .flexed {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .small-card {
            border-radius: 5px;
            background-color: #fcfcfc;
            padding: 20px;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 15px;
          }
          .margined-left {
            margin-left: 30px;
          }
        }
        .text-aligned-center {
          text-align: center;
        }
        .app-loader {
          position: fixed;
          left: 50%;
          top: 50%;
          width: 100%;
          height: 100%;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
}

export default App;
