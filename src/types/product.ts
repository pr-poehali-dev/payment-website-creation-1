export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  type: "digital" | "physical";
  deliveryConfig?: {
    downloadUrl?: string;
    licenseKey?: string;
    instructions?: string;
    validityDays?: number;
  };
}

export interface DeliveryResult {
  success: boolean;
  downloadLink?: string;
  licenseKey?: string;
  instructions?: string;
  expiresAt?: Date;
}
