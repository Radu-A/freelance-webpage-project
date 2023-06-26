// A function to get the currency exchange??
// '$3,000.00' '$100-300 CAD' 'min $50 USD / hour' '$3000-5000 USD' '$1500-3000 SGD' '$250-750 USD' '₹12500-37500 INR' '$30-250 USD' '$28.00' 

let refCurrency = "USD";
let budget = "$1500-3000 SGD";

function getBudgetValues(budget){
    let currencyRegex = budget.match(/([A-Z])\w+/);
    let currency = currencyRegex[0];
    let valueRegex = budget.split("-").map(item => item.match(/([0-9])\w+/))
    let value = [valueRegex[0][0],valueRegex[1][0]];

    return {currency, value};
}

async function getCurrencyExchange(refCurrency, currency, budgetValue){
    try {
        //https://v6.exchangerate-api.com/v6/API_KEY/latest/USD
        let data = await fetch(`https://v6.exchangerate-api.com/v6/bd828084bf6be828ad9b2a12/latest/${refCurrency}`);
        let response = data.json();
        let exchangeValueFinal = [];
        return response.then(item => {
            console.log(item.conversion_rates[currency]);
            let exchangeValue = item.conversion_rates[currency];
            budgetValue.map(item => {
                console.log(item*exchangeValue)
                exchangeValueFinal.push(item*exchangeValue);
            });
            return exchangeValueFinal;
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

let {currency, value} = getBudgetValues(budget);
let currencyExchange = getCurrencyExchange(refCurrency, currency, value);

currencyExchange.then(item => {
    console.log(`original currency: ${currency}; budget = ${item[0]}-${item[1]} ${refCurrency}`);
})
