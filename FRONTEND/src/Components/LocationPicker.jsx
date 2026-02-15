import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box } from '@mui/material';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationPicker = ({ onLocationSelect, initialLocation, organizations = [], markers = [] }) => {
    const [position, setPosition] = useState(initialLocation || null);

    // Component to handle map clicks
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                onLocationSelect(e.latlng);
            },
        });

        return position ? <Marker position={position} /> : null;
    };

    // Auto-center map on user location if not provided
    const [center, setCenter] = useState(initialLocation || [20.5937, 78.9629]); // Default India

    const [error, setError] = useState(null);

    useEffect(() => {
        if (!initialLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setCenter([latitude, longitude]);
                },
                (err) => {
                    console.warn("Geolocation failed or denied:", err.message);
                    setError("Location access denied. Please select location manually.");
                }
            );
        }
    }, [initialLocation]);

    return (
        <Box sx={{ height: 400, width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid #ccc' }}>
            {error && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        bgcolor: 'rgba(255, 0, 0, 0.8)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 4,
                        fontSize: '0.8rem'
                    }}
                >
                    {error}
                </Box>
            )}
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />

                {/* Organization Coverage Circles */}
                {organizations.map((org) => {
                    if (org.location && org.location.coordinates) {
                        const [lng, lat] = org.location.coordinates;
                        return (
                            <Circle
                                key={org._id}
                                center={[lat, lng]}
                                radius={org.coverageRadius || 5000}
                                pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.2 }}
                            />
                        );
                    }
                    return null;
                })}

                {/* Custom Markers */}
                {markers.map((m, i) => (
                    <Marker key={i} position={m.position}>
                        {m.popup && <Popup>{m.popup}</Popup>}
                    </Marker>
                ))}

                <LocationMarker />
            </MapContainer>
        </Box>
    );
};

export default LocationPicker;
