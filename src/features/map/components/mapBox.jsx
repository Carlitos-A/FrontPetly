import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
    const mapRef = useRef()
    const mapContainerRef = useRef()

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-70.6693, -33.4489], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 11 // starting zoom
        });

        return () => {
            mapRef.current.remove()
        }
    }, [])

    return (
        <>
            <div
                ref={mapContainerRef} 
                className='w-full h-screen'
                />
        </>
    )
}

export default Map