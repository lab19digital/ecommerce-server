declare namespace Gernzy {
    type GernzyConfig = {
        apiUrl?: string;
    };

    type Product = {
        product_id: number;
        title: string;
        price_cents: number;
        price_currency: string;
        short_description: string;
        id: number;
        quantity: number;
        buttonText: string;
    };

    type EventTarget = {
        target: HTMLInputElement;
    };

    type reViewProductsInCart = {
        errors: [{ debugMessage: string }];
        data: { me: { cart: { items: [] } } };
    };
    type reSendOfCheckoutInfo = {
        errors: [{ debugMessage: string }];
        data: { checkout: { event_data: string } };
    };
}
