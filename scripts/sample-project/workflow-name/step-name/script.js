exports.step = function(input, fileInput) {
    let otherSystemData = input.data;
    let currencies = input.currencies;
    let currencyId = -99;

    // find currency, or use default
    let otherSystemCurrency = _.lowerCase(_.get(otherSystemData, 'currency', '')); 
    if (currencies && currencies.records && currencies.records.length > 0) {
        currencies.records.some((currency) => {
            // added some logging to demonstrate
            console.log(currency);
            if (currency.iso4217 && _.lowerCase(currency.iso4217) === otherSystemCurrency) {
                currencyId = currency.id;
                return true;
            }
        });
    }

    return {
      'currencyId': currencyId
    }
};
