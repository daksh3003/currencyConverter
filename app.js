const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".message");

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);
    if(amtVal===""|| amtVal<1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amtVal*rate;
    message.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}

for(let select of dropDown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        
        if(select.name ==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name ==="to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(event)=>{
        updateFlag(event.target)
    });
}
const updateFlag = (element)=>{ 
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",(event)=>{
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
})
