import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"; // Don't worry



interface IMeassurement { //Erstat med hvad der er relevant, og ændrer properties
    // attributes from http://jsonplaceholder.typicode.com/posts
    id : number;
    pressure : number;
    humdity : number;
    temperature : string;
    timeStamp : Date;
}



//GetAll
let getAllButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
getAllButton.addEventListener("click", getAllMeasurements)

let resetButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("resetButton");
resetButton.addEventListener("click", resetGetAll)

let getAllOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("getAll");

let url : string = "http://cars-rest.azurewebsites.net/api/Meassurement";


//GetOne
let inputGetone : HTMLInputElement = <HTMLInputElement>document.getElementById("getoneInput");
let getoneButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getoneButton");
getoneButton.addEventListener("click" , getOneMeassurement);
let getoneOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("getOne");


//Post
let postButton : HTMLButtonElement = <HTMLInputElement>document.getElementById("addButton");
postButton.addEventListener("click", addMeassurement)


//Delete
let deleteButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteMeassurement)


function getAllMeasurements(): void{
   axios.get<IMeassurement[]>(url)
   .then((response: AxiosResponse<IMeassurement[]>) => {
       let data: IMeassurement[] = response.data;
       let longHtml: string = "<ol>";
       getAllOutput.innerHTML = JSON.stringify(data);
       
       data.forEach( (measure : IMeassurement) => {
           console.log(measure.id, measure.pressure, measure.humdity, measure.temperature, measure.timeStamp)
           longHtml += "<li>" + "Id: "+ measure.id + " - " +  "Pressure: "+ measure.pressure + " - " + "Humidity: " + measure.humdity + " - " + "Temperature: " + measure.temperature + " TimeStamp: " + measure.timeStamp
           "</li>"; 
       });
       longHtml += "</ol>";
       getAllOutput.innerHTML = longHtml;
   })
   .catch((error: AxiosError) => {
       console.log(error);
       getAllOutput.innerHTML = error.message;
   });
}

function resetGetAll(): void{

   getAllOutput.innerHTML = " ";
}


function getOneMeassurement() : void {
   let id = inputGetone.value;
  
      if (id.length > 0)
      {
          axios.get<IMeassurement>(url + "/" + id)
              .then((response: AxiosResponse<IMeassurement>) =>{
              let measure : IMeassurement = response.data;
              let longHtml2: string = "<ol>";
  
              console.log(measure);
  
              getoneOutput.innerHTML = JSON.stringify(measure);
  
          
              console.log(measure.id, measure.pressure, measure.humdity, measure.temperature, measure.timeStamp);
              
              longHtml2 += "<li>" + "Id: "+ measure.id + " - " +  "Pressure: "+ measure.pressure + " - " + "Humidity: " + measure.humdity + " - " + "Temperature: " + measure.temperature + " TimeStamp: " + measure.timeStamp
              "</li>"; 
              
         
              longHtml2 += "</ol>";
              getoneOutput.innerHTML = longHtml2; 
          });
      }      
      getoneOutput.innerHTML = "Type something dude";
      
  }


function addMeassurement(): void{

   let PressureinputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addPressure");
   let HumidinputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addHumidity");
   let TempinputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addTemp");
   let addoutputElement : HTMLDivElement = <HTMLDivElement>document.getElementById("postOutput");


   let myPressure = Number(PressureinputElement.value);
   let myHumidity = Number(HumidinputElement.value);
   let myTemperature = Number(TempinputElement.value);


   axios.post<IMeassurement[]>(url, {pressure : myPressure, humdity: myHumidity, temperature: myTemperature})
       .then((response : AxiosResponse<IMeassurement[]>) => {
           let message =  "<h6 id='responseMessage'>" + response.status + " " + response.statusText + "</h6>"; 
           
       addoutputElement.innerHTML = message;
       console.log(message);
   })

   .catch(function (error) {
   addoutputElement.innerHTML = error.message;
   console.log(error);

   });

}


function deleteMeassurement(): void{

   let inputId : HTMLInputElement = <HTMLInputElement>document.getElementById("deleteID");
   
   let id : string = inputId.value;
   
   let output : HTMLDivElement = <HTMLDivElement>document.getElementById("deletedMeasurementOutput");
   
   
   let urlDelete = url + "/" + id;
   if(id.length > 0)
   {
       axios.delete<IMeassurement>(urlDelete)
       .then(function (response: AxiosResponse<IMeassurement>): void {
           
           console.log(JSON.stringify(response));
           output.innerHTML = response.status + " " + response.statusText;
       })
       .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
       if (error.response) {
               
           output.innerHTML = error.message;
       } else { // something went wrong in the .then block?
           output.innerHTML = error.message;
       }
       });
   
   }
   output.innerHTML = "The field needs an ID";
}




