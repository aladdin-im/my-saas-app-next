'use server'

import { getDb } from "@/db";
import { order } from "@/db/schema/schema";
import { Order } from "@/db/types";

export async function getOrders(): Promise<Order[]> {
    const db = await getDb();
    const orders = await db.select().from(order);
    return orders;
}

export async function createOrder(status: string): Promise<Order> {
    const db = await getDb();
    const newOrder = await db.insert(order).values({
        status: status
    }).returning();
    return newOrder[0];
}