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

ChartJS.defaults.color = '#000000'

const Chart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<ChartJS | null>(null)
  const { num_iterations, J_history } = useFinalParametersStore()
  const x_values = [...Array(num_iterations)].map((_,i) => i + 1)

  useEffect(() => {
    if (!chartRef.current) return

    if (J_history.length > 0 && !chartInstance.current) {
      const ctx = chartRef.current!.getContext('2d')
      if (!ctx) return

      const totalDuration = 1500;
      const delayBetweenPoints = totalDuration / x_values.length;
      const previousY = (ctx: any) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
      const animation: any = {
        x: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: NaN, // the point is initially skipped
          delay(ctx: any) {
            if (ctx.type !== 'data' || ctx.xStarted) {
              return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
          }
        },
        y: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: previousY,
          delay(ctx: any) {
            if (ctx.type !== 'data' || ctx.yStarted) {
              return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
          }
        }
      };

      chartInstance.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: x_values,
          datasets: [
            {
              label: "Cost vs. Number of Iterations",
              data: x_values.map((iteration, index) => ({
                x: iteration,
                y: J_history[index],
              })),
              backgroundColor: 'black',
              borderColor: 'black',
              borderWidth: 2,
              showLine: true,
              fill: false,
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
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
              grid: {
                display: false,
              },
              ticks: {
                autoSkip: false,
                callback: function(value: number | string) {
                  if (typeof(value) !== "number") return
                  const step = Math.floor(num_iterations / 10)
                  if (value % step === 0 && value !== 0) {
                    return this.getLabelForValue(value - 1)
                  }
                  if (value + 1 === num_iterations) {
                    return this.getLabelForValue(value)
                  }
                return ''
                }
              }
            },
            y: {
              title: {
                display: true,
                text: "Cost",
              },
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
          animation,
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
      }
    }
  }, [J_history])

  return <canvas ref={chartRef}></canvas>
}

export default Chart