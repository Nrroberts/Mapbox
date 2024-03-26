// https://github.com/visgl/react-map-gl/blob/7.1-release/examples/geocoder/src/geocoder-control.tsx

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { useState } from 'react';
import { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder';
import { useControl, Marker, MarkerProps, ControlPosition } from 'react-map-gl';

interface GeocoderControlProps {
    mapboxAccessToken: string;
    marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;

    position: ControlPosition;

    onLoading?: (e: object) => void;
    onResults?: (e: object) => void;
    onResult?: (e: object) => void;
    onError?: (e: object) => void;
};

type PropType = Omit<GeocoderOptions, 'accessToken' | 'mapboxgl' | 'marker'>;

/* eslint-disable complexity,max-statements */
export const GeocoderControl: React.FC<PropType & GeocoderControlProps> = ({
    mapboxAccessToken,
    marker,
    position,
    onLoading,
    onResults,
    onResult,
    onError,
    ...rest
}) => {
    const [markerState, setMarkerState] = useState<JSX.Element>();

    const geocoder = useControl<MapboxGeocoder>(
        () => {
            const ctrl = new MapboxGeocoder({
                ...rest,
                marker: false,
                accessToken: mapboxAccessToken
            });

            ctrl.on('loading', onLoading as any);
            ctrl.on('results', onResults as any);
            ctrl.on('result', evt => {
                onResult!(evt);

                const { result } = evt;
                const location =
                    result &&
                    (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
                if (location && marker) {
                    setMarkerState(<Marker {...marker as any} longitude={location[0]} latitude={location[1]} />);
                } else {
                    setMarkerState(null as any);
                }
            });
            
            ctrl.on('error', onError as any);
            return ctrl;
        }, { position }
    );

    // @ts-ignore (TS2339) private member
    if (geocoder._map) {
        if (geocoder.getProximity() !== rest.proximity && rest.proximity !== undefined) {
            geocoder.setProximity(rest.proximity);
        }
        if (geocoder.getRenderFunction() !== rest.render && rest.render !== undefined) {
            geocoder.setRenderFunction(rest.render);
        }
        if (geocoder.getLanguage() !== rest.language && rest.language !== undefined) {
            geocoder.setLanguage(rest.language);
        }
        if (geocoder.getZoom() !== rest.zoom && rest.zoom !== undefined) {
            geocoder.setZoom(rest.zoom);
        }
        if (geocoder.getFlyTo() !== rest.flyTo && rest.flyTo !== undefined) {
            geocoder.setFlyTo(rest.flyTo);
        }
        if (geocoder.getPlaceholder() !== rest.placeholder && rest.placeholder !== undefined) {
            geocoder.setPlaceholder(rest.placeholder);
        }
        if (geocoder.getCountries() !== rest.countries && rest.countries !== undefined) {
            geocoder.setCountries(rest.countries);
        }
        if (geocoder.getTypes() !== rest.types && rest.types !== undefined) {
            geocoder.setTypes(rest.types);
        }
        if (geocoder.getMinLength() !== rest.minLength && rest.minLength !== undefined) {
            geocoder.setMinLength(rest.minLength);
        }
        if (geocoder.getLimit() !== rest.limit && rest.limit !== undefined) {
            geocoder.setLimit(rest.limit);
        }
        if (geocoder.getFilter() !== rest.filter && rest.filter !== undefined) {
            geocoder.setFilter(rest.filter);
        }
        if (geocoder.getOrigin() !== rest.origin && rest.origin !== undefined) {
            geocoder.setOrigin(rest.origin);
        }
        // Types missing from @types/mapbox__mapbox-gl-geocoder
        // if (geocoder.getAutocomplete() !== rest.autocomplete && rest.autocomplete !== undefined) {
        //   geocoder.setAutocomplete(rest.autocomplete);
        // }
        // if (geocoder.getFuzzyMatch() !== rest.fuzzyMatch && rest.fuzzyMatch !== undefined) {
        //   geocoder.setFuzzyMatch(rest.fuzzyMatch);
        // }
        // if (geocoder.getRouting() !== rest.routing && rest.routing !== undefined) {
        //   geocoder.setRouting(rest.routing);
        // }
        // if (geocoder.getWorldview() !== rest.worldview && rest.worldview !== undefined) {
        //   geocoder.setWorldview(rest.worldview);
        // }
    }
    
    return markerState;
}

const noop = () => { };

GeocoderControl.defaultProps = {
    marker: true,
    onLoading: noop,
    onResults: noop,
    onResult: noop,
    onError: noop
};