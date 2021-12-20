import Http from '../infrastructures/http';

class FoodRepository{

  static async  getListFood (){
       const opts={
           method: 'GET',
           url:'https://yummly2.p.rapidapi.com/feeds/list',
           params: {start: '0', limit: '18', tag: 'list.recipe.popular'}
       }
        const foods = await Http.request(opts);
        return foods;
    }

 static async  getListFoodTrending (){
        const opts={
            method: 'GET',
            url:'https://yummly2.p.rapidapi.com/feeds/list',
            params: {start: '0', limit: '18', tag: 'list.recipe.trending'}
        }
         const foods = await Http.request(opts);
         return foods;
     }

    static async searchFood(q){
        var options = {
            method: 'GET',
            url: 'https://yummly2.p.rapidapi.com/feeds/search',
            params: {
              maxResult: '18',
              start: '0',
              FAT_KCALMax: '1000',
           //   allowedAttribute: 'diet-lacto-vegetarian,diet-low-fodmap',
              q: q,
              maxTotalTimeInSeconds: '7200'
            }
        }
        const food = await Http.request(options);
        return food
    }
}
export default FoodRepository;