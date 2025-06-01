export interface ApiResponse{
    success: boolean;
    message: string;
    isAccsepted?: boolean; // Optional, use if applicable
    data?: any; // Use a more specific type if possible
}