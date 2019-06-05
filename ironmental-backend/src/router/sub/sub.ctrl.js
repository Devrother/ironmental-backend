import Subscriber from 'database/models/subscriber'
import uuidv4 from 'uuid/v4'
import sendMail from 'lib/sendMail'
import { MAIL_SUBJECT, CHK_MAIL_MSG, NO_CERTIFY_MSG, ALREDY_SUB_MSG } from 'messages/strings'
import { authMailHtml } from 'messages/htmlMail'

const { URL } = process.env

const createRequest = (message, isSub, isCertify) => {
    return { message, isSub, isCertify }
}

const createMailForm = (email, subject, html) => {
    return { email, subject, html }
}

export const subscribe = async (req, res) => {
    const { email } = req.body
    const uuid_v4 = uuidv4()
    const confirmLink = `${URL}/auth/confirm/${uuid_v4}`
    const html = authMailHtml(email, confirmLink)

    const subscriber = await Subscriber.findOne({ email: email })
    if (!subscriber) {
        const sub = new Subscriber({
            email: email,
            confirmCode: uuid_v4,
            isCertify: false
        })

        await sendMail(createMailForm(email, MAIL_SUBJECT, html))
        await sub.save()
        
        return res.send(createRequest(CHK_MAIL_MSG, false, false))
    }
    
    let isCertify = subscriber.isCertify

    if (isCertify) {
        return res.send(createRequest(ALREDY_SUB_MSG, true, isCertify))
    }
    
    await sendMail(createMailForm(email, MAIL_SUBJECT, html))
    await Subscriber.findOneAndUpdate({ email: email }, { confirmCode: uuid_v4 }, { runValidators: true })
    
    res.send(createRequest(NO_CERTIFY_MSG, true, isCertify))
}

export const show = async (req, res) => {
    const subscribers = await Subscriber.find()
    res.send(subscribers)
}