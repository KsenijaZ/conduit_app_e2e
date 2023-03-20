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

    cy.intercept("POST", `${Cypress.env("apiUrl")}/articles`).as(
      "createArticle"
    );

    navigation.addNewArticle();
    publish.publishNew(
      constants.postTitle,
      constants.postDescription,
      constants.postBody,
      constants.postTags
    );
    cy.wait("@createArticle").then((interception) => {
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
    articlePage.postComment(comment);

    cy.wait("@addComment").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.comment.body).contains(comment);
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
