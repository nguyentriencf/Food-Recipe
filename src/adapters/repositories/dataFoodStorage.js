import FoodRepository from "./FoodRepository";
import localStorage from "../infrastructures/localStorage";
class DataFoodStorage{

   static breakfast(){
        FoodRepository.searchFood('hamburger').then((data)=>{
           const storage = new localStorage();
            storage.set('breakfast',data);
        })
    }

    static lunch(){
        FoodRepository.searchFood('soup').then((data)=>{
           const storage = new localStorage();
            storage.set('lunch',data);
        })
    }

    static dinner(){
        FoodRepository.searchFood('beef').then((data)=>{
           const storage = new localStorage();
            storage.set('dinner',data);
        })
    }
    static brunch(){
        FoodRepository.searchFood('bread').then((data)=>{
           const storage = new localStorage();
            storage.set('brunch',data);
        })
    }

    static dessert(){
        FoodRepository.searchFood('ice cream').then((data)=>{
           const storage = new localStorage();
            storage.set('dessert',data);
        })
    }

    static appetizer(){
        FoodRepository.searchFood('appetizer').then((data)=>{
           const storage = new localStorage();
            storage.set('appetizer',data);
        })
    }
    
}

export default DataFoodStorage