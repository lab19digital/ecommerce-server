export interface Product {
  id: number;
  title: string;
  price_cents: string;
  price_currency: string;
  short_description: string;
  long_description: string;
  meta: [{ key: string; value: string }];
  prices: [{ currency: string; value: number }];
  images: [{ url: string; name: string; type: string }];
  sizes: [{ size: number }];
  tags: [{ name: string }];
  categories: [{ title: string }];
  dimensions: [];
  weight: [];
  fixedPrices: [
    {
      country_code: string;
      price: number;
    }
  ];
}
