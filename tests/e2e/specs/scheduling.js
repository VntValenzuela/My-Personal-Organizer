module.exports = {
  "Appointent dialog works correctly": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent(".agendas")
      .assert.elementPresent(".my-10")
      .assert.elementPresent(".header-btns")
      .assert.elementPresent("#btn-calendar-link")
      .click("#btn-calendar")
      .click("#nav-var-calendar")
      .pause(2000)
      .assert.elementPresent(".nav-element")
      .click("#btn-create")
      .assert.elementPresent("#dialog-element")
      .pause(3000)
      //.click("#name-appointment")
      //.setValue("input[id=name-appointment]", "probrando nombre")
      //.setValue("input[id=description-appointment]", "probrando descripcion")
      //.setValue("input[id=agenda-appointment]", "Work")
      //.pause(3000)
      //.click("#date-appointment")
      //.useXpath()
      //.click(
      //  "//*[@id='app']/div[4]/div/div/div/div[2]/table/tbody/tr[5]/td[3]/button/div"
      //)
      //.pause(3000)
      ///.useCss()
      .click("#btn-close")
      .pause(3000)
      .end();
  },
  "unFilter and filter events by Work agenda": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent(".agendas")
      .assert.elementPresent(".my-10")
      .assert.elementPresent(".header-btns")
      .assert.elementPresent("#btn-calendar-link")
      .click("#btn-calendar")
      .click("#nav-var-calendar")
      .pause(2000)
      .assert.elementPresent(".nav-element")
      .click("#checkbox-work")
      .pause(3000)
      .click("#checkbox-work")
      .pause(3000)
      .end();
  }
};
