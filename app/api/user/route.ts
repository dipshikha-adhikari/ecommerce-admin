import { NextApiRequest, NextApiResponse } from "next";

export default function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Your route logic here
        return res.status(200).json({ message: 'success' });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Failed' });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

// Apply middleware to the API route
