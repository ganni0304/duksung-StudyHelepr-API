# 인터넷기초[04] 과제2 - 나만의 인공지능 서비스 (백엔드)

## 개요
이 저장소는 **[Study Helper](https://ganni0304.github.io/duksung-studyhelper/)** 서비스를 위한 **백엔드 API**입니다.  
프론트엔드로부터 요청을 받아 **Gemini API**를 호출하고,  
생성된 **LLM 답변 결과**를 다시 프론트엔드에 응답합니다.

---

## 주요 기능
- 클라이언트로부터 질문, 어려운 점, 이해도 데이터를 수신
- Google Gemini LLM 모델에 프롬프트 전송
- 생성된 설명 및 문제 데이터를 응답
- API 키 보안 보호 (프론트에 노출되지 않음)
- Vercel의 서버리스(Serverless) 환경에 배포됨

---

## 사용 기술
- Node.js (Express-like 구조)
- Vercel Serverless Functions
- Google Gemini API

---

## 배포 주소
> 실제 프론트엔드와 통신하는 API는 [https://assign2-one.vercel.app/api/duksungAI](https://assign2-one.vercel.app/api/duksungAI) 로 구성되어 있습니다.


