const Cursos=require('../models/Cursos');
const Rating=require('../models/Rating');
const Eventos = require('../models/Eventos');
var moment = require('moment');
moment.locale('es'); 

class CapacitacionController{
    static cursosDetail = async(req,res)=>{
        const id=req.params.id;
        const curso= await Cursos.findById(id);

        if(curso){
            const area=curso.area;
            const cursosrel=await Cursos.find({area:area},{_id:1,tituloCorto:1,portada:1,area:1});
            await Cursos.findByIdAndUpdate(id,{ $inc: {visita:1}});
            const cursos={
                detalles:curso,
                cursosrelacionados:cursosrel,
            }
            res.status(200).json(cursos);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }    
      
    }


    static groupCursos = async(req,res)=>{

        const groupCurso=await Cursos.aggregate([
            { $group : { _id : "$tipo", names: { $push: "$tituloLargo" } } }
        ])

        res.json(groupCurso);
    }
  
    static cursos = async(req,res)=>{
    
        const cursos=await Cursos.aggregate([
            {
            $project: {
                _id:1,areaempresa:1,area:1,codigosence:1,duracion:1,tipo:1,tituloLargo:1,descripcion:1,horas:1,portada:1,modalidad:1,puntuacion:1,visita:1,precio:1,precioformateado:1,preciodescuentoformateado:1,  
                modulos: { $cond: { if: { $isArray: "$modulos" }, then: { $size: "$modulos" }, else: "NA"} }
            }
            }
        ] );

        if(cursos){
            return res.json(cursos)
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }

    }

 

    
    static cursosMostrar = async(req,res)=>{
        const cursos= await Cursos.find();
    
        if(cursos){
            return res.json(cursos)
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }

    static cursosRow = async(req,res)=>{
        let alldiplomados,dilaboral,ditributario,dieducacional,dirrhh,disalud,dimarketing;
        let allseminarios,semilaboral,semitributario,semieducacional,semirrhh;
        const rows=[];
        const result=[];
        const rowscursos=await Cursos.aggregate([
        {
            $group:{
                _id:{
                    area:"$area",
                    tipo:"$tipo"
                },
                rows:{
                    $sum: 1
                }
            },
        
        }])
        console.log(rowscursos);
            
        rowscursos.forEach(element=>{
    
           
            if(element._id.area=="Laboral" && element._id.tipo=="Diplomado"){
                dilaboral=element.rows;
            }
            if(element._id.area=="Tributario" && element._id.tipo=="Diplomado"){
                ditributario=element.rows;
            }
            if(element._id.area=="Educacional" && element._id.tipo=="Diplomado"){
                dieducacional=element.rows;
            }
            if(element._id.area=="RRHH" && element._id.tipo=="Diplomado"){
                dirrhh=element.rows;
            }
            if(element._id.area=="Salud" && element._id.tipo=="Diplomado"){
                disalud=element.rows;
            }
            if(element._id.area=="Marketing" && element._id.tipo=="Diplomado"){
                dimarketing=element.rows;
            }
            if(element._id.area=="Laboral" && element._id.tipo=="Seminario"){
                semilaboral=element.rows;
            }
            if(element._id.area=="Tributario" && element._id.tipo=="Seminario"){
                semitributario=element.rows;
            }
            if(element._id.area=="Educacional" && element._id.tipo=="Seminario"){
                semieducacional=element.rows;
            }
            if(element._id.area=="RRHH" && element._id.tipo=="Seminario"){
                semirrhh=element.rows;
            }
    
        })
    
    
        result.push({
            rowalldiplomados:alldiplomados,
            rowsdiplomadoslaboral:dilaboral,
            rowsdiplomadotributario:ditributario,
            rowsdiplomadoeducacional:dieducacional,
            rowsdiplomadorrhh:dirrhh,
            rowsdiplomadosalud:disalud,
            rowsdiplomadomarketing:dimarketing,
            rowallseminario:allseminarios,
            rowsseminariolaboral:semilaboral,
            rowsseminariotributario:semitributario,
            rowsseminarioeducacional:semieducacional,
            rowsseminariorrhh:semirrhh,
        })
    
        res.json(result);
    }

   static eventos=async(req,res)=>{
        const event=await Eventos.find();
        let consulta;
        eventos= [];   
        for(i=0;i<event.length;i++){
            consulta= await Cursos.findById(event[i].id,{area:1,portada:1,_id:1});
    
            eventos.push({
                id:event[i].id,
                titulo:event[i].title,
                modalidad:event[i].modalidad,
                start:event[i].start,
                end:event[i].end,
                portada:consulta.portada,
                area:consulta.area,
            })
        }

        res.json(eventos);
    }

    static Postrating= async(req,res)=>{
        const id=req.body.id;
        const rating={
            id:id,
            tipo:req.body.tipo,
            nombre:req.body.nombre,
            email:req.body.email,
            titulo:req.body.titulo,
            comentario:req.body.comentario,
            recomendacion:req.body.recomendacion,
            fechaFormateada:moment().format('LL'),
            rating:req.body.rating
        }
        let ratingModel = new Rating(rating);
        ratingModel.save();
    
        const promediototal=await Rating.aggregate([{$match:{id:id}},
            {$group:
                {
                    _id:"$id",
                    total:{$sum:1},
                    promedio:{$avg:"$rating"}
                  
                },
                 
            },
        
        ]);
        if(promediototal){
            const promedio=promediototal[0].promedio.toFixed(1);
            const puntuaciontotal=promediototal[0].total;
            const rest=await Cursos.findByIdAndUpdate(id,{puntuacion:promedio,puntuaciontotal:puntuaciontotal});
        }
        
        const resp=await Rating.find({id:req.body.id});
      
        return res.json({resp})
    }

    static rating = async(req,res)=>{
        const id=req.params.id;
        const rating=await Rating.find({id:id});
        
        const rs=await Rating.aggregate([{$match:{id:id}},
            {$group:
                {
                    _id:"$rating",
                    cantidad:{$sum:1},
                    totales:{$sum:"$rating"},
                    
                },
            },
          
         
        ])
        
        const promediototal=await Rating.aggregate([{$match:{id:id}},
            {$group:
                {
                    _id:"$id",
                    total:{$sum:1},
                    promedio:{$avg:"$rating"}
                  
                },
            },
        
        ]);
        var total=0;
        if(promediototal.length > 0){
            total=promediototal[0].total;
        }
      
        var start5={
            start:5,
            cantidad:0,
            promedio:0,
        },
        start4={
            start:4,
            cantidad:0,
            promedio:0,
        },
        start3={
            start:3,
            cantidad:0,
            promedio:0,
        },
        start2={
            start:2,
            cantidad:0,
            promedio:0,
        },
        start1={
            start:1,
            cantidad:0,
            promedio:0,
        };
    
        rs.forEach(element=>{
    
            if(element._id==5){
                start5={
                    start:element._id,
                    cantidad:element.cantidad,
                    promedio:(element.cantidad/total*100).toFixed(2),
                }
            }
    
            if(element._id==4){
                start4={
                    start:element._id,
                    cantidad:element.cantidad,
                    promedio:(element.cantidad/total*100).toFixed(2),
                }
            }
    
            if(element._id==3){
                start3={
                    start:element._id,
                    cantidad:element.cantidad,
                    promedio:(element.cantidad/total*100).toFixed(2),
                }
            }
    
            if(element._id==2){
                start2={
                    start:element._id,
                    cantidad:element.cantidad,
                    promedio:(element.cantidad/total*100).toFixed(2),
                }
            }
    
            if(element._id==1){
                start1={
                    start:element._id,
                    cantidad:element.cantidad,
                    promedio:(element.cantidad/total*100).toFixed(2),
                }
            }
        })
        const cantidadstart=[start5,start4,start3,start2,start1];
        const ratings={
            comentario:rating,
            promedio:promediototal.length > 0 ? promediototal[0].promedio.toFixed(1) : 0,
            total:promediototal.length > 0 ? promediototal[0].total : 0,
            cantidadstart:cantidadstart
        };
    
    
        if(rating){
            res.json(ratings);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }
}

module.exports = CapacitacionController;