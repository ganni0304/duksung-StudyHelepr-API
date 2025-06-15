import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { diff } from "util";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  try{

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { question, difficulty, understandingLevel } = req.body;

  if(!question || !difficulty || !understandingLevel){
    return res.status(400).json({error:"question과 difficulty와 understandingLevel이 필요합니다."});
  }

  // ✨ 공통 프롬프트 생성 함수
  const makePrompt = (question, difficulty, understandingLevel) => `
[학생의 질문]
${question}

[학생이 말한 어려운 점]
${difficulty}

[학생이 자기 평가한 이해도]
${understandingLevel}/5

설명은 이해도 수준에 맞게 조절해주세요.
`;

  const prompt = makePrompt(question, difficulty, understandingLevel);

  const systemInstruction = `
당신은 모든 학문에 박식한 박사급 AI 교육 전문가입니다.
학생이 입력한 질문과 어려운 점을 바탕으로 다음과 같이 도와주세요:

1. 문제에 대한 정확하고 친절한 해설을 제공해주세요.
2. 유사하거나 변형된 문제를 2개 생성해주세요.
3. 학생이 어떤 부분에서 어려움을 겪고 있는지 추론하고 설명해주세요.
4. 앞으로 어떤 개념을 어떻게 공부하면 좋을지 학습 방향을 제시해주세요.
5. 마지막에는 학생의 동기를 북돋울 수 있는 격언 한 줄로 마무리해주세요.

설명은 학생의 자기 평가에 따라 맞춰주세요:
- 이해도 1~2: 아주 쉽게, 예시 위주로 자세히 설명
- 이해도 3~4: 중간 수준의 깊이와 개념 중심
- 이해도 5: 간결하고 고급 예시 포함
말투는 따뜻하고 친절하게 해주세요. 
긴 설명이나 튜토리얼을 작성할 때, 초보자의 입장에서 핵심 내용을 간단명료하게 정리해주세요. 각 항목을 번호, 제목, 구분선, 코드 블록 등으로 시각적으로 구분하여 읽기 편한 형식으로 만들어주세요.
`;

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: systemInstruction
  })

  const text = result.candidates[0].content.parts[0].text;

  return res.status(200).json({ answer:text });
}catch(err) {
  console.error(err);
  res.status(500).json({error : "Gemini API 오류 발생"});
}
}

