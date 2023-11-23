async function readErrorMsg() {
  await fetch("https://webhook.site/40d8deaa-34a4-44de-be0d-834c14e8b057")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(JSON.stringify(myJson));
    });
}
async function poolMsg() {
  for (let i = 0; i < 100; i++) {
   const message =  await readErrorMsg();
   console.log('msg',message);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

poolMsg();