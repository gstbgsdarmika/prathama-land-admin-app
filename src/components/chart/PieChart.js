import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default PieChart;
