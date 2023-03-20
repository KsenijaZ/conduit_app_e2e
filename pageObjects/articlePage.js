class ArticlePage {
  get articlePage() {
    return cy.get("app-article-page");
  }

  get articleMeta() {
    return this.articlePage.find(".article-meta");
  }

  get editMetaBtn() {
    return this.articleMeta.find(".btn-outline-secondary");
  }

  get deleteMetaBtn() {
    return this.articleMeta.find(".btn-outline-danger");
  }

  get articleActions() {
    return this.articlePage.find(".article-actions");
  }

  get editActionsBtn() {
    return this.articleActions.find("a.btn-outline-secondary");
  }

  get deleteActionsBtn() {
    return this.articleActions.find(".btn-outline-danger");
  }

  get commentsForm() {
    return cy.get(".comment-form");
  }

  get commentInput() {
    return this.commentsForm.find("textarea");
  }

  get postCommentBtn() {
    return this.commentsForm.find('[type="submit"]');
  }

  get publishedComment() {
    return cy.get("app-article-comment");
  }

  get deleteCommentBtn() {
    return this.publishedComment.find(".mod-options");
  }

  startEditArticle() {
    this.editActionsBtn.click();
  }

  deleteArticle() {
    this.deleteActionsBtn.click();
  }

  postComment(comment) {
    this.commentInput.type(comment);
    this.postCommentBtn.click();
  }

  deleteComment() {
    this.deleteCommentBtn.click();
  }
}

export const articlePage = new ArticlePage();
