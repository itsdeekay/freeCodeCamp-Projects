function palindrome(str) {
    let s = str;
    s = s.match(/(\w)/g).join("").replace("_",'').toLowerCase();
    console.log(s);
    return s==ReverseString(s);
  }
  // Function to reverse string 
  function ReverseString(str) { 
     return str.split('').reverse().join('') 
  } 
  
  
  palindrome("A man, a plan, a canal. Panama");