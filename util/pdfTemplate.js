import { width } from "@mui/system";
import { useCallback } from "react";
import PieChart from "../components/PieChart";

export default () => {
    let ref = useRef(null);

    useCallback(() => {
        const link = document.createElement('a')
        link.download = "chart.png"
        link.href = ref.current.toBase64Image();
        link.click
    })
    
    return(
        <PieChart style={{height:"690px", width:"690px"}} ref={ref} data={[50,50]} labels={["Ja","Nein"]}  />
    )
}