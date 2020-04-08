function checkCashRegister(price, cash, cid) {
    var totalCid = cid.reduce((a, b) => a + b[1], 0);
    const unitsName = ["ONE HUNDRED","TWENTY","TEN","FIVE","ONE","QUARTER","DIME","NICKEL","PENNY"];
    const unitsValue = [100,20,10,5,1,.25,.10,.05,.01];
    var change = cash-price;
    console.log(change);
    console.log(totalCid);
    if(change>totalCid){
      return{status: "INSUFFICIENT_FUNDS", change: []};
    } else if(change==totalCid){
      return{status: "CLOSED", change: cid};
    } else{
      let [changeGiven,ch] = getExactChange(change, cid);
      console.log(changeGiven);
    console.log(ch);
      if(ch){
        return{status: "INSUFFICIENT_FUNDS", change: []};
      } else{
        return{status: "OPEN", change: changeGiven};
      }
  function getExactChange (changeDue,arr) {
        var quantity, amount; 
        var changeToGive = []; 
        var arr1 = arr.reverse(); 
        for (let i = 0; i < unitsValue.length && changeDue>0; i++) { 
          var max = (arr1[i][1]) / unitsValue[i]; 
          quantity = Math.floor(changeDue / unitsValue[i]);
          if (quantity > 0) {
            if (quantity > max) { quantity = max;}
            amount = (quantity * unitsValue[i]);
            console.log(amount);
            changeToGive.push([unitsName[i],amount]);
            changeDue = changeDue - amount;
            changeDue = Math.round(changeDue * 100) / 100;
          }
                    
        }
        return [changeToGive,changeDue];
      }
  
    }
    return change;
  }
  
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));