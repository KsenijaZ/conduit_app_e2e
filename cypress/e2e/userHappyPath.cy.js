import { navigation } from "../../pageObjects/navigation";
import { register } from "../../pageObjects/registerPage";
import { loginPage } from "../../pageObjects/loginPage";
import { publish } from "../../pageObjects/publish";
import { constants } from "../fixtures/constants";
import { articlePage } from "../../pageObjects/articlePage";
import { feedPage } from "../../pageObjects/feedPage";
import { profilePage } from "../../pageObjects/profilePage";

describe("Happy path user flow tests", () => {
  const apiUrl = Cypress.env("apiUrl");
  let createdArticleSlug;
  let postDescription = constants.postDescription;

  beforeEach(() => {
    cy.loginViaUi();
  });

  it("can publish a new article with valid data", () => {
    cy.intercept("POST", `${apiUrl}/articles`).as("newArticle");

    navigation.newArticleBtn.should("be.visible");
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
    cy.intercept("PUT", `${apiUrl}/articles/*`).as("editArticle");

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

  it("can add a comment to the article", () => {
    cy.intercept(
      "POST",
      `${apiUrl}/articles/${createdArticleSlug}/comments`
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
    cy.intercept(
      "DELETE",
      `${apiUrl}/articles/${createdArticleSlug}/comments/*`
    ).as("deleteComment");

    navigation.gotoUserProfile();
    feedPage.getArticlesList.should("be.visible");
    feedPage.getArticleItem(0);
    articlePage.deleteComment();

    cy.wait("@deleteComment").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it("can delete an article", () => {
    cy.intercept("DELETE", `${apiUrl}/articles/${createdArticleSlug}`).as(
      "deleteArticle"
    );

    navigation.gotoUserProfile();
    feedPage.getArticlesList.should("be.visible");
    feedPage.getArticleItem(0);
    articlePage.deleteArticle();

    cy.wait("@deleteArticle").then((interception) => {
      expect(interception.response.statusCode).to.eq(204);
    });
  });

  it("can logout", () => {
    cy.intercept("GET", `${apiUrl}/*`).as("logoutData");

    navigation.gotoUserProfile();
    feedPage.editProfile();
    profilePage.logout();

    cy.wait("@logoutData").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      navigation.signInBtn.should("exist");
      navigation.userProfileBtn.should("not.exist");
    });
  });

  after(() => {
    cy.clearAllCookies();
  });
});
