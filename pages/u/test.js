import dynamic from "next/dynamic"
import Section from '../../components/Section';
import Container from '../../components/Container';
import Map from '../../components/Map';
import Box from "@mui/material/Box"
//const MapSelect = dynamic(() => import("../../components/MapSelect"), { ssr: false })

const DEFAULT_CENTER = [48.2100, 16.3586]
export default function Test() {
    return (
        <Box sx={{width:"500px", height:"500px", marginLeft: "100px"}}>
            <Map width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
                {({ TileLayer, Marker, Popup }) => (
                    <>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker position={DEFAULT_CENTER}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </>
                )}
            </Map>
        </Box>
    )
}