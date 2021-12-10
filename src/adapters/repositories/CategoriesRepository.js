import Http from "../infrastructures/http";

class CategoriesRepository{
      
   static async getCategories(){
        const options = {
            method: 'GET',
            url: 'https://yummly2.p.rapidapi.com/tags/list'
          };
        const categories =  await Http.request(options);
        return categories;
    }
}
export default CategoriesRepository