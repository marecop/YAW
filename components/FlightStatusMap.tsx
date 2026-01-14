'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { airportCoordinates } from '@/lib/airportCoordinates'
import { usePathname } from 'next/navigation'

// Fix for Leaflet icons in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png'
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png'
const shadowUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

// Plane Icon SVG
const createPlaneIcon = (rotation: number) => L.divIcon({
  html: `
    <div style="transform: rotate(${rotation}deg); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-ya-yellow-600 drop-shadow-md">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
      </svg>
    </div>
  `,
  className: 'plane-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
})

interface FlightStatusMapProps {
  originCode: string
  destinationCode: string
  progress: number // 0 to 1
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

export default function FlightStatusMap({ originCode, destinationCode, progress }: FlightStatusMapProps) {
  const pathname = usePathname()
  const origin = airportCoordinates[originCode] || [22.3080, 113.9185] // Default HKG
  const dest = airportCoordinates[destinationCode] || [51.4700, -0.4543] // Default LHR

  // Helper to get current language prefix
  const getLangPrefix = () => {
    const segments = pathname.split('/').filter(Boolean)
    const currentLang = ['en', 'zh-hk', 'zh-cn', 'de', 'jp', 'es'].includes(segments[0]) ? segments[0] : 'zh-hk'
    return currentLang === 'zh-hk' ? '' : `/${currentLang}`
  }
  const langPrefix = getLangPrefix()
  const currentLangCode = langPrefix ? langPrefix.substring(1) : 'zh-hk'

  const translations: Record<string, any> = {
    'zh-hk': { origin: '起點', destination: '終點', currentPosition: '當前位置' },
    'zh-cn': { origin: '起点', destination: '终点', currentPosition: '当前位置' },
    'en': { origin: 'Origin', destination: 'Destination', currentPosition: 'Current Position' },
    'de': { origin: 'Start', destination: 'Ziel', currentPosition: 'Aktuelle Position' },
    'jp': { origin: '出発地', destination: '目的地', currentPosition: '現在地' },
    'es': { origin: 'Origen', destination: 'Destino', currentPosition: 'Posición actual' }
  }

  const t = translations[currentLangCode] || translations['zh-hk']

  // Calculate plane position - Linear Interpolation (consistent with Leaflet Polyline)
  const lat = origin[0] + (dest[0] - origin[0]) * progress
  const lng = origin[1] + (dest[1] - origin[1]) * progress

  // Calculate rotation (bearing)
  // This calculates the initial bearing. For a straight line in Mercator (Polyline), the visual angle is constant.
  // However, `Math.atan2` gives the angle on the plane.
  // Note: Leaflet coordinates are [lat, lng]. x is lng, y is lat for atan2.
  const dLon = (dest[1] - origin[1]) * Math.PI / 180;
  const lat1 = origin[0] * Math.PI / 180;
  const lat2 = dest[0] * Math.PI / 180;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360;

  // Correction for SVG rotation: The SVG plane points right (0 deg) or up (depends on path).
  // The path used (heroicons paper-airplane) points right-up (approx 45 deg) or right.
  // Let's assume standard right-pointing icon (0 deg).
  // The calculated bearing is 0 = North, 90 = East.
  // Leaflet rotation is usually clockwise from North? No, CSS rotate is clockwise.
  // If bearing is 0 (North), we want icon to point Up.
  // If icon points Right by default, we need to rotate it -90 deg to point Up?
  // Actually, let's just tune the offset.
  // The SVG provided looks like a standard paper plane pointing right.
  // So if bearing is 90 (East), rotation should be 0.
  // If bearing is 0 (North), rotation should be -90.
  // So rotation = bearing - 90.
  
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={[lat, lng]} 
        zoom={3} 
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={origin} icon={DefaultIcon}>
          <Popup>{originCode} ({t.origin})</Popup>
        </Marker>
        
        <Marker position={dest} icon={DefaultIcon}>
          <Popup>{destinationCode} ({t.destination})</Popup>
        </Marker>
        
        <Polyline positions={[origin, dest]} color="#F59E0B" weight={3} dashArray="10, 10" />
        
        <Marker 
            position={[lat, lng]} 
            icon={createPlaneIcon(bearing - 90)} 
            zIndexOffset={1000}
        >
           <Popup>{t.currentPosition}</Popup>
        </Marker>
        
        {/* <MapUpdater center={[lat, lng]} /> */}
      </MapContainer>
    </div>
  )
}
