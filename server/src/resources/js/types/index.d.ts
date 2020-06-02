declare namespace Gernzy {
    interface GernzyConfig {
        apiUrl?: string;
    }

    interface Products {}

    interface Product {
        product_id: number;
        title: string;
        price_cents: number;
        price_currency: string;
        short_description: string;
        id: number;
        quantity: number;
        buttonText: string;
    }
}
