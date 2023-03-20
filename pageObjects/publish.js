class Publish {
  get publishPage() {
    return cy.get("app-editor-page");
  }

  get titleInput() {
    return this.publishPage.find('[formcontrolname="title"]');
  }

  get descriptionInput() {
    return this.publishPage.find('[formcontrolname="description"]');
  }

  get bodyInput() {
    return this.publishPage.find('[formcontrolname="body"]');
  }

  get tagsInput() {
    return this.publishPage.find("input").last();
  }

  get submitBtn() {
    return this.publishPage.find('button[type="button"]');
  }

  submitArticle() {
    this.submitBtn.click();
  }

  publishNew(title, description, body, tags) {
    this.titleInput.type(title);
    this.descriptionInput.type(description);
    this.bodyInput.type(body);
    this.tagsInput.type(tags);
    this.submitBtn.click();
  }

  editArticleDescription(description) {
    this.descriptionInput.clear();
    this.descriptionInput.type(description);
  }
}

export const publish = new Publish();
