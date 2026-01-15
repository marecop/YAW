import nodemailer from 'nodemailer';
export declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
export declare function sendBookingConfirmation(emailTo: string, bookingData: {
    bookingNumber: string;
    passengerName: string;
    flightNumber: string;
    from: string;
    fromCity: string;
    to: string;
    toCity: string;
    departureTime: string;
    arrivalTime: string;
    flightDate: string;
    cabinClass: string;
    seatNumber?: string;
    totalPrice: number;
}): Promise<{
    success: boolean;
    messageId: string;
}>;
export declare function sendPasswordResetEmail(emailTo: string, token: string): Promise<{
    success: boolean;
    messageId: string;
}>;
export declare function sendVerificationEmail(emailTo: string, token: string): Promise<{
    success: boolean;
    messageId: string;
}>;
export declare function verifyEmailConnection(): Promise<boolean>;
//# sourceMappingURL=email.d.ts.map