import Subscriber from 'database/models/subscriber'
import uuidv4 from 'uuid/v4'
import sendMail from 'lib/sendMail'

const createRequest = (msg, isSub, isCertify) => {
    return {
        message: msg,
        isSub: isSub,
        isCertify: isCertify
    }
}

const createMailForm = (email, subject, html) => {
    return {
        email: email,
        subject: subject,
        html: html
    }
}

export const subscribe = async (req, res) => {
    const { email } = req.body
    const subscriber = await Subscriber.findOne({ email: email })
    const uuid_v4 = uuidv4()
    const confirmLink = `https://ironmental.net/auth/confirm/${uuid_v4}`
    const html = `<p><a href="mailto:${email}">${email}</a>님 반갑습니다!<br></p>이메일 인증을 하고 다음주 월요일부터 구독을 하고 싶으시다면 <a href="${confirmLink}">여기</a>를 눌러주세요!</p>`
    
    if (!subscriber) {
        const sub = new Subscriber({
            email: email,
            confirmCode: uuid_v4,
            isCertify: false
        })

        // console.log(`send mail to ${req.body.email}`)
        await sendMail(createMailForm(email, "Ironmental 구독인증 메일", html))
        
        await sub.save()
        
        return res.send(createRequest("인증메일을 보냈으니 확인해주세요 :)", false, false))

    }
    // console.log(`subscriber.isCertify: ${subscriber.isCertify}`)
    let isCertify = subscriber.isCertify
    if (isCertify) {
        return res.send(createRequest("이미 구독자입니다 :D", true, subscriber.isCertify))
    }
    
    await sendMail(createMailForm(email, "Ironmental 구독인증 메일", html))
    
    await Subscriber.findOneAndUpdate({ email: email }, { confirmCode: uuid_v4 }, { runValidators: true })
    
    res.send(createRequest("인증되지 않은 구독자입니다. 인증메일을 보냈으니 확인해주세요 :)", true, subscriber.isCertify))
}

export const show = async (req, res) => {
    const subscribers = await Subscriber.find()
    res.send(subscribers)
}