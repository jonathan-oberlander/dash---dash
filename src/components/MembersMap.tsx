'use client'

import React, { useEffect, useState } from 'react'
import { ChartCard } from './ChartCard'
import { Interaction, PostcodeAPIResponse } from '@/types'

import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export function MembersMap({ interactions }: { interactions: Interaction[] }) {
  const [coordinates, setCoordinates] = useState<
    { latitude: number; longitude: number; postcode: string }[] | undefined
  >()

  useEffect(() => {
    const postcodes = interactions
      .map((i) => i.member.postcode)
      .filter((p) => !!p)
      .slice(0, 80)

    fetch('https://api.postcodes.io/postcodes', {
      method: 'POST',
      body: JSON.stringify({
        postcodes,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data: PostcodeAPIResponse) => {
        setCoordinates(
          data.result.map(({ result }) => ({
            latitude: result.latitude,
            longitude: result.longitude,
            postcode: result.postcode,
          })),
        )
      })
  }, [])

  const icon = new Icon({
    iconUrl:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  return (
    <ChartCard
      title="Members Map"
      description="Where are your members a located?"
    >
      <MapContainer
        center={[51.8772815, -0.4140016]}
        zoom={10}
        style={{ height: '400px', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates?.map(({ latitude, longitude, postcode }, i) => (
          <Marker key={i} position={[latitude, longitude]} icon={icon}>
            <Popup>{postcode}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </ChartCard>
  )
}
