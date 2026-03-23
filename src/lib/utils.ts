import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatUGX(amount: number): string {
    return `UGX ${amount.toLocaleString('en-US')}`;
}

export function formatUSD(amountUGX: number, rate: number): string {
    return `$${(amountUGX / rate).toFixed(2)}`;
}

export function generateOrderId(): string {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `CBC-${ts}-${rand}`;
}
