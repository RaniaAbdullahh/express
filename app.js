const express = require('express'); //load the express module (this will return a function)
const app= express(); //we have to  call this function 
// this app object have a bunch of useful methods,those methods corresponds to the http methods 
/*app.get();
app.post();
app.put();
app.delete();
*/
app.use(express.json())//explanation is below 
// GET method :
// this method takes two args
// 1. the path/url/endpoint 
// 2. callback function () [the function that we will call when we have GET http request ]
app.get('/', (req,res)=>{
    res.send('hello World');
});
// => so this is how we define a rout, we specify the path ('/') and the callback func or the rout handler 
// lets create another rout 
// app.get('/api/courses',(req,res)=>{
//     res.send([1,2,3])
// });

// now we need to listen to a given port, takes a port number, and optionally we can pass a function will be called when the app start listening to the giving port
//app.listen(3000, ()=>console.log('Listening on port 3000...'));

// in order to get a single course you have to provide the id of that course in the endpoint  <<api/courses/id>>
// app.get('/api/courses/:id',(req,res)=>{
//     res.send(req.params.id);

// });
// its possible to have multiple params in a rout 
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);// i am sending the whole params object 
    //res.send(req.params.month);// to send just the month
});
//query string parameters optional parameters you can add them to the rout, we use them to additional data for backend services, so we use rout params dor essential or required values
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);// i am sending the query object => ?sorting=name
   
});

const courses = [
    {id :1, name : 'course1'},
    {id :2, name : 'course2'},
    {id :3, name : 'course3'},
];

app.get('/api/courses',(req,res)=>{
    res.send(courses)
});

app.get('/api/courses/:id',(req,res)=>{
  const course = courses.find(c=>c.id === parseInt(req.params.id));/// we use parseInt because the req.params.id returns a string and we need a number 
  console.log(!course);
  if(!course) return res.status(404).send('The course with givin ID was not found.');
  res.send(course);

});
///POST requests => we will use it to create a new course 
app.post('/api/courses',(req,res)=>{//were gonna post in the courses collection 
    // we have to do input validation (as server i should never trust client inputs :p)
    if (!req.body.name || req.body.name.length <3){
        //400 bad request 
        return res.status(400).send('Name is required and should be minimum 3 char');
    }
    
    const course = {
        id: courses.length +1, // we have to create the id manually 
        name :req.body.name ,// we need to read the value from the request body, so we are assuming that the body of the req has obj and this obj has a property called "name", to make this work we need to enable parsing of json object in the body of the req, because by default this feature is not enabled in express => so in the top of the page we will add app.use(express.json()) so basically what we do (express.json()) is wa are adding piece of middleware, and when we call (app.use) this means we will use it in the request process 
    };
    courses.push(course);
    // when we post an object to the server, when the server creates new object or new resource we should return that object in the body of the response 
    res.send(course);// the reason of that because we assigning the id of the course to the server so we need to return this object to the client and client needs to know the id of that new object 
});
////PUT method 
app.put('/api/courses/:id',(req,res)=>{
    //first we need to look up the course => 
    //if not exist return 404-Not found
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with givin ID was not found.');

    //else validate the course (make sure its in a good shape )
    // if it's invalid return 400-Bad request
    if (!req.body.name || req.body.name.length <3){
       return res.status(400).send('Name is required and should be minimum 3 char');
       
    }
    // Update the course 
    course.name =req.body.name;
    // return the updated course 
    res.send(course);

});
/// DELETE method 
app.delete('/api/courses/:id',(req,res)=>{// we will work on  specific course 
    // look up the course 
    // Not exist, return 404-Not found 
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with givin ID was not found.');
    //Delete 
    //1. I have to find the index of the wanted course in the courses array 
    const index = courses.indexOf(course);
    //2. delete the course element from the array using "splice method"
    courses.splice(index,1);// 1 refers to delete one object.
    // Return th same course(the response to the client ) 
    res.send(course);

});




// all testing running on Postman 
// install nodemon => sudo npm i -g nodemon
// environment variables 
// we dont need to use a hardcoded port number, because when you deploy this application to a hosting environment, the port is dynamically assigned by the hosting environment, so we cant relay to the port 3000 to be available, so the way to fix this by using an environment variable <<PORT>>
// we need the global object called "process", this obj has a property called "env"t, then we need to call the environment var name "PORT"
const port = process.env.PORT || 3000;
// now we need to change it in the process of listening to the port dynamically 
app.listen(port, ()=>console.log(`Listening on port ${port}...`));
//setting the env var in terminal : export PORT=5000 