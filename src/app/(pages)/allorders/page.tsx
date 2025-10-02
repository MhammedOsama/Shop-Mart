"use client";

import { useEffect } from "react";

export default function AllOrders() {
  async function getUserOrders() {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem(
        "userId"
      )}`
    );
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return <h1>AllOrders</h1>;
}
