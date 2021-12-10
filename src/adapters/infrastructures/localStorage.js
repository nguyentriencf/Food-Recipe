import AsyncStorage from '@react-native-async-storage/async-storage'

class localStorage{

   async set(key,data){
      let item = [key,JSON.stringify(data)];
        await AsyncStorage.multiSet([item]);  
    }
    get(key){
      const items=  AsyncStorage.multiGet([key])
      return items;
    }
    remome(key){
        AsyncStorage.removeItem(key);
    }
}

export default localStorage