    const {signup, login} = require("./authController.js");
    const { getConnection } = require('../services/connectServiceDatabase');


    exports.createQuote = async (req, res) => {
        const {quote, author} = req.body;
        const conn =  await getConnection();
        await conn.query("USE birthdayApp");

        
        try {
            await conn.query('INSERT INTO quotes VALUES (?,?)',[quote, author])
        } catch (error) {
            return res.status(400).json({ message: 'Insert failed' });
        }
    }

    exports.deleteQuote = async (req, res) => {
        const {id} = req.body;
        const conn =  await getConnection();
        
        try {
            await conn.query('DELETE FROM quotes WHERE id = ?',[id])
        } catch (error) {
            return res.status(400).json({ message: 'Delete failed' });
        }
    }

    exports.updateQuote = async (req, res) => {
        
        const conn =  await getConnection();
        try {
            
        } catch (error) {
            
        }
    }

    exports.getQuotes = async (req, res) => {
        const conn =  await getConnection();
        console.log('++++++++++++++++++++++++++++++++++++++')
        try {
            const quotes = await conn.query('SELECT * FROM quotes')
            res.status(201).json({ quotes: quotes });
        } catch (error) {
            return res.status(400).json({ message: 'get quotes failed' });
        }
    }