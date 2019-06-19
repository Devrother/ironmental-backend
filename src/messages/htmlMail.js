export const authMailHtml = (email, confirmLink) => {
    return `
        <p>
            <a href="mailto:${email}">${email}</a>
            님 반갑습니다!<br>
        </p>
        이메일 인증을 하고 다음주 월요일부터 구독을 하고 싶으시다면 
        <a href="${confirmLink}">여기</a>
        를 눌러주세요!`
}