export interface User {
    id: string;
    email: string;
    name: string;
    membershipLevel: 'SILVER' | 'GOLD' | 'PLATINUM';
    points: number;
    phone?: string;
    dateOfBirth?: Date;
    nationality?: string;
    passportNumber?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Flight {
    id: string;
    flightNumber: string;
    from: string;
    fromCity: string;
    to: string;
    toCity: string;
    departureTime: Date;
    arrivalTime: Date;
    duration: number;
    aircraft: string;
    status: 'SCHEDULED' | 'BOARDING' | 'DEPARTED' | 'ARRIVED' | 'DELAYED' | 'CANCELLED';
    economyPrice: number;
    businessPrice: number;
    firstClassPrice: number;
    economySeats: number;
    businessSeats: number;
    firstClassSeats: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface Booking {
    id: string;
    userId: string;
    flightId: string;
    bookingNumber: string;
    passengerName: string;
    passengerEmail: string;
    passengerPhone: string;
    passportNumber?: string;
    cabinClass: 'ECONOMY' | 'BUSINESS' | 'FIRST_CLASS';
    seatNumber?: string;
    status: 'CONFIRMED' | 'CHECKED_IN' | 'CANCELLED' | 'COMPLETED';
    totalPrice: number;
    specialMeal?: string;
    extraBaggage: number;
    checkedIn: boolean;
    createdAt: Date;
    updatedAt: Date;
    flight?: Flight;
}
export interface Promotion {
    id: string;
    title: string;
    titleDe?: string;
    titleEn?: string;
    titleZhCn?: string;
    titleZhHk?: string;
    description: string;
    descDe?: string;
    descEn?: string;
    descZhCn?: string;
    descZhHk?: string;
    discount: number;
    validFrom: Date;
    validUntil: Date;
    imageUrl?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Policy {
    id: string;
    category: 'BAGGAGE' | 'CANCELLATION' | 'REFUND' | 'TERMS';
    title: string;
    titleDe?: string;
    titleEn?: string;
    titleZhCn?: string;
    titleZhHk?: string;
    content: string;
    contentDe?: string;
    contentEn?: string;
    contentZhCn?: string;
    contentZhHk?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface Benefit {
    id: string;
    level: 'SILVER' | 'GOLD' | 'PLATINUM';
    title: string;
    titleDe?: string;
    titleEn?: string;
    titleZhCn?: string;
    titleZhHk?: string;
    description: string;
    descDe?: string;
    descEn?: string;
    descZhCn?: string;
    descZhHk?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface FlightSearchParams {
    from: string;
    to: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    cabinClass: 'ECONOMY' | 'BUSINESS' | 'FIRST_CLASS';
    directOnly?: boolean;
}
export interface Seat {
    row: number;
    column: string;
    isAvailable: boolean;
    isEmergencyExit: boolean;
    isPremium: boolean;
    price: number;
}
export interface SeatMap {
    cabinClass: 'ECONOMY' | 'BUSINESS' | 'FIRST_CLASS';
    layout: string;
    seats: Seat[];
}
//# sourceMappingURL=index.d.ts.map