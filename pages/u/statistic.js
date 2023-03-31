import PieChart from "../../components/PieChart"
import FooterAdmin from "/components/FooterAdmin"

export default function statistic({props}) {
    return (
        <div>
            <div style={{ margin:"auto", width: "430px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "80px", paddingLeft: "8px" }}>
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
                                31.03.2023
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>
                                Erhebungszeitraum
                            </p>
                            <p>
                                2 Tage
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>
                                Anzahl der Befragten:
                            </p>
                            <p>
                                91
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
                            Resultat:
                        </p>
                        <div style={{ height: "400px", width: "400px", }}>
                            <PieChart data={[33,58]} labels={["JA","Nein"]} />
                        </div>
                    </div>
                    <div>
                        <p style={{ textDecoration: "underline" }} >
                            Geschlecht:
                        </p>
                        <div style={{ height: "400px", width: "400px", }}>
                            <PieChart data={[0, 100]} labels={["Männer", "Frauen"]} />
                        </div>
                    </div>
                    <div>
                        <p style={{ textDecoration: "underline" }} >
                            Altersverteilung:
                        </p>
                        <div style={{ height: "400px", width: "400px", }}>
                            <PieChart data={[52,37,2]} labels={["18-24", "25-34", "35-44"]} />
                        </div>
                    </div>
                </div>
            </div>
            <FooterAdmin />
        </div >
    )
}
