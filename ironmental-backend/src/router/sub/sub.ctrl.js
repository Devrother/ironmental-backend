import Subscriber from 'database/models/subscriber'
import uuidv4 from 'uuid/v4'
import sendMail from 'lib/sendMail'


export const subscribe = async (req, res) => {    
    console.log(`req.body.email: ${req.body.email}`)
    try {
        await sendMail({
            to: req.body.email,
            subject: "Ironmental 구독인증 메일",
            body: "<html><body>helloworld</body></html>"
        })
    } catch (e) {
        res.send({ message: e })
    }
    
    return res.send({ message: "ok" })
}

export const show = async (req, res) => {
    const subscribers = await Subscriber.find()
    res.send(subscribers)
}

// import Subscriber from 'database/models/subscriber'
// import uuidv4 from 'uuid/v4'
// import sendMail from 'lib/sendMail'


// export const subscribe = async (req, res) => {
//     const subscriber = await Subscriber.findOne({ email: req.body.email })
//     const uuid_v4 = uuidv4()
//     const confirmLink = `https://ironmental.net/auth/confirm/${uuid_v4}`
//     const html = `<p><a href="mailto:${subscriber}>${subscriber}</a>님 반갑습니다!<br></p>이메일 인증을 하고 다음주 월요일부터 구독을 하고 싶으시다면 <a href="${confirmLink}>여기</a>를 눌러주세요!</p>`
    
//     console.log(subscriber)
//     if (!subscriber) {
//         const sub = new Subscriber({
//             email: req.body.email,
//             confirmCode: uuid_v4,
//             isCertify: false
//         })
//         console.log(`wait`)
//         await sendMail({
//             email: req.body.email,
//             subject: "Ironmental 구독인증 메일",
//             html: `<html><body>hello</body></html>`
//         })
//         console.log(`send mail to ${req.body.email}`)
//         await sub.save()
        
//         return res.send({
//             message: "인증메일을 보냈으니 확인해주세요 :)",
//             isSub: false,
//             isCertify: false
//         })

//     }

//     let isCertify = subscriber.isCertify
//     if (isCertify) {
//         return res.send({
//             message: "이미 구독자입니다 :D",
//             isSub: true,
//             isCertify: subscriber.isCertify
//         })
//     }
//     console.log(`subscriber.email: ${subscriber.email}`)
//     await sendMail({
//         email: subscriber.email,
//         subject: "Ironmental 구독인증 메일",
//         html: `<html><body>hello</body></html>`
//     })
//     console.log(`Send mail ~`)
//     await Subscriber.findOneAndUpdate({ email: req.body.email }, { confirmCode: uuid_v4 }, { runValidators: true })
//     res.send({
//         message: "인증되지 않은 구독자입니다. 인증메일을 보냈으니 확인해주세요 :)",
//         isSub: true,
//         isCertify: subscriber.isCertify
//     })

// }

// export const show = async (req, res) => {
//     const subscribers = await Subscriber.find()
//     res.send(subscribers)
// }