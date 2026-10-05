export type Review = {
    review_id : string;
    product_id : string;
    customer_id : string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    created_at: Date;
}