/*module.exports = {
  "Adding new participant works correctly": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .pause(3000)
      .click("#redirectToParticipants")
      .pause(3000)
      .assert.elementPresent("#register")
      .click("#register")
      .pause(3000)
      .assert.elementPresent("#newNameInput")
      .assert.elementPresent("#newContactNumberInput")
      .assert.elementPresent("#newGenderInput")
      .setValue("input[id=newNameInput]", "Vanessa Bustillos")
      .pause(3000)
      .setValue("input[id=newContactNumberInput]", 67427046)
      .pause(3000)
      .setValue("input[id=newGenderInput]", "Female")
      .pause(3000)
      .assert.elementPresent("#cancelRegisterButton")
      .assert.elementPresent("#registerButton")
      .click("#registerButton")
      .pause(3000)
      .end();
  },
  "Don't register a participant if it contains empty fields": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .pause(3000)
      .click("#redirectToParticipants")
      .pause(3000)
      .click("#register")
      .pause(3000)
      .assert.elementPresent("#newNameInput")
      .assert.elementPresent("#newContactNumberInput")
      .assert.elementPresent("#newGenderInput")
      .setValue("input[id=newNameInput]", "")
      .pause(3000)
      .setValue("input[id=newContactNumberInput]", 67452348)
      .pause(3000)
      .setValue("input[id=newGenderInput]", "Male")
      .pause(3000)
      .click("#registerButton")
      .pause(3000)
      .end();
  },
  "Set Data works correctly": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .pause(3000)
      .click("#redirectToParticipants")
      .pause(3000)
      .assert.elementPresent("#update")
      .click("#update")
      .waitForElementVisible("#updatedNameInput")
      .waitForElementVisible("#updatedContactNumberInput")
      .waitForElementVisible("#updatedGenderInput")
      .pause(3000)
      .assert.elementPresent("#updatedNameInput")
      .assert.elementPresent("#updatedContactNumberInput")
      .assert.elementPresent("#updatedGenderInput")
      .pause(3000)
      .assert.elementPresent("#cancelUpdateButton")
      .assert.elementPresent("#updateButton")
      .end();
  },
  "Delete a participant without upcoming appointments, works correctly": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .pause(3000)
      .click("#redirectToParticipants")
      .pause(3000)
      .assert.elementPresent("#delete")
      .click("#delete")
      .pause(3000)
      .assert.elementPresent("#cancelDeleteButton")
      .assert.elementPresent("#deleteButton")
      .click("#deleteButton")
      .end();
  }
};
*/
s