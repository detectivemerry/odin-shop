This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

In a world without react Context and Database and ONLY session



switch ALL setCartItems() with data.cartItems from getSession()

WHERE TO 



















No need DB, session can persist with the info! We alr have everything we need

FLOW 1: Unauthenticated user puts item in cart > logs in > still wants item in cart
FLOW 2: Logs in > see new cart if first time here

When we update context.CartItems using setCartItems, we also update user session

Initial load will update context of the user session 



TO-DO
1. Create new table
2. Figure out Context and Mariadb
3. Hopefully can retrieve stuff from Context and not touch the code

GOAL: Save cart to use session
1. Store data in DB
2. When logged in, useContext get cart items from DB
3. When component unmount, update DB (dubious)


Unauthenticated users must be able to add items into cart
Authenticated users must be able to see all the items they added in the cart before authentication

When page is refreshed, cart items must persist with the user


Ideally

Prep
1. Create cartItem table, COLUMNS: userid, productId, quantity, paid

Workflow
1. Unauthenticated user adds item into cart -> saves item into context
2. After authentication -> add item from context to cartItem
3.

Usually context and DB do not both store states

Assuming DB is set-up,
