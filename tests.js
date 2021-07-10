import { Selector } from "testcafe";
import axios from "axios";

fixture`tests`.page`http://localhost:3001/`;

let devicesList = {};
const deviceName = Selector("div.device-info span.device-name");
const deviceType = Selector("div.device-info span.device-type");
const deviceCapacity = Selector("div.device-info span.device-capacity");
const deviceEdit = Selector("div.device-options a.device-edit");
const deviceRemove = Selector("div.device-options button.device-remove");

test("Test one", async (t) => {
  const { data } = await axios.get("http://localhost:3000/devices");
  devicesList = data;
  const deviceItem = devicesList.map(async (item) => {
    await t.expect(deviceName.withText(item.system_name).exists).eql(true);
    await t.expect(deviceType.withText(item.type).exists).eql(true);
    await t.expect(deviceCapacity.withText(item.hdd_capacity).exists).eql(true);
  });
  await Promise.all(deviceItem);
  const buttons = devicesList.map(async (device, index) => {
    await t.expect(deviceEdit.nth(index).withText("EDIT").exists).eql(true);
    await t.expect(deviceRemove.nth(index).withText("REMOVE").exists).eql(true);
  });
  await Promise.all(buttons);
});
