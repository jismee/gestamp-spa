export interface Sale {
    region: string;
    country: string;
    itemType: string;
    saleChannel: string;
    orderDate: Date;
    orderId: number;
    orderPriority: string;
    shipDate: Date;
    unitsSold: number;
    unitPrice: number;
    unitCost: number;
    totalRevenue: number;
    totalCost: number;
    totalProfit: number;
}

/*
"id": 0,
  "region": "string",
  "country": "string",
  "itemType": "string",
  "saleChannel": "string",
  "orderPriority": "string",
  "orderDate": "2019-12-14T21:21:37.190Z",
  "orderId": 0,
  "shipDate": "2019-12-14T21:21:37.191Z",
  "unitsSold": 0,
  "unitPrice": 0,
  "unitCost": 0,
  "totalRevenue": 0,
  "totalCost": 0,
  "totalProfit": 0
*/
