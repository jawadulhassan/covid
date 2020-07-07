import React from "react";
import moment from "moment";
import IsEmpty from "lodash/isEmpty";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts.src.js";

import HighchartsExporting from "highcharts/modules/exporting";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

function Charts(props) {
  const { series } = props;

  if (IsEmpty(series) || !series) return null;

  let dates = [];
  let list = [];
  series.data.map((item) => {
    dates.push(moment(item.date).format("DD MMMM")),
      list.push(item.fatalitiesList);
  });

  const data = { data: list };

  const chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "column",
    },
    title: {
      text: "Fatal Cases",
    },
    colors: ["#DE3700"],
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    xAxis: [
      {
        categories: dates,
        crosshair: true,
      },
    ],
    yAxis: [
      {
        labels: {
          format: "{value}",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          text: "Fatal Cases",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      },
    ],
    tooltip: {
      shared: true,
    },
    series: [data],
  };

  return (
    <div className="graph-size">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "400px" } }}
      />
    </div>
  );
}

export default Charts;
