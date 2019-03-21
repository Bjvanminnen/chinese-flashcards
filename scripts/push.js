const authorize = require('./auth');

async function push() {
  const authClient = await authorize();
  console.log(authClient);
}
push();
