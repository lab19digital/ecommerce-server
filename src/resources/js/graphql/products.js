const productSchema = `
    schema {
        query: Query
    }

    type Query {
        bars: String
    }

    extend type Query {
        products(input: ProductsQueryInput): [Product!]!
        product(id: ID ): Product 
        productsByCategories(input: ProductsCategoriesInput): [Product!]!
        productsByTag(tag: Int!): [Product!]!
        productsByTags(tags: [Int!]): [Product!]!
    }

    input ProductsQueryInput {
        keyword: String
        attributes: [ProductsQueryInputAttributes!]
    }

    input ProductsQueryInputAttributes {
        name: String
        value: String
    }

    input ProductsCategoriesInput {
        ids: [Int!]
        titles: [String!]
    }

    type Product {
        id: ID!
        parent_id: ID
        title: String!
        status: String!
        published: Int!
        price_cents: Int
        price_currency: String
        short_description: String
        long_description: String
        created_at: String!
        updated_at: String!
        meta: [ProductAttribute!]
        prices: [ProductPrice!]
        sizes: [ProductSize!]
        variants: [Product!]
        categories: [ProductCategory!]
        dimensions: ProductDimensions
        weight: ProductWeight
        images: [Image!]
        featured_image: Image
        tags: [Tag!]
        fixedPrices: [ProductFixedPrice!]
    }

    type ProductFixedPrice {
        id: ID!
        country_code: String
        price: Float
    }

    type ProductDimensions {
        length: Float
        width: Float
        height: Float
        unit: String
    }

    type ProductWeight {
        weight: Float
        unit: String
    }

    type ProductCategory {
        id: Int!
        title: String!
    }

    type Mutation {
        foo (
          postId: Int!
        ): String
    }

    extend type Mutation {
        createProduct(input: CreateProductInput!): Product
        updateProduct(id: ID!, input: UpdateProductInput!): Product
        deleteProduct(id: ID!): DeleteResult
    }

    input CreateProductInput {
        title: String!
        price_cents: Int
        price_currency: String
        short_description: String
        long_description: String
        meta: [ProductAttributeInput!]
        prices: [ProductPriceInput!]
        sizes: [ProductSizeInput!]
        categories: [CategoryInput!]
        dimensions: ProductDimensionsInput
        weight: ProductWeightInput
        fixprices: [PricingInput]
    }

    input PricingInput {
        currency: String!
        price_cents: Float
    }

    input ProductDimensionsInput {
        length: Float
        width: Float
        height: Float
        unit: String
    }

    input ProductWeightInput {
        weight: Float
        unit: String
    }

    input CategoryInput {
        title: String
        id: ID
    }

    input UpdateProductInput {
        title: String
        price_cents: Int
        price_currency: String
        short_description: String
        long_description: String
        meta: [ProductAttributeInput!]
        prices: [ProductPriceInput!]
        sizes: [ProductSizeInput!]
        categories: [CategoryInput!]
        dimensions: ProductDimensionsInput
        weight: ProductWeightInput
    }

    input ProductAttributeInput {
        key: String!
        value: String!
    }

    input ProductPriceInput {
        currency: String!
        value: Int!
    }

    input ProductSizeInput {
        size: String!
    }

    type DeleteResult {
        success: Boolean!
    }

    type ProductAttribute {
        id: ID!
        group: String!
        key: String!
        value: String!
        created_at: String
        updated_at: String
    }

    type ProductPrice {
        currency: String!
        value: Int!
    }

    type ProductSize {
        size: String!
    }

    extend type Mutation {
        createProductVariant(id: ID!, input: CreateProductInput!): Product
        addImage(input: AddProductImage!): Image
        addProductImages(product_id: ID!, images: [ID!]): AddProductImagesPayload!
        setProductFeaturedImage(product_id: ID!, image_id: ID!): SetProductFeaturedImagePayload!
        addProductTags(product_id: ID!, tags: [ID!]): AddProductTagsPayload!
    }

    input AddProductImage {
        file: String!
        gallery: ID
    }

    type Image {
        id: ID!
        url: String!
        type: String!
        name: String!
    }

    type AddProductImagesPayload {
        product: Product!
        images: [Image!]
    }

    type AddProductTagsPayload {
        product: Product!
        tags: [Tag!]
    }

    type SetProductFeaturedImagePayload {
        product: Product!
    }

    type Tag {
        id: ID!
        name: String!
        products: [Product!]!
    }
`;

export default productSchema;
