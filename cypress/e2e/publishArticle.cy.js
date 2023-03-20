import { navigation } from "../../pageObjects/navigation";
import { publish } from "../../pageObjects/publish";
import { constants } from "../fixtures/constants";

describe("Publish article tests", () => {
  beforeEach(() => {
    cy.loginViaUi();
  });

  let createdArticleSlug;

  it("can publish a new article with valid data", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/articles`).as("newArticle");

    navigation.addNewArticle();
    publish.publishNew(
      constants.postTitle,
      constants.postDescription,
      constants.postBody,
      constants.postTags
    );
    cy.wait("@newArticle").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      createdArticleSlug = interception.response.body.article.slug;
    });
  });

  after(() => {
    cy.request({
      url: `${Cypress.env("apiUrl")}/articles/${createdArticleSlug}`,
      method: "DELETE",
      headers: {
        Authorization: `Token ${Cypress.env("jwtToken")}`,
      },
    });
  });
});
