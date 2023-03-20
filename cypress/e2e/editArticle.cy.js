import { navigation } from "../../pageObjects/navigation";
import { publish } from "../../pageObjects/publish";
import { constants } from "../fixtures/constants";
import { articlePage } from "../../pageObjects/articlePage";
import { feedPage } from "../../pageObjects/feedPage";

describe("Edit article tests", () => {
  let createdArticleSlug;
  let postDescription = constants.postDescription;
  beforeEach(() => {
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

  it("can edit an article with new description", () => {
    cy.intercept("PUT", `${Cypress.env("apiUrl")}/articles/*`).as(
      "editArticle"
    );

    navigation.gotoUserProfile();
    feedPage.getArticlesList.should("be.visible");
    feedPage.getArticleItem(0);
    articlePage.startEditArticle();
    publish.editArticleDescription(postDescription);
    publish.submitArticle();

    cy.wait("@editArticle").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.article.description).to.eq(
        postDescription
      );
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
