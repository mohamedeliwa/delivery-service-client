# Delivery Service

## Description

A private delivery service company handles the collection and delivery of parcels for people built using Reactjs, **Nextjs** and **Typescript**.

## Main Frameworks and Packages used

- **Nextjs** a react framework for building full-stack web applications.
- **axios** used as the HTTP client.
- **Socket.io** used as the web-socket client.

## Running the app

```bash
# install dependencies
$ npm install

# run the app in dev mode
# the app listen on port 3000
$ npm run dev
```

## Fulfilled Requirements

- [x] A sender should be able to create a parcel to be delivered by specifying pick-up and drop-off address (should be just a text field, no need for address validation).
- [x] A sender should be able to see the status of his parcels.
- [x] A biker should be able to see a list of the parcels
- [x] A biker should be able to pick up a parcel.
- [x] Once a parcel is picked up by a biker, it cannot be picked up by other bikers.
- [x] A biker should be able to input the timestamp of the pickup and the delivery for each order.
- [x] The status of the order should be updated for the sender.

# Extra Features added

- [x] **Web-Socket** connections to receive parcels status updates in realtime.
- [x] **JWT Authentication** for senders and bikers.
