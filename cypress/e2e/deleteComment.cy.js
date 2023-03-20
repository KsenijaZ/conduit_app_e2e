import { navigation } from "../../pageObjects/navigation";
import { publish } from "../../pageObjects/publish";
import { constants } from "../fixtures/constants";
import { articlePage } from "../../pageObjects/articlePage";
import { feedPage } from "../../pageObjects/feedPage";

describe("Publish article tests", () => {
  let createdArticleSlug;
  let comment = constants.postComment;

  before(() => {
    cy.loginViaUi();

    cy.intercept("POST", `${Cypress.env("apiUrl")}/articles/*/comments`).as(
      "addComment"
    );

    navigation.gotoUserProfile();
    feedPage.getArticlesList.should("be.visible");
    feedPage.getArticleItem(0);
    articlePage.postComment(comment);

    cy.wait("@addComment").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.comment.body).contains(comment);
    });
  });

  it("can delete a comment", () => {
    //cy.loginViaUi();
    cy.intercept("DELETE", `${Cypress.env("apiUrl")}/articles/*/comments/*`).as(
      "deleteComment"
    );

    navigation.gotoUserProfile();
    feedPage.getArticlesList.should("be.visible");
    feedPage.getArticleItem(0);
    articlePage.deleteComment();

    cy.wait("@deleteComment").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  after(() => {
    cy.clearAllCookies();
  });
});
