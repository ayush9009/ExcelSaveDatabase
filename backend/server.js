const app=require('./app');
const connectDB=require("./config/database");



// connecting to database
connectDB();

app.listen(8000, ()=> console.log(`Server is running on http://localhost:8000`))
