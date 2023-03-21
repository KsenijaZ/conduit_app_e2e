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

  it("can't publish a new article adding a space character only to the post title", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/articles`).as("newArticle");

    navigation.addNewArticle();
    publish.publishNew(
      constants.textSpaceBlank,
      constants.postDescription,
      constants.postBody,
      constants.postTags
    );
    cy.wait("@newArticle").then((interception) => {
      expect(interception.response.statusCode).to.eq(422);
    });
  });

  it.only("can't publish a new article adding a space character only to the post body", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/articles`).as("newArticle");

    navigation.addNewArticle();
    publish.publishNew(
      constants.postTitle,
      constants.postDescription,
      constants.textSpaceBlank,
      constants.postTags
    );
    cy.wait("@newArticle").then((interception) => {
      expect(interception.response.statusCode).to.eq(422);
    });
  });

  it("can't publish a new article with the same title", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/articles`).as("newArticle");

    navigation.addNewArticle();
    publish.publishNew(
      constants.textSpaceBlank,
      constants.textSpaceBlank,
      constants.textSpaceBlank,
      constants.textSpaceBlank
    );
    cy.wait("@newArticle").then((interception) => {
      expect(interception.response.statusCode).to.eq(422);
      expect(interception.response.body.errors.title).to.contain(
        "must be unique"
      );
    });
  });

  // after(() => {
  //   cy.request({
  //     url: `${Cypress.env("apiUrl")}/articles/${createdArticleSlug}`,
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Token ${Cypress.env("jwtToken")}`,
  //     },
  //   });
  // });
});
