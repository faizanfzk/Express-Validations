const app=require("./index")
const connect=require("./configs/db")



app.listen(5000,async(req,res)=>{
    try {
        await connect();
        
    } catch (error) {
        console.log(error.message)
    }
    console.log("Listening on port 5000")
});