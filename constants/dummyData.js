import images from "./images"
import icons from "./icons"

const hintSearch =[
    [{
        id:1,
        name:'chicken'
    },
    {
        id:2,
        name:'meat'
    }],
    [{
        id:3,
        name:'vegan'
    },
    {
        id:4,
        name:'Beef'
    }],
    [{
        id:5,
        name:'Quick and Easy'
    },
    {
        id:6,
        name:'Spaghetti'
    }],
    [{
        id:7,
        name:'Italian'
    },
    {
        id:8,
        name:'Korean'
    }],
    [{
        id:9,
        name:'Healthy'
    },
    {
        id:10,
        name:'Indian'
    }],
    [{
        id:11,
        name:'Tofu'
    },
    {
        id:12,
        name:'Salads'
    }]
]
const categoriesSearch =[
    {
        id:1,
        name:'Breakfast',
        img:images.breakfast
    },
    {
        id:2,
        name:'Lunch',
        img:images.lunch
    },
    {
        id:3,
        name:'Dinner',
        img:images.dinner
    },
    {
        id:4,
        name:'Brunch',
        img:images.brunch
    },
    {
        id:5,
        name:'Dessert',
        img:images.dessert
    },
    {
        id:6,
        name:'Appetizer',
        img:images.appetizer
    }
]
const categories = [
    {
        id:1,
        name:'Meat',
        image:images.meat,
        type:'allergy'
    },
    {
        id:2,
        name:'Floral',
        image:images.floral,
        type:'diet | vegan'
    },
    {
        id:3,
        name:'Produre',
        image:images.produre,
        type:'diet | vegan'

    },
    {
        id:4,
        name:'Deli',
        image:images.deli,
        type:'diet'
    },
    {
        id:5,
        name:'Baking & Cooking',
        image:images.baking,
        type:'diet'
    },
    {
        id:6,
        name:'Coffee & tea',
        image:images.coffee,
        type:'drink'
    },
    {
        id:7,
        name:'Frozen Foods',
        image:images.fozen_food,
        type:'diet | vegan'
    },
    {
        id:8,
        name:'Deli',
        image:images.deli,
          type:'allergy'
    },
    {
        id:9,
        name:'Pet Foods & Necessities',
        image:images.necessities,
        type:'frozen food'

    },
    {
        id:10,
        name:'Baby Foods & Necessities',
        image:images.babyFood,
        type:'diet | vegan'

    },
    {
        id:11,
        name:'Bakery',
        image:images.bakery,
        type:'cake'

    },
    {
        id:12,
        name:'Breakfast Foods',
        image:images.breakfast,
        type:'cake'

    },
    {
        id:13,
        name:'Dairy',
        image:images.dairy,
        type:'cheese'
    },
    {
        id:14,
        name:'Drinks',
        image:images.drink,
        type:'drink'
    },
    {
        id:15,
        name:'Frozen Desserts',
        image:images.Frozen_Desserts,
        type:'frozen food | vegan'
    },
    {
        id:16,
        name:'Fruit',
        image:images.Fruit,
        type:'frozen food | diet'
    },
    {
        id:17,
        name:'Packaged Meals & Side Dishes',
        image:images.Packaged_Meals,
        type:'fast food'
    },
    {
        id:18,
        name:'Other',
        image:images.other,
        type:'vegan'
    },
    {
        id:19,
        name:'Pasta & Grains',
        image:images.pasta,
        type:'allergy'
    },
    {
        id:20,
        name:'Seafood',
        image:images.seaFood,
        type:'allergy'
    },
    {
        id:21,
        name:'Snack Foods',
        image:images.snackFood,
        type:'vegan'
    },
    {
        id:22,
        name:'Canned Goods & Soups',
        image:images.soup,
        type:'hot food | allergy'
    },
    {
        id:23,
        name:'Soy Products',
        image:images.soy_product,
        type:'vegan | diet'
    },
    {
        id:24,
        name:'Vegetables',
        image:images.vegetable,
        type:'vegan | diet'
    },
    {
        id:25,
        name:'Global Foods',
        image:images.globalFood,
        type:'diet'
    }

]

export default {
    categories,
    hintSearch,
    categoriesSearch
}