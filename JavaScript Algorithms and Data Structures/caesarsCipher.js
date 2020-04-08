function rot13(str) {
    let a = str.split("");
    a = a.map(function(x){
      if(x.charCodeAt(0)>64 && x.charCodeAt(0)<91){
        return String.fromCharCode(x.charCodeAt(0)%26+65);
      } else {
        return x;
      }
      
    })
    //console.log();
    return a.join("");
  }
  
  rot13("SERR PBQR PNZC");