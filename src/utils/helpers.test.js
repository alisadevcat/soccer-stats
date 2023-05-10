import { paginate } from "./helpers";
import { filterPosts } from "./helpers";
let posts;
beforeEach(() => {
  posts = [
    { id: 2006, name: "WC Qualification CAF", area: "Africa" },
    { id: 2166, name: "AFC Champions League", area: "Africa" },
    { id: 2023, name: "Primera B Nacional", area: "Argentina" },
  ];
});

it("Check if items are paginated", () => {
  const currentPage = 1;
  const perPage = 2;
  let result = paginate(posts, currentPage, perPage);
  expect(result).toEqual([
    { id: 2006, name: "WC Qualification CAF", area: "Africa" },
    { id: 2166, name: "AFC Champions League", area: "Africa" },
  ]);
});

describe("Filterposts", () => {
  it("Test if the correct string passes the test", () => {
    const searchString1 = "Af";
    const result = filterPosts(posts, searchString1);
    expect(result).toEqual([
      ["2006", "WC Qualification CAF", "Africa"],
      ["2166", "AFC Champions League", "Africa"],
    ]);
  });

  it("Test if the Uppercase string passes the test", () => {
    const searchString2 = "AF";
    const result = filterPosts(posts, searchString2);
    expect(result).toEqual([
      ["2006", "WC Qualification CAF", "Africa"],
      ["2166", "AFC Champions League", "Africa"],
    ]);
  });

  it("Test if the incorrect string fails the test", () => {
    const searchString3 = "qfwevgsd";
    const result = filterPosts(posts, searchString3);
    expect(result).toEqual([]);
  });
});
