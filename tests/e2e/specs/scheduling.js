module.exports = {
  "Create an appointent": browser => {
    browser
      .init()
      .waitForElementVisible("#app") // *[@id="app"]
      .assert.elementPresent(".agendas") // [@id="app"]/div[2]/div/h1   !==  [@id="app"]/div[3]/div/h1
      .assert.elementPresent(".my-10")
      .assert.elementPresent(".header-btns")
      .assert.elementPresent("#btn-calendar-link")
      .click("#btn-calendar")
      .click("#nav-var-calendar")
      .pause(2000)
      .assert.elementPresent(".nav-element")
      .click("#btn-create")
      .assert.elementPresent(".dialog-element")
      //.click("#name-appointment")
      //.setValue("input[id=name-appointment]", "probrando nombre")
      //.setValue("input[id=description-appointment]", "probrando descripcion")
      //.setValue("input[id=agenda-appointment]", "Work")
      //.assert.elementPresent(".menu-date")
      //.assert.elementPresent(".template-date")
      .pause(3000)
      .click("#date-appointment")
      .useXpath()
      .click(
        "//*[@id='app']/div[4]/div/div/div/div[2]/table/tbody/tr[5]/td[3]/button/div"
      )
      .pause(3000)
      .useCss()
      .click("#start-appointment")
      .setValue("input[id=start-appointment]", "12:00")
      .pause(6000)
      .click("#end-appointment")
      /*.useXpath()
      .click("//*[@id='app']/div[4]/div/div[2]/div/div/div/span[1]/span")
      .click("//*[@id='app']/div[4]/div/div[2]/div/div/div/span[1]/span")
      .pause(3000)
      .useCss()
      .click("#end-appointment")
      .useXpath()
      .click("//*[@id='app']/div[5]/div/div[2]/div/div/div/span[2]/span")
      .pause(3000)//*[@id="app"]/div[4]/div/div[2]/div/div/div/span[9]/span
      .useCss()*/
      .click("#btn-close")
      .pause(3000)
      .end();
  }
};
