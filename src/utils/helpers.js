 export const paginate = (items, currentPage, perPage) => {
   let from = currentPage * perPage - perPage;
   let to = currentPage * perPage;
   return items.slice(from, to);
 };

 export const filterPosts = (arr, str) => {
   let strLowCase = str.toLowerCase();
 
   let stringArray = arr.map((item) => (item = Object.values(item).join(",")));
 
   let results = stringArray.filter((post) =>
     post.toLowerCase().includes(strLowCase)
   );
   return results.map((element) => element.split(","));
 };

 export const makeButtonsArray = (ButtonCount) => {
  let arr = [];
  for (let i = 1; i <= ButtonCount; i++) {
    arr.push(i);
  }
  return arr;
};
