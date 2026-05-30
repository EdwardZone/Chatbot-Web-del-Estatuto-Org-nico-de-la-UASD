const express = require("express");
const router = express.Router();

const { responder } = require("../services/ia");

router.post("/", async (req, res) => {
    try {
        const pregunta = req.body.pregunta;

        const respuesta = await responder(pregunta);

        res.json({respuesta});

    } catch(error){
        console.log(error);

        res.status(500).json({error: "Error en el servidor"});
    }
});
module.exports = router;