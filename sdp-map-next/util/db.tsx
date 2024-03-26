'use server';

export type Location = {
    type: string;
    geometry: {
        type: string;
        coordinates: number[]
    },
    properties: {
        name: string;
        phoneFormatted: string;
        phone: string;
        address: string;
        city: string;
        country: string;
        postalCode: string;
        state: string;
        distance: string;
    }
}

export const getLocations = async () => ({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-72.24152238964025, 41.803040340801424]
            },
            properties: {
                name: 'Price Chopper',
                phoneFormatted: '(860) 553-6555',
                phone: '8605536555',
                address: '1220 Storrs Rd',
                city: 'Storrs',
                country: 'United States',
                postalCode: '06269',
                state: 'CT',
                distance: ''
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-72.24929006660736, 41.81372439066103]
            },
            properties: {
                name: 'UConn Dairy Bar',
                phoneFormatted: '(860) 486-1021',
                phone: '8604861021',
                address: '17 Manter Rd #4263',
                city: 'Storrs',
                country: 'United States',
                postalCode: '06269',
                state: 'CT',
                distance: ''
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-72.2737518117317, 41.81202913647776]
            },
            properties: {
                name: 'Carriage House Townhomes',
                phoneFormatted: '(860) 487-9576',
                phone: '8604879576',
                address: '20 Carriage House Dr',
                city: 'Storrs',
                country: 'United States',
                postalCode: '06269',
                state: 'CT',
                distance: ''
            }
        }
    ]
})