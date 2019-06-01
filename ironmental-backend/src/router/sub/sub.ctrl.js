import Subscriber from 'database/models/subscriber'
import uuidv4 from 'uuid/v4'
import { sendMail } from 'lib/sendMail'


export const subscribe = async (req, res) => {    
    const subscriber = await Subscriber.findOne({ email: req.body.email })
    const confirmLink = 'https://ironmental.net/auth/confirm'

    if (subscriber) {
        let isCertify = subscriber.isCertify
        if (isCertify) {
            res.send({
                message: "이미 구독자입니다 :D",
                isSub: true,
                isCertify: subscriber.isCertify
            })
        }
        res.send({
            message: "인증되지 않은 구독자입니다. 인증메일을 보냈으니 확인해주세요 :)",
            isSub: true,
            isCertify: subscriber.isCertify
        })
        await Subscriber.findOneAndUpdate({ email: req.body.email }, { confirmCode: uuidv4() }, { runValidators: true })
        await sendMail({
            email: subscriber,
            subject: "Ironmental 구독인증 메일",
            html: "<p><a href=\"mailto:" + subscriber + "\">" + subscriber+ "</a>님 반갑습니다!<br></p>이메일 인증을 하고 다음주 월요일부터 구독을 하고 싶으시다면 <a href=\"" + confirmLink + "\">여기</a>를 눌러주세요!</p>"
        })
    } else {
        const sub = new Subscriber({
            email: req.body.email,
            confirmCode: uuidv4(),
            isCertify: false
        })
    
        await sub.save()
        await sendMail({
            email: subscriber,
            subject: "Ironmental 구독인증 메일",
            html: "<p><a href=\"mailto:" + subscriber + "\">" + subscriber+ "</a>님 반갑습니다!<br></p>이메일 인증을 하고 다음주 월요일부터 구독을 하고 싶으시다면 <a href=\" + confirmLink + \">여기</a>를 눌러주세요!</p>"
        })
        res.send({
            message: "인증메일을 보냈으니 확인해주세요 :)",
            isSub: false,
            isCertify: false
        })
    }
}

export const show = async (req, res) => {
    const subscribers = await Subscriber.find()
    res.send(subscribers)
}