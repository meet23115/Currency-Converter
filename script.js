const currencyEl_from = document.getElementById('currency-from');
const currencyEl_to = document.getElementById('currency-to');
const amountEl_from = document.getElementById('amount-from');
const amountEl_to = document.getElementById('amount-to');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch currency rates and update the DOM
function calculate(){
    const currency_from = currencyEl_from.value;
    const currency_to = currencyEl_to.value;

    fetch(`https://v6.exchangerate-api.com/v6/91685360df8480fa5b3589d6/latest/${currency_from}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            const rate = data.conversion_rates[currency_to];
            rateEl.innerText = `1 ${currency_from} = ${rate} ${currency_to}`;

            amountEl_to.value = (amountEl_from.value * rate).toFixed(2);
        });
}

currencyEl_from.addEventListener('change', calculate);
currencyEl_to.addEventListener('change', calculate);
amountEl_from.addEventListener('input', calculate);
amountEl_to.addEventListener('input', calculate);

swap.addEventListener('click', () =>{
    const temp = currencyEl_from.value;
    currencyEl_from.value = currencyEl_to.value;
    currencyEl_to.value = temp;
    calculate();
})

calculate();
