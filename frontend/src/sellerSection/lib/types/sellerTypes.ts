export type Inventory = {
    product_id: string
    productName: string;
    price: number;
    sellerId: string;
    productDescription: string;
    approvalStatus: "pending" | "approved" | "rejected";
    quantity: number;
    category: Category
}

type Category =  { name: "sweets"; type: "Barfi" | "Pedha" | "other sweets" }
| { name: "savories"; type: "Khakra" | "Kachori" | "Sev" };

export type ProductImage = {
    imageId: string;
    productId: string;
    imageUrl?: string;
}