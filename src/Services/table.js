import { TableHasActiveOrdersException } from "../Utils/errors";

export const checkoutTable = async (activity_id) => {
    const res = await fetch(`https://eotapp.alwaysdata.net/api/table/checkout/${activity_id}`, {
        method: 'PUT',
        headers: { "Content-Type": "Application/JSON" }
    })

    if (res.status === 406)
        throw new TableHasActiveOrdersException();

    return res.json();
}

export const getTableInfo = async (table_id) => {
    const res = await fetch(`https://eotapp.alwaysdata.net/api/table/order/TABLE${table_id}`);
    if (res.status === 412)
        return window.location.href = '/error/';

    return res.json();
}

export const getOrderInfo = async (order_id) => {
    const res = await fetch(`https://eotapp.alwaysdata.net/api/table/order/detailed/${order_id}`);
    return res.json();
}