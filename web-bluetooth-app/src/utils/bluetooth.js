import { ApplicationException } from "./exceptions";

const REQUEST_OPTION_NAME = {
    ALL : "ALL"
}

class RequestOption {
   constructor(name){
       this.name = name;
   }
   getName(){
       return this.name;
   }
}

class BluetoothDevice {
    constructor(){
        this.properties = new Map();  
        this.mainCategory = new Set();  
        this.mainCategorySize = 0;
    }

    put(category, key, value){
        this.properties.set(category + '#' + key, value);
        this.mainCategory.add(category);
        this.mainCategorySize = this.mainCategory.size;
    }

    get(category, key){
        return this.properties.get(category + '#' + key);
    }

    getProperties(){
        return this.properties;
    }

    getMainCategoryList(){
        return this.mainCategory;
    }
    
    getMainCategorySize(){
        return this.mainCategorySize;
    }
}

class BluetoothAPI {
    getBluetoothAvailability(){
        return navigator.bluetooth.getAvailability();
    }

    requestDevice(option){
        const name = option.getName();
        const options = {};
        if(name === REQUEST_OPTION_NAME.ALL){
            options['acceptAllDevices'] = true;
            options['optionalServices'] = ["battery_service"]
        }
       return  navigator.bluetooth.requestDevice(options).then(
            bluetoothDevice => {
                return Promise.resolve(bluetoothDevice);
            }
        ).catch(exception =>{
            throw new ApplicationException(exception.code, exception.message);
        });
    }
}

export { RequestOption, BluetoothAPI, BluetoothDevice };
export { REQUEST_OPTION_NAME };