import { navigation } from "../../pageObjects/navigation";
import { publish } from "../../pageObjects/publish";
import { constants } from "../fixtures/constants";
import { articlePage } from "../../pageObjects/articlePage";
import { feedPage } from "../../pageObjects/feedPage";

describe("Publish article tests", () => {
  let createdArticleSlug;

  before(() => {
    cy.loginViaUi();
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

  it("can delete an article", () => {
    cy.intercept(
      "DELETE",
      `${Cypress.env("apiUrl")}/articles/${createdArticleSlug}`
    ).as("deleteArticle");

    navigation.gotoUserProfile();
    feedPage.getArticlesList.should("be.visible");
    feedPage.getArticleItem(0).click();
    articlePage.deleteArticle();

    cy.wait("@deleteArticle").then((interception) => {
      expect(interception.response.statusCode).to.eq(204);
    });
  });

  afterEach(() => {
    cy.clearAllCookies();
  });
});
