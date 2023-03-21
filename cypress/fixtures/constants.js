import { faker } from "@faker-js/faker";

class Constants {
  //auth
  user01_Name = "User_Name001";
  user01_Password = "pass123";
  user01_Email = "user001@gmail.com";
  user02Name = "User_Name002";
  user02Password = "pass456";
  user02Email = "user002@gmail.com";
  randomUserName = faker.name.fullName();
  randomUserEmail = faker.internet.email();
  randomUserPassword = faker.internet.password(8);
  wrongFormatEmail = "myusergmail.com";
  //publish
  postTitle = faker.lorem.sentence(2);
  postDescription = faker.lorem.sentence(5);
  postBody = faker.lorem.paragraphs(1);
  postTags = faker.lorem.words(2);
  postComment = faker.lorem.sentences(2);
  textSpaceBlank = " ";
}

export const constants = new Constants();
