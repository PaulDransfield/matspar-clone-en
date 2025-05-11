'use client';

import React, { useState } from 'react';
import ProfileLayout from '@/components/profile/ProfileLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Eye, Package, ShoppingCart, Truck, CheckCircle } from 'lucide-react';

// Sample order data for demonstration purposes
const sampleOrders = [
  {
    id: 'ORD-2023-1001',
    date: '2023-12-15',
    total: 349.50,
    items: 6,
    status: 'delivered',
    items_list: [
      {
        id: '1',
        name: 'Organic Minced Beef 12%',
        quantity: 1,
        price: 139.00,
        imageUrl: 'https://ext.same-assets.com/2461038866/4096530337.webp'
      },
      {
        id: '2',
        name: 'Chips Sourcream & Onion',
        quantity: 2,
        price: 22.50,
        imageUrl: 'https://ext.same-assets.com/2461038866/4197152896.webp'
      },
      {
        id: '3',
        name: 'Coca-Cola 1.5L',
        quantity: 2,
        price: 19.00,
        imageUrl: 'https://ext.same-assets.com/2461038866/2426340413.webp'
      },
      {
        id: '4',
        name: 'Dip Cheddar Cheese Style',
        quantity: 1,
        price: 24.50,
        imageUrl: 'https://ext.same-assets.com/2461038866/1166648733.webp'
      },
    ]
  },
  {
    id: 'ORD-2023-0984',
    date: '2023-12-01',
    total: 253.76,
    items: 8,
    status: 'delivered',
    items_list: [
      {
        id: '5',
        name: 'Swedish Crisp Bread',
        quantity: 1,
        price: 18.95,
        imageUrl: 'https://ext.same-assets.com/2461038866/107951174.webp'
      },
      {
        id: '6',
        name: 'Organic Whole Milk 3%',
        quantity: 2,
        price: 15.90,
        imageUrl: 'https://ext.same-assets.com/2461038866/2492016397.webp'
      },
      {
        id: '7',
        name: 'Organic Free-Range Eggs 10-pack',
        quantity: 1,
        price: 39.90,
        imageUrl: 'https://ext.same-assets.com/2461038866/1763607979.webp'
      },
    ]
  },
  {
    id: 'ORD-2023-0932',
    date: '2023-11-20',
    total: 185.30,
    items: 5,
    status: 'delivered',
    items_list: [
      {
        id: '8',
        name: 'Bregott Butter & Rapeseed Normal Salted 75%',
        quantity: 1,
        price: 47.90,
        imageUrl: 'https://ext.same-assets.com/2461038866/3046215918.webp'
      },
      {
        id: '9',
        name: 'Brew Coffee Medium Roast',
        quantity: 1,
        price: 75.00,
        imageUrl: 'https://ext.same-assets.com/2461038866/1212193402.webp'
      },
      {
        id: '10',
        name: 'Priest Cheese 31% Medium Aged',
        quantity: 1,
        price: 85.68,
        imageUrl: 'https://ext.same-assets.com/2461038866/2378028912.webp'
      },
    ]
  }
];

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<typeof sampleOrders[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-orange-500">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-600">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const viewOrderDetails = (order: typeof sampleOrders[0]) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ProfileLayout
      title="Order History"
      description="View your past orders and track current orders"
    >
      <div className="space-y-6">
        {sampleOrders.length > 0 ? (
          <Table>
            <TableCaption>Your order history</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total.toFixed(2)} kr</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewOrderDetails(order)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <Button className="bg-green-600 hover:bg-green-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedOrder && (
                <>
                  {getStatusIcon(selectedOrder.status)}
                  Order {selectedOrder.id}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedOrder && (
                <div className="flex justify-between">
                  <span>Placed on {formatDate(selectedOrder.date)}</span>
                  <span>{getStatusBadge(selectedOrder.status)}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="border-t border-b py-4">
                <h4 className="font-medium mb-3">Order Items</h4>
                <div className="space-y-4">
                  {selectedOrder.items_list.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-16 w-16 rounded-md bg-gray-100 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="object-contain h-full w-full p-1"
                        />
                      </div>
                      <div className="flex-grow">
                        <h5 className="text-sm font-medium">{item.name}</h5>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-gray-500">
                            {item.quantity} x {item.price.toFixed(2)} kr
                          </span>
                          <span className="text-sm font-medium">
                            {(item.quantity * item.price).toFixed(2)} kr
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{selectedOrder.total.toFixed(2)} kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium text-base pt-2 border-t">
                  <span>Total</span>
                  <span>{selectedOrder.total.toFixed(2)} kr</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Reorder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ProfileLayout>
  );
};

export default OrdersPage;
