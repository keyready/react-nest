import React, {
    MouseEventHandler, useCallback, useEffect, useState,
} from 'react';
import {
    MapContainer, TileLayer, useMapEvents, Circle, Polygon, Marker, Popup,
} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'react-bootstrap';
import classes from './Map.module.scss';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

const icon = L.icon({
    iconUrl: '/images/marker.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

export const Map: React.FC = () => {
    const [centers, setCenters] = useState<LatLngExpression[]>([]);
    const [dots, setDots] = useState<LatLngExpression[]>([]);
    function MapClick() {
        const map = useMapEvents({
            click: (event) => {
                // setCenters((prevCenters) => {
                //     const updatedCenters = [...prevCenters, event.latlng];
                //     if (updatedCenters.length > 5) {
                //         updatedCenters.splice(0, 1);
                //     }
                //     return updatedCenters;
                // });
                setDots((prevState) => {
                    const updatedCenters = [...prevState, event.latlng];
                    return updatedCenters;
                });
            },
        });
        return null;
    }

    useEffect(() => {
        // Убираем пропаганду хохлов
        const attribution = document.querySelector('.leaflet-control-container');
        if (attribution) {
            attribution.remove();
        }
    }, []);

    const [pickedDot, setPickedDot] = useState<LatLngExpression>(dots[0]);
    const handleMarkerClick = useCallback((event: L.LeafletMouseEvent) => {
        setPickedDot(event.latlng);
    }, []);
    const deleteDot = useCallback((e: any) => {
        e.stopPropagation();
        setDots((prevState) => [
            ...prevState.filter((coords) => coords !== pickedDot),
        ]);
    }, [pickedDot]);

    return (
        <MapContainer
            center={[48.4437, 135.0608]}
            zoom={10}
            style={{ height: '600px', width: '100%' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* {centers && ( */}
            {/*    centers.map((center) => ( */}
            {/*        <Circle center={center} radius={500} /> */}
            {/*    )) */}
            {/* )} */}
            <MapClick />
            {dots.length >= 3 && (
                <Polygon pathOptions={{ color: 'purple' }} positions={dots} />
            )}
            {dots.length
                ? dots.map((dot) => (
                    <Marker
                        eventHandlers={{ click: handleMarkerClick }}
                        key={dot.toString()}
                        position={dot}
                        icon={icon}
                    >
                        <Popup>
                            <VStack gap="8">
                                <h5>Менюшка</h5>
                                <Button
                                    variant="danger"
                                    onClick={(e) => deleteDot(e)}
                                    size="sm"
                                >
                                    Удалить
                                </Button>
                            </VStack>
                        </Popup>
                    </Marker>
                ))
                : ''}
        </MapContainer>
    );
};
