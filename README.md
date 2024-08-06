# Option 1: Restaurant Reservation 🍽️

Implement a restaurant reservation system where you'll implement user authentication, display a list of available restaurants with their operating hours, enable users to book reservations, and provide a view of all their bookings.

## Specifications

- User sign-up and login functionality.
- User can view a list of restaurants on platform
  - Restaurant Italy: Open every day from 7-10pm
  - Restaurant China: Open everyday from 5-10pm
  - Restaurant France: Open Monday - Friday from 7-10pm
- User can make a booking at a restaurant (time, number of people)
- **Extra**: User can view all reservations made on platform (this can be in a separate page on the same website)

## Task

- [x] create form booking
- [x] create page res
- [x] create page login
- [x] create time & day restaurants logic
- [x] implement UI
- [x] submit form and record
- [] user for test time

## Time Test Case

## design state

```ts
enum Status {
  Reserve,
  CheckIn,
  CheckOut,
}

const o = {
  username: 'znantipat',
  reserves: [
    { name: '1', status: Status.Reserve },
    { name: '2', status: Status.Reserve },
    { name: '3', status: Status.Reserve },
  ],
}
```
