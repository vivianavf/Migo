// Trackear la info de Google Maps
addEventListener("trackLocation", async (resolve, reject, args) => {
  try {
    // const watchId = Geolocation.watchPosition({timeout: 10000}, (position, err) => {
    //   if (err) {
    //     console.error('Error al obtener la posición:', err);
    //   } else {
    //     // this.handlePositionUpdate(position!);
    //     console.log('Estamos en la posicion -- ', JSON.stringify(position));
    //   }
    // });
    console.log("Get actual location....")
    console.log("Set marker on the map....")
    console.log("Store value somewhere....")

    // Resolve the event call
    resolve();
  } catch (err) {
    console.error(err);
    console.log("Ha habido un error....")
    reject(err);
  }
});

// Save a time and location object in the Capacitor KV store
addEventListener("checkIn", async (resolve, reject, args) => {
  try {
    console.log("checkIn event fired");
    const { value } = CapacitorKV.get("CHECKINS");

    // Gather some data
    const time = new Date().getTime();
    const location = await CapacitorGeolocation.getCurrentPosition();

    // Create an array of checkins
    let checkinArr = [{ location, time }];

    // Try to append our data to the existing array
    try {
      const parsedArr = JSON.parse(value);
      checkinArr = [...parsedArr, { location, time }];
    } catch (e) {
      console.log("no checkins");
    }

    console.log(checkinArr);
    // Save the array
    CapacitorKV.set("CHECKINS", JSON.stringify(checkinArr));

    console.log("checkin saved");
    // Resolve the event call
    resolve();
  } catch (err) {
    console.error(err);
    reject(err);
  }
});

// Get all checkins from the Capacitor KV store
addEventListener("loadCheckins", (resolve, reject, args) => {
  try {
    const { value } = CapacitorKV.get("CHECKINS");

    try {
      const arr = JSON.parse(value);
      resolve(arr);
    } catch (e) {
      resolve([]);
    }
  } catch (err) {
    console.error(err);
    reject([]);
  }
});

// Get all checkins from the Capacitor KV store
addEventListener("myEvent", (resolve, reject, args) => {
    try {
      resolve();
    } catch (err) {
      console.error(err);
      reject();
    }
  });
