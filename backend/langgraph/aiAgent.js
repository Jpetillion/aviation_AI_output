import { buildGraph } from "./graphBuilder.js";

const aiGraph = buildGraph();

export const queryAI = async (question) => {
    console.log("DEBUG: AI Query ontvangen:", question);

    try {
        const result = await aiGraph.invoke({ question }); // ✅ Gebruik altijd `invoke()` i.p.v. `run()`
        console.log("DEBUG: AI Antwoord:", result);
        return result;
    } catch (error) {
        console.error("FOUT: Graph kon niet uitgevoerd worden", error);
        return "Er is een fout opgetreden bij het verwerken van je vraag.";
    }
};
