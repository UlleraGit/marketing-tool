import PieChart from "../components/PieChart";
import pdfCreator from "./pdfCreator";
import jsPDF from "jspdf";

export default async () => {
  const doc = new jsPDF("p", "px");

  const elements = createChart([50,50],["Männer", "Frauen"],)

  //await doc.addImage(elements, 'JPEG', 10, 10, 280, 150 );

  //await pdfCreator({ doc, elements }); 

  //doc.save(`charts.pdf`);

  console.log(elements)
}

function createChart( labels, data) {
  return(
    <PieChart data={data} labels={labels}/>
  )
}