import NextAuth from 'next-auth';

const options = {
    // ...
    strategies: [
      {
        name: "database",
        // ...
      },
    ],
  };
  
  export default NextAuth(options);