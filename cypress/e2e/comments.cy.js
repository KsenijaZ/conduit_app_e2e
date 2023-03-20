import { navigation } from "../../pageObjects/navigation";
import { publish } from "../../pageObjects/publish";
import { constants } from "../fixtures/constants";
import { articlePage } from "../../pageObjects/articlePage";
import { feedPage } from "../../pageObjects/feedPage";

describe("Comments tests", () => {
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

  it("can add a comment to the article", () => {
    cy.intercept(
      "POST",
      `${Cypress.env("apiUrl")}/articles/${createdArticleSlug}/comments`
    ).as("addComment");

    navigation.gotoUserProfile();
    feedPage.getArticlesList.should("be.visible");
    feedPage.getArticleItem(0);
    articlePage.postComment(constants.postComment);

    cy.wait("@addComment").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it("can delete a comment", () => {
    cy.loginViaUi();
    cy.intercept(
      "DELETE",
      `${Cypress.env("apiUrl")}/articles/${createdArticleSlug}/comments/*`
    ).as("deleteComment");

    navigation.gotoUserProfile();
    feedPage.getArticlesList.should("be.visible");
    feedPage.getArticleItem(0);
    articlePage.deleteComment();

    cy.wait("@deleteComment").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
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
