export type CompleteProductDetails = {
    productId: string;
    sellerId:string;
    productName: string;
    productDescription: string;
    category: string;
    price: number;
    categoryType: string;
    businessName: string;
    city: string;
    country: string;
    signerUrl:string
  };
  
export type productWithImage = {
  image_url: string,
  product_id: string,
  product_name: string,
  product_description: string,
  price: number;
  seller_id:string;
}