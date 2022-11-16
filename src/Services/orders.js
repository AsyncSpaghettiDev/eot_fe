export const createNewOrder = async (orderInfo, table_order_id) => {
    const res = await fetch('https://eotapp.alwaysdata.net/api/table/order', {
        method: 'POST',
        body: JSON.stringify({
            ...orderInfo,
            table_order_id,
        }),
        headers: { "Content-Type": "Application/JSON" },
    })
    const data = await res.json();
    console.log(data)
    return data.orderInfo;
}

export const getOrders = async () => {
    const res = await fetch(`https://eotapp.alwaysdata.net/api/orders`);
    return await res.json();
}

export const updateOrderStatus = async (order_id, status) => {
    const res = await fetch(`https://eotapp.alwaysdata.net/api/orders/${order_id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: { "Content-Type": "Application/JSON" },
    });
    return await res.json();
}