declare namespace Gernzy {
    interface GernzyConfig {
        apiUrl?: string;
    }

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

    interface EventTarget {
        target: HTMLInputElement;
    }

    interface reViewProductsInCart {
        errors: [{ debugMessage: string }];
        data: { me: { cart: { items: [] } } };
    }
    interface reSendOfCheckoutInfo {
        errors: [{ debugMessage: string }];
        data: { checkout: { event_data: string } };
    }

    interface CheckoutInfo {
        [key: string]: string | boolean | number | string[] | undefined;
    }
}
