export interface FlightStatusFlight {
  flightNumber: string
  airline: string
  from: string
  to: string
  fromCity: string
  toCity: string
  duration: string
}

export interface FlightStatusInstance {
  id: string
  date: string
  status: string
  scheduledDeparture: string
  scheduledArrival: string
  actualDeparture: string | null
  actualArrival: string | null

  aircraftType?: string | null
  aircraftRegistration?: string | null
  gate?: string | null
  terminal?: string | null
  weatherOrigin?: string | null
  weatherDestination?: string | null

  flight: FlightStatusFlight
}

