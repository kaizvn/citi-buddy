# Requirement

  Implement a simple application which organizes data for a city. It should store data for the city’s water supply, electricity and waste. All three need to be tracked with own attributes (which you can define creatively in a way it makes sense to you). 

At least one of the data streams should come in through integration, one should be uploaded and one should be entered manually. The user should be able to analyze the data on some UI. All implemented features should be covered by automated tests.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Run command to start in local 

```bash
# pull modules
yarn

# generate db and seed data
yarn prisma:generate
yarn prisma:seed 

#  run dev
yarn dev

# build & start production
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
