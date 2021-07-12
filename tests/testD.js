import { Selector } from "testcafe";
import {
  getDevicesList,
  deleteDevice,
  getDevicesListLength,
} from "../handlers";

fixture`tests`.page`http://localhost:3001/`;

const deviceInfoName = Selector("div.device-info span.device-name");

// Make an API call that deletes the last element of the list. Reload the page
// and verify the element is no longer visible and it doesn’t exist in the DOM.
test("test four", async (t) => {
  const devicesList = await getDevicesList();
  const devicesBeforeDelete = await getDevicesListLength();

  const lastElement = devicesList[devicesBeforeDelete - 1];
  const lastElementUrl = `http://localhost:3000/devices/${lastElement.id}`;

  await deleteDevice(lastElementUrl);
  await t.eval(() => window.location.reload(true));
  await t.wait(2000);

  const devicesAfterDelete = await getDevicesListLength();
  await t.expect(devicesBeforeDelete).notEql(devicesAfterDelete);
  await t
    .expect(deviceInfoName.withText(lastElement.system_name).exists)
    .eql(false);
});
