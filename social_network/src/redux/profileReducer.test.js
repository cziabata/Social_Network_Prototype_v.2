import { addPost, deletePost } from "./profileReducer";
import profileReducer from "./profileReducer"

let state = {
    posts: [
      { id: 1, userName: "USER 1", postMessage: "Post Message 111" },
      { id: 2, userName: "USER 2", postMessage: "Post Message 222" },
      { id: 3, userName: "USER 3", postMessage: "Post Message 333" },
    ],
  };

test("legth of posts should be incremented", () => {
    //1. test data
    let action = addPost("New Post");
    //2. action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(4)
});
test("new post should be correct", () => {
    //1. test data
    let action = addPost("New Post");
    //2. action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts[3].postMessage).toBe("New Post")
});
test("legth of posts should be decremented", () => {
    //1. test data
    let action = deletePost(1);
    //2. action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(2)
});