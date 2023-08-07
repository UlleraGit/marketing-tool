/* eslint-disable */ 
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
} from "chart.js"
import { Pie } from "react-chartjs-2";

export default function pieChart(props) {
    Chartjs.register(
        ArcElement,
        Tooltip,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler,
    )
    const data = {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                backgroundColor:[
                    "rgba(255,0, 0, 0.2)",
                    "rgba(0, 0, 255, 1)"
                ],
                backgroundColor: ['#0000FF','#FBBD00','#FFC0CB'], 
            },
        ],
    };
    return (<Pie data={data}  />);
}