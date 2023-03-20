class FeedPage {
  get profilePage() {
    return cy.get("app-profile-page");
  }

  get articlesToggle() {
    return this.profilePage.find(".articles-toggle");
  }

  get myPostsToggle() {
    return this.articlesToggle.find("li").first;
  }

  get favPostsToggle() {
    return this.articlesToggle.find("li").last;
  }

  get getArticlesList() {
    return this.profilePage.find("app-profile-articles");
  }

  get favArticlesList() {
    return this.profilePage.find("app-profile-favorites");
  }

  get editProfileSettings() {
    return this.profilePage.find('[href="/settings"]');
  }

  getArticleItem(num) {
    return this.getArticlesList.find("app-article-preview").eq(num).click();
  }

  editProfile() {
    this.editProfileSettings.click();
  }
}

export const feedPage = new FeedPage();
