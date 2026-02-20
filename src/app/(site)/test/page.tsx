'use client'

import { createOrder, getOrders } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { Order } from "@/db/types";
import { useEffect, useState } from "react";


export default function TestPage() {

    const [orders, setOrders] = useState<Order[]>([]);

    const handleCreateOrder = async () => {
        const newOrder = await createOrder("pending");
        setOrders([...orders, newOrder]);
    }

    useEffect(() => {
        getOrders().then((orders: Order[]) => {
            setOrders(orders);
        });
    }, []);

    return (
        <div>
            <h1>Test</h1>
            <pre>{JSON.stringify(orders, null, 2)}</pre>
            <Button onClick={handleCreateOrder}>Create Order</Button>
        </div>
    )
}
