import React, { Component } from "react";
import Chart from "chart.js/auto";
import dataa from "../assets/data.json";
class Statistics extends Component {
  state = {
    data: {},
    type: "",
  };
  chartRef = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      this.setState({ type: "bar", data: { ...dataa.bar } });
    }, 100);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      const myChartRef = this.chartRef.current.getContext("2d");
      console.log("DATA CHANGED");
      const myChart = new Chart(myChartRef, {
        type: this.state.type,
        data: {
          labels: this.state.data.labels,
          datasets: [...this.state.data.datasets],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            xAxes: [{ gridLines: { drawBorder: false } }],
            yAxes: [{ gridLines: { drawBorder: false } }],
            x: {
              grid: {
                display: false,
              },
              ticks: {
                display: true, // remove y label
                font: {
                  family: "Montserrat", // Your font family
                  size: 14,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                drawBorder: false, // remove y-axis border
              },
              ticks: {
                display: true, // remove y label
                font: {
                  family: "Montserrat", // Your font family
                  size: 14,
                },
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return "$" + value;
                },
              },
            },
          },
        },
      });
    }
  }
  render() {
    console.log(dataa, this.state);
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default Statistics;
