async function foo() {
  console.log('starting foo');
  try {
    const result = await doLater();
  } catch(err) {
    console.log('caught err');
  }
  console.log('-');


}

function doLater() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('did later');
      reject(123);
    }, 2000);
  });
}

console.log();
console.log('------');
foo();
