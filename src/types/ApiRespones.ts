export interface ApiResponse{
    success: boolean;
    message: string;
    isAccsepted?: boolean; // Optional, use if applicable
    data?: Date; // Use a more specific type if possible
}