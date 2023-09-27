export default function handleResponseFromAPI(promise) {
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      body: 'sucess',
    });
    reject(Error());
})
}

handleResponseFromAPI().then(() => {
  console.log("Got a response from the API");
})
