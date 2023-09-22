const express=require ('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');
const database = require('mysql');

const {application,request,response}=require('express');
const add = express();
add.use(cors());
add.use(fileupload());
add.use(bodyparser.json());

add.use(express.json());
add.use(express.static('public'));

let a= database.createConnection(
    {
    host:"localhost",
    user:"root",
    password:"Root",
    database:"adhoc"
    
    }
    
    )
    a.connect(function(error){
    
        if(error){
            console.log(error);
    
        }
        else{
            console.log("DB connected!");
        }
    })
    

    add.post('/addDetails',(request,response)=>{
        console.log(JSON.stringify(request.body));      
        let {itemName,itemType,itemDescription}=request.body;       
        let sql='insert into item_details()'
        a.query(sql,[itemName,itemType,itemDescription],(error,result)=>{
            if(error){
                let s={"status":"error"};
                console.log(error);
                response.send(s);
               
    
            }
            else{
                let s={"status":"success"};
                response.send(s);
            }
        })
    })
    

    


add.get('/getDetails',(request,response)=>{
    a.query('',
    (error,result)=>{
        if(error){

            console.log(error);
        }
        else{
            console.log(result);
            response.send(result);
        }


    })
})


add.delete('/deleteDetails',(request,response)=>{
    let idtobedeleted = request.params.idtobedeleted;
    if(idtobedeleted)
    a.query('',
    (error,result)=>{
        if(error){
            console.log((error)  )

        }else{
            console.log("deleted successfully")
        }
    })
})

add.put('/updateStatus',(request,response)=>{
})
    

    

add.listen(4000,()=>                    
{
    console.log("server running in 4000 port");
}
)