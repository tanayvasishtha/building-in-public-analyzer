// src/components/features/ImprovementChart.jsx
'use client';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function ImprovementChart({ currentScore }) {
  const data = {
    labels: ['Current', 'Potential'],
    datasets: [
      {
        label: 'Building Score',
        data: [currentScore, Math.min(100, currentScore + 25)],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Score: ${context.raw}`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-center text-lg font-medium mb-4">Improvement Potential</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
