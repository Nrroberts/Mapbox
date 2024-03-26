"use client";

import Map from 'react-map-gl';

import { Location, getLocations } from '@/util/db';
import { useEffect, useMemo, useState } from 'react';
import { GeocoderControl, Listings, Pin } from '@/components';
import { Marker, NavigationControl, Popup } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type SetState<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

const MarkerRenderer: React.FC<{ locations: Location[], setActive: SetState<Location> }> = ({ locations, setActive }) => {
    let pins = useMemo(() => locations.map((location, i) => (
        <Marker
            key={`marker-${i}`}
            latitude={location.geometry.coordinates[1]}
            longitude={location.geometry.coordinates[0]}
            anchor="bottom"
            onClick={e => {
                e.originalEvent.stopPropagation();
                setActive(location);
            }}
        >
            <Pin />
        </Marker>
    )), [locations]);

    return <>{pins}</>;
}

const App = () => {
    const [locations, setLocations] = useState<Location[]>();
    const [active, setActive] = useState<Location>();

    useEffect(() => {
        getLocations().then(data => setLocations(data.features));
    }, []);

    return (
        <main>
            <div className="sidebar">
                <div className="heading">
                    <h1>Pickup Locations</h1>
                </div>

                <Listings
                    loading={!locations}
                    locations={locations}
                />
            </div>

            <div className="map">
                <Map
                    mapboxAccessToken={mapboxToken}
                    mapStyle="mapbox://styles/mapbox/light-v11"
                    initialViewState={{ latitude: 41.8076404242965, longitude: -72.25329996584826, zoom: 13 }}
                    scrollZoom
                >
                    <GeocoderControl position="top-left" mapboxAccessToken={mapboxToken!} />
                    <NavigationControl position="top-right" />

                    {/* render the markers */}
                    {
                        locations && <MarkerRenderer locations={locations} setActive={setActive} />
                    }

                    {/* render the popup for the active marker */}
                    {
                        active && (
                            <Popup
                                anchor="top"
                                longitude={Number(active.geometry.coordinates[0])}
                                latitude={Number(active.geometry.coordinates[1])}
                                onClose={() => setActive(undefined)}
                            >
                                <div>
                                    <pre>
                                        {JSON.stringify(active, null, 3)}
                                    </pre>
                                </div>
                            </Popup>
                        )
                    }
                </Map>
            </div>

            <div id="radius-control" className="radius">
                <label htmlFor="radius-slider">Radius: <span id="radius-value">15</span>mi</label>
                <input type="range" name="range" id="radius-slider" min="5" max="50" value="15" />
            </div>
        </main>
    );
}

export default App;