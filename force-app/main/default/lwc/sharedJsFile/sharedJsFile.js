import { LightningElement, api } from 'lwc';

export default class SharedJsFile extends LightningElement {
    
    shouldResolve = true;
    prom  = new Promise((resolve, reject)=>{
          if(this.shouldResolve){
            resolve("Success!");
          }
          reject("Failed!");
    });

    @api
    fetchData1(){
        return this.prom;            
    }

    

    @api
    async fetchData3(){
        let prom1  = new Promise((resolve, reject)=>{           
            reject("Failed!");
      }); 
      return prom1;        
    }
}