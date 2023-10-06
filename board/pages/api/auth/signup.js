import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function SignupAPI(req, resp) {
    if(req.method === 'POST'){
        const hash = await bcrypt.hash(req.body.password, 10) // 암호화, 10은 암호화정도-수정가능
        req.body.password = hash;
        let db = (await connectDB).db('forum')
        await db.collection('user_cred').insertOne(req.body)
        resp.status(200).json('가입성공');
    }
}