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

export default (props) => {

    Chartjs.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display:false
            },
        }
    };

    const data = {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                backgroundColor:'rgba(0, 0, 255, 1)'
            }
        ]
    };

    return (<Bar data={data} height={100} options={options} />);
}