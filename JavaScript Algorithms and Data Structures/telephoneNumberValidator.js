function telephoneCheck(str) {
    let reg = /^(1\s?)?([(]\d{3}[)]|\d{3})[\s-]*\d{3}[\s-]?\d{4}$/;
    console.log(str.match(reg));
    console.log(reg.test(str))
    return reg.test(str);
  }
  
  telephoneCheck("27576227382");