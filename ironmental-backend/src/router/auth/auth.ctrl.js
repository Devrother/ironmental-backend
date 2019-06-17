import { Subscriber } from 'database/models'

export const confirm = async (req, res) => {
    const { confirmCode } = req.body;
    
    await Subscriber.updateByConfirmCode(confirmCode)
    
    res.send({ message: "인증되었습니다! "})
}