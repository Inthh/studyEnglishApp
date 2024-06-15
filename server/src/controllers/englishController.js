import model from "../gemini/initModel.js";

const englishController = {
    checkGrammar: async (req, res) => {
        try {

            const { paragraph } = req.body;
            const prompt = `Check the grammar of the following paragraph "${paragraph}" and return the result as JSON data with the following structure:
            1. If there are grammatical errors:
            {
                "errors": [
                    {
                        "message": "string",
                        "location": {
                            "start": "number",
                            "end": "number"
                        }
                    },
                    {
                        "message": "string",
                        "location": {
                            "start": "number",
                            "end": "number"
                        }
                    }
                ],
                "suggestions": [
                    "string",
                    "string"
                ]
            }
            2. If the paragraph is grammatically correct, provide suggestions if possible:
            {
                "errors": [],
                "suggestions": [
                    "string",
                    "string"
                ]
            }            
            Notes:
                message: Description of each error
                location: The position of the error word in the sentence, starting from 0
                suggestions: Suggestions to correct the paragraph"
            `

            console.log('Starting calling to Gemini model for checking English grammar');
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Find the index of the first occurrence of ```
            const firstBackticksIndex = text.indexOf('```json');
            // Find the index of the second occurrence of ```, starting from the character after the first occurrence
            const secondBackticksIndex = text.indexOf('```', firstBackticksIndex + 7);

            // Extract the substring between the first and second ```
            const jsonSubstring = text.substring(firstBackticksIndex + 7, secondBackticksIndex).trim();

            const restString = text.substring(secondBackticksIndex + 3).trim()
            const convertedText = JSON.parse(jsonSubstring.replace(/json/, '').replace(/```/g, ''));
            
            res.json({ result: { ...convertedText, message: restString ?? "" } });
        } catch (err) {
            console.log('Error while checking grammar of English paragraph: ', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default englishController;