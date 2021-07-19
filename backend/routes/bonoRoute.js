import express from 'express'
const router = express.Router();
//Importar el modelo 
import Bono from '../models/Bono'

router.get('/bono', async (req, res) => {
    try {
        const bonoDB = await Bono.find().populate({path:'usuario', select:'empleadoNombre'});
        res.json(bonoDB);
    } catch (error) {
        return res.status(500);
    }
});

router.get('/bono/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const bonoDB = await Bono.findById(_id).populate({path:'usuario', select:'empleadoNombre'});
        res.json(bonoDB);
    } catch (error) {
        return res.status(500);
    }
});

//ruta para obtener query de todos los dias de un mes especifico
router.get('/bono/fecha/:fechainit/:fechafin',async (req,res)=>{
    const fechaInit = req.params.fechainit;
    const fechaFin = req.params.fechafin;
    console.log(new Date(fechaInit))
    
    try{
        const bonoDB = await Bono.find(({"bonoFecha": {"$gte": new Date(fechaInit), "$lte": new Date(fechaFin)}})).populate({path:'usuario', select:'empleadoNombre'});
        console.log(Object.keys(bonoDB).length)
        res.json(bonoDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.post('/nuevoBono',async (req, res) => {
    const body = {
        bonoFecha: new Date(req.body.bonoFecha),
        bonoMotivo: req.body.bonoMotivo,
        bonoCantidad: req.body.bonoCantidad,
        usuario: req.body.usuario
    }
    console.log(new Date(req.body.bonoFecha))
    try{
        const bonoDB = await Bono.create(body);
        res.status(200).json(bonoDB);
    }catch (error){
        return res.status(500);
    }
});

module.exports = router;