const Cart = require('../models/Cart');
const {formateadordemiles} = require('../helpers/formato');
class CartController{
    static CartPost = async(req,res)=>{
        const data=req.body;
        const cart={
            items:[data],
            total:data.precio,
            totalformateado:data.precioformateado,
            cantidad:data.cantidad,
        };
      
        let cartModel = new Cart(cart);
        const d=await cartModel.save();
        
        res.status(201).json(d);
    }
    static CartChangeQualityPut = async(req,res)=>{
        const {token,id,cantidad} = req.body;
        let ct=parseInt(cantidad)
        
        const cart= await Cart.findById(token);
     
        if(cart){
            let items=cart.items;
            let total=0;
            let quality=0;
            if(items.findIndex(item => item.id === id) > -1){
                const i=items.findIndex(item => item.id === id);
                items[i].precio=parseInt(items[i].preciounitario)*ct;
                items[i].precioformateado=formateadordemiles(items[i].precio);
                items[i].cantidad=ct;
            }

            items.forEach(element=>{
                total+=element.precio;
                quality+=element.cantidad;
            })

            const totalformateado=formateadordemiles(total);
            const cantidad=quality;
            const updatedCart= await Cart.findByIdAndUpdate(token,{items,total,totalformateado,cantidad});
            res.json({"res":true,"data":updatedCart});
        }
       
    }
    static CartPut = async(req,res)=>{
        const {id,data}=req.body;

        const cart= await Cart.findById(id);
         
            if(cart){
                let item=cart.items;
                let items;
                let total=0;
                let quality=0;
                if(item.findIndex(item => item.id === data.id) > -1){
                    const i=item.findIndex(item => item.id === data.id);
                    item[i].precio+=data.precio;
                    item[i].precioformateado=formateadordemiles(item[i].precio);
                    item[i].cantidad+=data.cantidad;
                }else{
                    item.push(data);
                }
      
                items=item;
                
                item.forEach(element=>{
                    total+=element.precio;
                    quality+=element.cantidad;
                })
               
                const totalformateado=formateadordemiles(total);
                const cantidad=quality;
                const updatedCart= await Cart.findByIdAndUpdate(id,{items,total,totalformateado,cantidad});

                res.json({"res":data,"data":updatedCart});
            }

    }
    static CartDeleteItem = async(req,res)=>{
        const id= req.body.id;
        const token = req.body.token;
        const cart= await Cart.findById(token);
        let total=0;
        let quality=0;
        if(cart){
            let items=cart.items;
            if(items.findIndex(item => item.id === id) > -1){
                const i=items.findIndex(item => item.id === id);
                items.splice(i,1);
            }
            items.forEach(element=>{
                total+=element.precio;
                quality+=element.cantidad;
            })
         
            const totalformateado=formateadordemiles(total);
            const cantidad=quality;
            const updatedCart= await Cart.findByIdAndUpdate(token,{items,total,totalformateado,cantidad});
        }
        res.status(200).json({"res":true});
    }

    static CartGet = async(req,res)=>{
        const id=req.params.id;
        //console.log(id);
        const cart= await Cart.findById(id);
        //console.log(cart);
        if(cart){
            res.json(cart);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }    
    }

    static CartDeleteAllItems= async(req,res)=>{
        const id=req.params.id;
      
        const deleteCart =await Cart.deleteOne({_id:id});
 
        if(deleteCart){
            res.json({"res":true});
        }else{
            res.json({"res":false});
        }
        
    }
}
module.exports = CartController;