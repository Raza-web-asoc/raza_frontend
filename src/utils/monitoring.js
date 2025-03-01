import { envVariables } from "../config/variables.js";

export const sendMetrics = async (data) => {
    try {
        const url = new URL(`${envVariables.GRAPHQL_URL}:${envVariables.GRAPHQL_PORT}/front-metrics`);
        url.search = new URLSearchParams(data).toString();

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Error al enviar métricas:", response.statusText);
            return;
        }

        //const responseData = await response.json();
        //console.log("Respuesta recibida:", responseData);
    } catch (error) {
        console.error("Error de red al enviar métricas:", error);
    }
};