import { Graph } from '@langchain/langgraph';
import { findRelevantData } from '../controllers/dataController.js';

export const buildGraph = () => {
    const graph = new Graph();

    // ✅ Start node (belangrijk: starts: true)
    graph.addNode(
        "parseQuestion",
        async (input) => {
            console.log("DEBUG: parseQuestion bereikt met input:", input);
            return { query: input.question.toLowerCase() };
        },
        { starts: true, ends: ["retrieveData"] }
    );

    // ✅ Data ophalen
    graph.addNode(
        "retrieveData",
        async (input) => {
            console.log("DEBUG: retrieveData bereikt met query:", input.query);
            const data = findRelevantData(input.query);
            return { data };
        },
        { ends: ["generateResponse"] }
    );

    // ✅ AI Response genereren
    graph.addNode(
        "generateResponse",
        async (input) => {
            console.log("DEBUG: generateResponse bereikt met data:", input.data);
            if (!input.data.length) return { answer: "Geen relevante data gevonden." };
            return { answer: `Studenten gevonden: ${input.data.map((s) => s.name).join(", ")}` };
        },
        { ends: ["output"] }
    );

    // ✅ Eindpunt
    graph.addNode("output", async (input) => {
        console.log("DEBUG: output bereikt met antwoord:", input.answer);
        return input.answer;
    });

    // ✅ Zorg voor correcte verbindingen
    graph.addEdge("parseQuestion", "retrieveData");
    graph.addEdge("retrieveData", "generateResponse");
    graph.addEdge("generateResponse", "output");

    // ✅ Graph compileren
    return graph.compile();
};
