import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { isEmpty } from "lodash";

import Card from "../components/Card";
import SimpleLoader from "../components/SimpleLoader";

import { dataManipulator } from "../shared/helper";

import DeathChart from "../components/Charts/Deaths";
import ActiveChart from "../components/Charts/Active";
import RecoveredChart from "../components/Charts/Recovered";
import ConfirmedChart from "../components/Charts/Confirmed";

function App() {
  const [graphData, setGraphData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getGraphData() {
    const result = await axios.get(
      "https://api.covid19api.com/total/dayone/country/pakistan",
      {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setGraphData(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getGraphData();
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  if (isLoading) {
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

  if (!graphData) return null;

  console.log({ graphData });
  const {
    activeCasesObj,
    confirmedCasesObj,
    fatalitiesCasesObj,
    recoveriesCasesObj,
  } = dataManipulator(graphData && graphData);

  let totalLength = graphData.length;

  let fatalCases = graphData[totalLength - 1].Deaths;
  let activeCases = graphData[totalLength - 1].Active;
  let confirmedCases = graphData[totalLength - 1].Confirmed;
  let recoveredCases = graphData[totalLength - 1].Recovered;

  let deathsToday =
    graphData[totalLength - 1].Deaths - graphData[totalLength - 2].Deaths;
  let reportedToday =
    graphData[totalLength - 1].Confirmed - graphData[totalLength - 2].Confirmed;
  let recoveriesToday =
    graphData[totalLength - 1].Recovered - graphData[totalLength - 2].Recovered;

  return (
    <div className="app">
      <div className="header-wrapper">
        <img src="static/images/virus.png" alt="virus icon" />
        <h1>Covid - 19 (Pakistan)</h1>
      </div>
      <div className="big-card">
        <div className="flexed">
          <div className="text-aligned-center">
            <h1>Total Cases</h1>
            <div className="primary-stat">
              {numberWithCommas(confirmedCases)}
            </div>
          </div>
          <div className="text-aligned-center">
            <h1>Active cases</h1>
            <div className="secondary-stat">
              {numberWithCommas(activeCases)}
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
      <div className="graph-wrapper">
        <ConfirmedChart series={confirmedCasesObj} />
        <ActiveChart series={activeCasesObj} />
      </div>

      <div className="graph-wrapper">
        <RecoveredChart series={recoveriesCasesObj} />
        <DeathChart series={fatalitiesCasesObj} />
      </div>
      <div className="flexed" style={{ marginTop: 40 }}>
        <Card
          header1="Reported Today"
          stat1={reportedToday < 0 ? 0 : reportedToday}
          statColor1="#4d44fc"
          header2="Deaths Today"
          stat2={deathsToday < 0 ? 0 : deathsToday}
          statColor2="#de3a3d"
          header3="Recoveries Today"
          stat3={recoveriesToday < 0 ? 0 : recoveriesToday}
          statColor3="#02ad46"
        />
        <Card header1="Total Deaths" stat1={fatalCases} statColor1="#de3a3d" />
        <Card
          header1="Cases/Population"
          stat1={`${((confirmedCases / 220000000) * 100).toFixed(2)}%`}
          statColor1="#39faf0"
          header2="Fatality Ratio "
          description2={"of total case"}
          stat2={`${((fatalCases / confirmedCases) * 100).toFixed(2)}%`}
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
            width: 100%;
            min-height: 100vh;
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
          .graph-wrapper {
            display: flex;
            flex-direction: column;
          }
          .graph-size {
            width: 350px;
            margin-top: 30px;
            align-self: center;
          }
          .big-card {
            width: 70%;
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
            font-size: 45px;
            color: rgb(244, 195, 99);
            font-weight: bolder;
          }
          .secondary-stat {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 45px;
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
            width: 100%;
            min-height: 100vh;
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
            border-radius: 5px;
            background-color: #fcfcfc;
            padding: 12px 25px;
          }
          .graph-wrapper {
            display: flex;
            flex-direction: row;
            padding: 20px;
          }
          .graph-size {
            width: 500px;
            height: 400px !important;
            margin: 20px;
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
            font-size: 50px;
            color: rgb(244, 195, 99);
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
