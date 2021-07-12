import { Selector } from "testcafe";
import { getDevicesList, updateDevice } from "../handlers";

fixture`tests`.page`http://localhost:3001/`;

const renamedDev = {
  system_name: "Renamed Device",
  type: "WINDOWS_SERVER",
  hdd_capacity: "500 GB",
};
const deviceInfoName = Selector("div.device-info span.device-name");
const deviceInfoType = Selector("div.device-info span.device-type");
const deviceInfoCapacity = Selector("div.device-info span.device-capacity");

// Test 3
// Make an API call that renames the first device of the list to “Renamed Device”.
// Reload the page and verify the modified device has the new name.
test("test three", async (t) => {
  const devicesList = await getDevicesList();
  const firstDeviceID = devicesList[0].id;
  const firstDeviceUrl = `http://localhost:3000/devices/${firstDeviceID}`;

  await updateDevice(firstDeviceUrl, renamedDev);

  await t.eval(() => window.location.reload(true));
  await t.wait(2000);

  await t
    .expect(deviceInfoName.withText(renamedDev.system_name).exists)
    .eql(true);
  await t.expect(deviceInfoType.withText(renamedDev.type).exists).eql(true);
  await t
    .expect(deviceInfoCapacity.withText(renamedDev.hdd_capacity).exists)
    .eql(true);
});
