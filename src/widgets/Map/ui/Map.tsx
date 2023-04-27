import React, { useEffect, useState } from 'react';
import {
    MapContainer, TileLayer, useMapEvents, Circle,
} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import classes from './Map.module.scss';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

const icon = L.icon({
    iconUrl: '/images/missile.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

export const Map: React.FC = () => {
    const [centers, setCenters] = useState<LatLngExpression[]>([]);
    function MyComponent() {
        const map = useMapEvents({
            click: (event) => {
                setCenters((prevCenters) => {
                    const updatedCenters = [...prevCenters, event.latlng];
                    if (updatedCenters.length > 5) {
                        updatedCenters.splice(0, 1);
                    }
                    return updatedCenters;
                });
            },
        });
        return null;
    }

    useEffect(() => {
        // Убираем пропаганду хохлов
        const attribution = document.querySelector('.leaflet-control-attribution');
        if (attribution) {
            attribution.remove();
        }
    }, []);

    return (
        <MapContainer
            center={[48.4437, 135.0608]}
            zoom={10}
            style={{ height: '400px', width: '100%' }}
        >
            <MyComponent />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {centers && (
                centers.map((center) => (
                    <Circle center={center} radius={500} />
                ))
            )}
        </MapContainer>
    );
};
