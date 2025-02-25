import { queryAI } from '../langgraph/aiAgent.js';

export const processQuestion = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Vraag is verplicht' });
        }

        const response = await queryAI(question);
        res.json({ answer: response });
    } catch (error) {
        res.status(500).json({ error: 'Interne serverfout' });
    }
};
