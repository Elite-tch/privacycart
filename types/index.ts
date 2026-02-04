export interface Product {
    id: string;
    name: string;
    price: string;
    provider: string;
    privacyLevel: "High" | "Medium" | "Verified";
    image: string;
    description: string;
    details: string[];
}
