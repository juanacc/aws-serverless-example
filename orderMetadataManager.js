'use-strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

/**
    order: {
        orderId: String,
        name: String,
        address: String,
        pizzas: Array of Strings,
        delivery_status: READY_FOR_DELIVERY | DELIVERED,
        date: date
    }
 */

module.exports.saveCompletedOrder = order => {
    console.log('Saving order');

    order.delivery_status = "READY_FOR_DELIVERY";

    const params = {
        TableName: process.env.COMPLETED_ORDER_TABLE,
        Item: order
    }

    return dynamo.put(params).promise();

}

module.exports.deliverOrder = orderId => {
    console.log('Delivering order');

    // hago un update en la tabla de pedidos
    const params = {
        TableName: process.env.COMPLETED_ORDER_TABLE,
        Key: {
            orderId
        },
        ConditionExpression: 'attribute_exists(orderId)',
        UpdateExpression: 'set delivery_status = :delivery_status',
        ExpressionAttributeValues: {
            ':delivery_status': 'DELIVERED'
        },
        ReturnValues: 'ALL_NEW'
    }

    return dynamo.update(params).promise().then(response => {
        console.log('Order delivered');
        return response.Attributes;
    });
}