import User from '../Model/user.model.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}