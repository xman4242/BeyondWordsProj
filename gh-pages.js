import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://xman4242.github.io', // Update to point to your repository
  user: {
   name: 'Xavier Herman', // update to use your name
   email: 'xavier.r.herman@gmail.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);