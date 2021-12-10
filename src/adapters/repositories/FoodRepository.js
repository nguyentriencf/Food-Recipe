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
}
export default FoodRepository;