"use client";

import { Location } from '@/util/db';

export interface ListingsProps {
    locations?: Location[];
    loading: boolean;
}

export const Listings: React.FC<ListingsProps> = ({ locations, loading }) => {
    if (loading) return (
        <div className="listings">
            <h1>Listings</h1>
            <span>Loading..</span>
        </div>
    );
    
    return (
        <div className="listings">
            <h1>Listings</h1>
            {
                locations!.map((location, i) => (
                    <div className="item" key={`listing-${i}`}>
                        <a href="#" className="title">{location.properties.name}</a>
                        <div>
                            {location.properties.address}, {location.properties.city}, {location.properties.state}{" "}
                            {location.properties.phone && ` | ${location.properties.phoneFormatted}`}{" "}
                            {location.properties.distance && (
                                <div>
                                    <strong>
                                        {Math.round(Number(location.properties.distance) * 100) / 100} mi. away
                                    </strong>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}