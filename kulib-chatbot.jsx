import { useState, useRef, useEffect } from "react";

const LIBRARY_KNOWLEDGE = `
당신은 고려대학교 학술정보관(CDL) 근로장학생을 위한 AI 어시스턴트입니다.
아래 도서관 정보를 바탕으로 정확하고 친절하게 답변하세요.
답변은 간결하고 명확하게 해주세요. 모르는 내용은 "도서관 홈페이지(library.korea.ac.kr)에서 확인하거나 담당 직원에게 문의하세요"라고 안내하세요.
한국어로만 답변하세요.

=== 학술정보관(CDL) 기본 정보 ===
- 위치: 개교 100주년 기념 삼성관 내
- 개관: 2005년 5월
- 특징: 국내 최초 인포메이션 커먼스(IC) 개념 기반, 멀티미디어 자료 이용 가능
- 소장자료: DVD, 필름 등 영상자료 40,000여 점
- 문의전화: 02-3290-2782 (2층 멀티미디어열람실 데스크)
- 자료실은 방학 중 토요일도 개관, 열람실은 연중 개방
- 이용 시 학생증 지참 필수

=== CDL 층별 시설 안내 ===

[4층]
■ 대열람실
- 일반열람좌석 427석, 노트북 좌석 586석
- 문의: 02-3290-2782

■ 그룹스터디룸 (4층)
- 용도: 소규모 그룹 스터디/토론
- 수용: 총 40명 (4인실 2실, 6인실 4실, 8인실 1실)
- 시설: 회의테이블, 이동식 화이트보드
- 예약: 시설 예약페이지/모바일 앱 (사용일 2주 전~당일까지)
- 이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일 9:00~15:00 (방학 9:00~13:00), 공휴일 휴무

[3층]
■ 화상회의실
- 용도: 타대학 학술교류, 교환학생 소통
- 수용: 12명
- 시설: 다자간 회의장비(12개 사이트 지원), 50인치 PDP, DVD Player, AV System, 영상저장서버
- 이용시간: 평일 9:00~17:30 (방학 9:00~16:30), 토·공휴일 휴무
- 문의: 02-3290-2782

[2층]
■ 멀티미디어열람실
- 용도: TV, CD, DVD, Video, Audio 등 멀티미디어 자료 열람
- 이용방법: 모바일 앱(KLIB) 또는 좌석배정기(키오스크)로 좌석 배정 / 앱·키오스크 불가 좌석은 현장 방문 배정
- 시설: CD/DVD 전용 PC, 멀티미디어 재생 S/W, TV, DVD Player, 국회/국립중앙도서관 원문 열람·출력
- 이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일 9:00~15:00 (방학 9:00~13:00), 공휴일 휴무

■ Theater
- 용도: 디지털 시네마, 소극장 형식의 영상 관람
- 수용: 16명 (의자 추가 시 최대 22명)
- 시설: 63인치 PDP, DVD Player, AV 시스템, 7.1Ch 스피커, 2인용 소파
- 예약: 시설 예약페이지/모바일 앱 (사용일 2주 전~이틀 전까지)
- 최소 신청인원: 7명 이상
- 예약 신청 후 관리자 승인 필요 (승인까지 1~2일 소요), 예약/배정 현황에서 확인
- 이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일 9:00~15:00 (방학 9:00~13:00), 공휴일 휴무

■ 그룹프레젠테이션룸
- 용도: 중규모 세미나, 회의
- 수용: 18명
- 시설: 프로젝터, AV시스템
- 예약: 시설 예약페이지/모바일 앱 (사용일 2주 전~이틀 전까지)
- 대학원생 이상만 신청 가능, 최소 9명 이상
- 예약 신청 후 관리자 승인 필요 (1~2일 소요)
- 이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일 9:00~15:00 (방학 9:00~13:00), 공휴일 휴무

■ 그룹스터디룸 (2층)
- 수용: 총 94명 (4인실 7실, 6인실 11실)
- 시설: 회의테이블, 화이트보드
- 예약: 시설 예약페이지/모바일 앱 (사용일 2주 전~당일까지)
- 이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일 9:00~15:00 (방학 9:00~13:00), 공휴일 휴무

■ Carrel (2층 G-Lounge)
- 용도: 1인 집중 학습 공간 (전원 제공)
- 수용: 2실
- 이용방법: 모바일 앱 또는 좌석배정기(키오스크)
- 이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일 9:00~15:00 (방학 9:00~13:00)

[1층]
■ C-Lounge
- A Zone (144석): 전원+개별 스탠드 설치 무선 노트북 열람석, 06:00~23:00 연중개방
- B Zone (40석): 전원+유무선 네트워크, 삼각 1인 테이블, 06:00~23:00 연중개방
- C Zone (26석): 전원+유무선 네트워크, 캐럴형 1인 열람석, 06:00~23:00 연중개방
- Group Study room (8인실 1개, 6인실 2개, 총 20석): 협업·토론 가능 공간
  이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일 9:00~15:00 (방학 9:00~13:00)
  예약: 홈페이지/모바일 앱, 이용 전 2층 멀티미디어열람실 데스크에 학생증 제출
- Sleeping Zone (남성 2실, 여성 2실, 총 12석): 학습 중 휴게 공간, 06:00~23:00 자유이용

■ D-Lounge
- A Zone (69석): 전원+개별 스탠드, 집중 학습 열람석, 06:00~23:00 연중개방
- B Zone (29석): 전원+무선 네트워크, 노트북 열람석, 06:00~23:00 연중개방
- Group Study room (4인실 4개, 총 16석)
  이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일 9:00~15:00 (방학 9:00~13:00)
  예약: 홈페이지/모바일 앱, 이용 전 2층 멀티미디어열람실 데스크에 학생증 제출

■ L-Lounge
- 용도: 다목적 공간 (Legacy/Learning/Living 콘셉트), 혼천전도·용감수경 전시, 학술강연·행사·휴게
- 이용방법: 별도 행사 없으면 자유 이용 (행사 시 자리 비워야 함)
- 이용시간: 평일 9:00~22:00 (방학 9:00~19:00), 토요일·공휴일 휴무
- 행사 예약: 사전 유선 예약, 사용 목적 검토·승인 후 이용 가능 (대관신청서 필요)
- 행사 가능시간: 평일 9:30~21:30 (방학 9:30~18:30)

[지하 1층]
■ 국제기구자료실
- 소장: UN/EU/OECD 자료, 고려대 학위논문, 교양잡지, 신문, 보존서고 (총 약 29만권)
- UN자료: 43,800여 책 (1957년 국내 최초 신설)
- EU자료: Official Journal 등 9,100여 책 + Microfiche 10,000여 장 (1991년 신설)
- OECD자료: 9,400여 책 (1970년부터)
- 학위논문: 106,600여 권, 디지털 컬렉션 전문 열람 가능 / 타대학 논문은 국회도서관 원문 전용 PC 이용
- 보존서고: 1945~2000년대 약 125,000여 권
- 좌석: 열람석 45석, 자료검색석 2석, 국회도서관 원문 열람석 1석, 프린트 전용석 1석
- 기기: 복사기 2대, 프린터 1대, 마이크로필름리더기 1대
- UN/EU/OECD 자료: 일반인도 이용 가능, 관외 대출 불가, 복사만 가능
- 학위논문·보존서고: 본교 학생 대출 가능
- 교양잡지·신문: 열람·복사만 가능 (고신문은 사진촬영만 가능)
- 문의: 02-3290-1506

=== 대출/반납 규정 ===
■ 대출 책수 및 기간
- 학부생: 30책, 15일, 연장 15일 3회
- 대학원생/교환학생(대학원)/직원: 60책, 30일, 연장 30일 3회
- 교원(전임/비전임/강사/명예): 90책, 90일, 연장 90일 3회
- 연회비 이용자/교환학생(학부/국외): 10책, 15일, 연장 15일 1회
※ 반납예정일이 공휴일/휴관일이면 다음날로 자동 변경

■ 대출방법
- 서가에서 자료 선택 후 셀프대출반납기에 ID(카드/모바일) 인증
- 딸림자료(부록 등)는 자료실 데스크에서만 대출/반납 가능

■ 대출 기간 연장
- 나의공간 > 자료대출/예약 현황 메뉴에서 온라인 연장
- 반납예정일 5일 전부터 연장 가능
- 예약자가 없는 경우에만 연장 가능

■ 반납방법
- RFID 자동화 시스템 (자동반납기, 스마트대출반납기, 셀프대출반납기)
- 각 자료실 데스크 직접 반납
- 택배 반납 가능 (착불 불가) / 수령인: 택배 반납

■ 연체/제재
- 연체 반납 시: 연체일 수만큼 대출 중지
- 여러 자료 연체 시: 가장 오래 연체한 자료 기준 적용
- 연회비 이용자: 연체일의 2배만큼 대출 중지
- 30일 이상 장기 연체: 반납 시까지 도서관 출입 및 시설 이용 전면 중지

■ 변상
- 분실·훼손으로 자료 가치 현저히 저하 시 동일도서로 변상
- 중고도서 접수 불가
- 절판 시 자료실 담당자 지정 자료로 변상

=== 시설 예약 방법 ===
- 예약페이지: library.korea.ac.kr 시설·좌석 예약·현황 메뉴
- 모바일 앱: KLIB 앱
- 좌석배정기(키오스크): 현장 키오스크
`;

