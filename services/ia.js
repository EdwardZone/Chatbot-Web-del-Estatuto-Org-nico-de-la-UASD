const fs = require("fs");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const estatuto = fs.readFileSync("estatuto.txt", "utf8");

async function responder(pregunta) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `
                    Eres un asistente experto en el Estatuto Orgánico de la UASD.
                    Solo puedes responder usando la información del estatuto provisto.
                    Si la respuesta no está en el documento, indícalo amablemente.`,
            },
            contents: `
                Estatuto Orgánico de la UASD:
                ${estatuto}
                Pregunta del usuario:
                ${pregunta}`,
        });
        return response.text;

    } catch (error) {
        console.error("Error al conectar con Gemini API:", error);
        throw error; 
    }
}

module.exports = {responder};