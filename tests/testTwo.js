import { Selector, ClientFunction } from "testcafe";
import axios from "axios";

fixture`tests`.page`http://localhost:3001/`;

const systName = "ANDREI PC";
const devType = "WINDOWS SERVER";
const capacity = "127";
const systNameSel = Selector("input#system_name");
const capacityHdd = Selector("input#hdd_capacity");
const type = Selector("#type");
const typeOption = type.find("option");
const saveBttn = Selector("button.submitButton");
const devTypeTwo = "WINDOWS_SERVER";
const button = Selector(".submitButton");
const devInfoName = Selector("div.device-info span.device-name");
const devInfoType = Selector("div.device-info span.device-type");
const devInfoCapacity = Selector("div.device-info span.device-capacity");

// Create a new device, and check their name, type and capacity
// are visible and correctly displayed to the user.
test("Test two", async (t) => {
  const addDeviceButton = Selector(".submitButton").withText("ADD DEVICE");
  await t.click(addDeviceButton);

  const getWindowLocation = ClientFunction(() => window.location.href);
  await t
    .expect(getWindowLocation())
    .contains("http://localhost:3001/devices/add");
  await t
    .typeText(systNameSel, systName)
    .click(type)
    .click(typeOption.withText(devType))
    .typeText(capacityHdd, capacity)
    .click(saveBttn);
  await t.expect(button.withText("ADD DEVICE").exists).eql(true);
  await t.expect(devInfoName.withText(systName).exists).eql(true);
  await t.expect(devInfoType.withText(devTypeTwo).exists).eql(true);
  await t.expect(devInfoCapacity.withText(capacity).exists).eql(true);
});
