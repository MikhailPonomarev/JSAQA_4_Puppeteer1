let page;

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
 });

  test("The h1 header content'", async () => {
    await page.setDefaultTimeout(10000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test("The first link attribute", async () => {
    await page.setDefaultTimeout(10000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(10000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

describe("Github start page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/");
 });

  test("Should check Enterprise page title", async () => {
    await page.setDefaultTimeout(10000);
    const enterpriseTab = await page.$("[href='/enterprise']");
    await enterpriseTab.click();
    const title = "[class='h1-mktg mb-3 color-fg-default']";
    await page.waitForSelector(title, {
      visible: true,
    });
    const actual = await page.$eval(title, link => link.textContent); 
    expect(actual).toContain("Build like the best");
  });

  test("Should check Marketplace page title", async () => {
    await page.setDefaultTimeout(10000);
    const enterpriseTab = await page.$("[href='/marketplace']");
    await enterpriseTab.click();
    const title = "[class='h1 mb-2 lh-condensed-ultra']";
    await page.waitForSelector(title, {
      visible: true,
    });
    const actual = await page.$eval(title, link => link.textContent); 
    expect(actual).toContain("Extend GitHub");
  });

  test("Should check Sign In page title", async () => {
    await page.setDefaultTimeout(10000);
    const signIn = await page.$("[href='/login']");
    await signIn.click();
    const title = "[class='auth-form-header p-0']";
    await page.waitForSelector(title, {
      visible: true,
    });
    const actual = await page.$eval(title, link => link.textContent); 
    expect(actual).toContain("Sign in to GitHub");
  });
});
