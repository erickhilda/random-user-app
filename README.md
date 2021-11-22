**This** is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or if you using yarn
yarn
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the integration tests, run:

```bash
# Make sure the web was already running before you run the tests
# run with cypress UI
npm run cy:open
# or
yarn cy:open

# run cypress without it's UI
npm run cy:run
# or
yarn cy:run
```

## To Do List
- [x] Create layout and data table
- [x] fetch data from [https://randomuser.me/](https://randomuser.me/)
- [x] Add pagination for table
- [x] Add filter by gender functionality
- [x] Add search by keyword functionality
- [x] Add sort functionality
- [x] Add Reset Filter functionality
- [ ] Implenet Unit/Integration test
