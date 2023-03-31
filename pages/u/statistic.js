import PieChart from "../../components/PieChart"
import FooterAdmin from "/components/FooterAdmin"

export default function statistic() {
    return (
        <div>
            <div style={{ marginLeft: "12.5%", marginRight: "12.5%", width: "430px" }}>
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
                    </div>
                </div>
            </div>
            <FooterAdmin />
        </div >
    )
}
