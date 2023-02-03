import PieChart from "../../components/PieChart"
import HeaderAdmin from "/components/HeaderAdmin"
import FooterAdmin from "/components/FooterAdmin"
import BarChart from "../../components/BarChart"
import Button from "@mui/material/Button"
import { useRef } from "react"
import Link from "next/link"
import jsPDF from "jspdf";

export default () => {
    const pdfRef = useRef(null);

    const handleGeneratePdf = () => {
        const doc = new jsPDF("p","px");

        // Adding the fonts
        doc.setFont("Anton-Regular", "normal");

        doc.html(pdfRef.current, {
            async callback(doc) {
                // save the document as a PDF with name of Memes
                doc.save("Statistik");
            }
        });
    };

    return (
        <div>
            <HeaderAdmin />
            <div style={{ display: "flex", marginLeft: "12.5%", marginRight: "12.5%", justifyContent: "space-between", marginTop: "10px", marginBottom: "10px" }}>
                <Link href="/u/dashboard" style={{ color: "#000" }}>
                    zurück
                </Link>
                <Button variant="contained" onClick={handleGeneratePdf} >PDF erstellen</Button>
            </div>
            <div style={{ marginLeft: "12.5%", marginRight: "12.5%", width: "430px" }}>
                <div ref={pdfRef} style={{ display: "flex", flexDirection: "column", gap: "80px", paddingLeft: "8px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ textDecoration: "underline" }}  >
                                Quelle:
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>
                                Veröffentlichungsdatum:
                            </p>
                            <p >
                                dd.mm.yyyy
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>
                                Erhebungszeitraum
                            </p>
                            <p>
                                30 Tage
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>
                                Anzahl der Befragten:
                            </p>
                            <p>
                                1000
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>
                                Art der Befragung:
                            </p>
                            <p >
                                Instagram Befragung
                            </p>
                        </div>
                    </div>
                    <div>
                        <p style={{ textDecoration: "underline" }} >
                            Statistik:
                        </p>
                        <div style={{ height: "400px", width: "400px", }}>
                            <PieChart data={[50, 50]} labels={["Männer", "Frauen"]} />
                        </div>
                    </div>
                    <div>
                        <p style={{ textDecoration: "underline" }} >
                            Geschlecht:
                        </p>
                        <div style={{ height: "400px", width: "400px", }}>
                                <PieChart data={[70, 30]} labels={["Männer", "Frauen"]} />
                        </div>
                    </div>
                    <div>
                        <p style={{ textDecoration: "underline" }} >
                            Herkunft der Befragten:
                        </p>
                        <div style={{ height: "300px", width: "600px", }}>
                            <BarChart data={[0.1, 0.4, 0.4, 0.4, 0.3, 0.5, 0.8]} labels={["January", "Feb", "March", "Apr", "May", "May", "May"]} style={{ backgroundColor: '#fff' }} />
                        </div>
                    </div>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
/*
export async function getServerSideProps({query}){

return {props:{data}}
}*/