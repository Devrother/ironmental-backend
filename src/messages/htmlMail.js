export const authMailHtml = (email, confirmLink) => {
  return `
    <p>
      <a href="mailto:${email}">${email}</a>
      님 반갑습니다!<br>
    </p>
    이메일 인증을 통해 구독하고 매주 월요일마다 개발 키워드를 받고 싶으시다면 
    <a href="${confirmLink}">여기</a>
    를 눌러주세요!`;
};
