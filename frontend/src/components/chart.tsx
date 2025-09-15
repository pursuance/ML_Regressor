import { useEffect, useRef } from 'react'
import { useFinalParametersStore } from '@/store'
import {
    Chart as ChartJS,
    LineController,
    ScatterController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    Legend,
} from "chart.js";

ChartJS.register(
    LineController,
    ScatterController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    Legend
);

const Chart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const { num_iterations, J_history } = useFinalParametersStore()
  const x_values = [...Array(num_iterations)].map((_,i) => i + 1)

  useEffect(() => {
    if (!chartRef.current) return
    const ctx = chartRef.current!.getContext('2d')
    if (!ctx) return

    const chart = new ChartJS(ctx, {
      type: 'scatter',
      data: {
        labels: x_values,
        datasets: [
          {
            label: "Cost vs. Number of Iterations",
            data: x_values.map((iteration, index) => ({
              x: iteration,
              y: J_history[index],
            })),
            backgroundColor: 'red',
            borderColor: 'rgba(255, 99, 132,0.5)',
            borderWidth: 2,
            showLine: true,
            fill: false,
            pointRadius: 0.5,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Gradient Descent: Cost vs. Number of Iterations',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Number of Iterations',
            },
            beginAtZero: true,
          },
          y: {
            title: {
              display: true,
              text: "Cost",
            },
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1500,
          easing: "easeInOutQuad",
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [])

  return <canvas ref={chartRef}></canvas>
}

export default Chart