const QUICK_QUESTIONS = [
  "CDL 층별 시설 알려줘",
  "그룹스터디룸 예약 방법",
  "Theater 예약 어떻게 해?",
  "대출 몇 권까지 돼?",
  "연체하면 어떻게 되나요?",
  "국제기구자료실 뭐가 있어?",
  "슬리핑존 이용방법",
  "화상회의실 신청하려면?",
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "안녕하세요! CDL 도서관 안내 챗봇이에요 📚\n\n시설 이용, 예약 방법, 자료 대출/반납 등 궁금한 점을 편하게 질문해 주세요!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "sk-ant-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",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: LIBRARY_KNOWLEDGE,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "답변을 가져오지 못했어요. 다시 시도해 주세요.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "오류가 발생했어요. 잠시 후 다시 시도해 주세요." }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showQuickQ = messages.length <= 1;

  return (
    <div style={{
      height: "100vh",
      background: "#0d0d0e",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
      color: "#f0f0f0",
    }}>
      {/* Header */}
      <div style={{
        width: "100%",
        maxWidth: 680,
        padding: "20px 20px 12px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: "1px solid #1e1e20",
        flexShrink: 0,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: "linear-gradient(135deg, #8b1a1a 0%, #c0392b 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
        }}>📚</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>고려대 CDL 도서관 안내봇</div>
          <div style={{ color: "#555", fontSize: 11, marginTop: 1 }}>학술정보관 시설·자료 이용 도우미 · 근로장학생 전용</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        width: "100%",
        maxWidth: 680,
        overflowY: "auto",
        padding: "20px 20px 0",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-start", gap: 8 }}>
            {m.role === "assistant" && (
              <div style={{
                width: 26, height: 26, borderRadius: 7, flexShrink: 0, marginTop: 2,
                background: "linear-gradient(135deg, #8b1a1a, #c0392b)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
              }}>📚</div>
            )}
            <div style={{
              maxWidth: "80%",
              background: m.role === "user" ? "linear-gradient(135deg, #8b1a1a, #c0392b)" : "#181819",
              border: m.role === "user" ? "none" : "1px solid #252527",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
              padding: "10px 14px",
              fontSize: 13.5,
              lineHeight: 1.65,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color: "#ebebeb",
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 7, flexShrink: 0,
              background: "linear-gradient(135deg, #8b1a1a, #c0392b)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
            }}>📚</div>
            <div style={{
              background: "#181819", border: "1px solid #252527",
              borderRadius: "4px 16px 16px 16px",
              padding: "12px 16px", display: "flex", gap: 5, alignItems: "center",
            }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#555",
                  animation: "blink 1.2s ease-in-out infinite",
                  animationDelay: `${j * 0.22}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      {showQuickQ && (
        <div style={{
          width: "100%", maxWidth: 680,
          padding: "14px 20px 0",
          display: "flex", flexWrap: "wrap", gap: 7,
        }}>
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)} style={{
              background: "#181819", border: "1px solid #252527",
              borderRadius: 18, padding: "6px 13px",
              color: "#aaa", fontSize: 12, cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#c0392b"; e.target.style.color = "#eee"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#252527"; e.target.style.color = "#aaa"; }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        width: "100%", maxWidth: 680,
        padding: "14px 20px 22px",
        display: "flex", gap: 8, flexShrink: 0,
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="질문 입력 후 Enter..."
          rows={1}
          style={{
            flex: 1, background: "#181819",
            border: "1px solid #252527",
            borderRadius: 12, padding: "11px 15px",
            color: "#ebebeb", fontSize: 13.5,
            resize: "none", outline: "none",
            fontFamily: "inherit", lineHeight: 1.5,
            transition: "border-color 0.15s",
          }}
          onFocus={e => e.target.style.borderColor = "#8b1a1a"}
          onBlur={e => e.target.style.borderColor = "#252527"}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          style={{
            width: 42, height: 42, borderRadius: 10, flexShrink: 0, alignSelf: "flex-end",
            background: input.trim() && !loading ? "linear-gradient(135deg, #8b1a1a, #c0392b)" : "#181819",
            border: "1px solid #252527",
            color: input.trim() && !loading ? "#fff" : "#444",
            fontSize: 17, cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
          }}
        >↑</button>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea::placeholder { color: #3a3a3e; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #2a2a2c; border-radius: 3px; }
      `}</style>
    </div>
  );
}
