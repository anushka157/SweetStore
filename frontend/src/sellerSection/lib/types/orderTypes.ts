export type OrderItems = {
    order_item_id: string;  
    order_id: string;       
    product_id: string;     
    seller_id: string;      
    quantity: number;      
    item_price: number;   
    total_price: number;
    delivery_status:'Pending' | 'Shipped' | 'Delivered' | 'Canceled';
    delivery_date: Date;
    product_name: string;
}