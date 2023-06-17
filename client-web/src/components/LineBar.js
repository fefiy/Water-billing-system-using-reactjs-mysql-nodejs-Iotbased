// for toal water fetched with in a month
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineBar = ({ chartData })=> {
  return <Line data={chartData} />;
}

export default LineBar;