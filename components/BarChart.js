import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2";
export default function barChart(props){
    Chartjs.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    )
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display:false
            },
        },
        scales: {
            y: {
              beginAtZero: true
            }
        }
    };

    const data = {
        labels: props.labels,
        datasets: [
            {
                ...props.data,
                backgroundColor:'rgba(0, 0, 255, 1)'
            }
        ]
    };
    return (<Bar data={data} options={options} width={props.width} height={props.height} />);
}