const express = require('express'); //load the express module (this will return a function)
const app= express(); //we have to  call this function 
// this app object have a bunch of useful methods,those methods corresponds to the http methods 
/*app.get();
app.post();
app.put();
app.delete();
*/
// GET method :
// this method takes two args
// 1. the path/url/endpoint 
// 2. callback function () [the function that we will call when we have GET http request ]
app.get('/', (req,res)=>{
    res.send('hello World');
});
// => so this is how we define a rout, we specify the path ('/') and the callback func or the rout handler 
// now we need to listen to a given port, takes a port number, and optionally we can pass a function will be called when the app start listening to the giving port


app.listen(3000, ()=>console.log('Listening on port 3000...'));