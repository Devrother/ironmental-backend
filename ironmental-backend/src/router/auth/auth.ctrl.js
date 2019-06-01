import Subscriber from 'database/models/subscriber'

export const confirm = async (req, res) => {
    const confirmCode = req.body.confirmCode;
    // const email = req.body.email;
    
    const subscriber = await Subscriber.findOne({ confirmCode: confirmCode })

    if (!subscriber) {
        res.send({ message: "잘못된 인증 코드입니다." })
    } else {
        await Subscriber.findOneAndUpdate({ confirmCode: confirmCode }, { confirmCode: null, isCertify: true }, { runValidators: true })
        res.send({ message: "인증되었습니다! "})
    }
}