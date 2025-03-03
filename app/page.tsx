"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Image from 'next/image';

// 메시지 타입 정의
interface Message {
  id: number;
  name: string;
  content: string;
  password: string;
  createdAt: string;
}

export default function Page() {
  // 메시지 상태 관리
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState({ name: '', content: '', password: '' });
  const [showMessageForm, setShowMessageForm] = useState(false);

  // 카카오맵 열기
  function openKakaoMap() {
    window.open(
      "https://map.kakao.com/link/map/마산스카이뷰호텔,35.20088411959797,128.57532711513025",
      "_blank"
    );
  }

  // 주소 복사하기
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("청첩장 주소가 복사되었습니다.");
  };

  // 카카오톡 공유하기
  const shareKakao = () => {
    // 모바일 여부 체크
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // 모바일에서는 카카오톡 공유하기 실행
      if (typeof window.Kakao === 'undefined') {
        alert("카카오톡 SDK를 초기화중입니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '구민재 ♥️ 손유나 결혼식에 초대합니다',
          description: '2025년 11월 29일 토요일 오후 3시 40분\n마산스카이뷰 호텔 웨딩홀',
          imageUrl: window.location.origin + '/images/j.png', // 실제 이미지 URL로 수정 필요
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        social: {
          likeCount: 0,
          commentCount: 0,
          sharedCount: 0,
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      // 데스크탑에서는 URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert("청첩장 주소가 복사되었습니다.");
    }
  };

  // 카카오 SDK 초기화
  const initKakao = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }
    }
  };

  // Script 로드 완료 후 실행될 핸들러
  const handleKakaoLoad = () => {
    initKakao();
  };

  // 메시지 작성 폼 제출
  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.content || !newMessage.password) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const message: Message = {
      id: Date.now(),
      ...newMessage,
      createdAt: new Date().toLocaleDateString()
    };

    setMessages(prev => [message, ...prev]);
    setNewMessage({ name: '', content: '', password: '' });
    setShowMessageForm(false);
  };

  // 메시지 삭제
  const handleDeleteMessage = (id: number, password: string) => {
    const messageToDelete = messages.find(m => m.id === id);
    if (!messageToDelete) return;

    const inputPassword = prompt('비밀번호를 입력해주세요:');
    if (inputPassword === messageToDelete.password) {
      setMessages(prev => prev.filter(m => m.id !== id));
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin="anonymous"
        onLoad={handleKakaoLoad}
      />

      <main className="relative w-full min-h-screen bg-[#F5F5F5]">
        {/* 모바일에서는 전체 화면, 데스크탑에서는 중앙 정렬된 카드 형태 */}
        <div className="mx-auto max-w-[430px] min-h-screen bg-white md:min-h-[calc(100vh-6rem)] md:my-12 md:shadow-2xl md:rounded-[2rem] overflow-hidden relative">
          {/* 상단 이미지 섹션 */}
          <div className="relative h-[80vh] md:h-[60vh]">
            <Image
              src="https://raw.githubusercontent.com/kooroot/mobile-invitation/main/public/images/j.jpg"
              alt="Wedding Cover Image"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 430px) 100vw, 430px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 flex flex-col justify-end pb-16 px-6 text-white">
              <h1 className="text-center animate-fade-in">
                <div className="text-3xl font-light mb-6">구민재 · 손유나</div>
                <div className="text-lg font-light">
                  2025. 11. 29. SAT PM 3:40
                </div>
                <div className="text-lg font-light mt-2">
                  마산스카이뷰 호텔 웨딩홀
                </div>
              </h1>
            </div>
          </div>

          {/* 콘텐츠 섹션 */}
          <div className="space-y-20">
            {/* 인사말 */}
            <section className="px-6 pt-20 text-center">
              <h2 className="text-2xl mb-8">결혼합니다</h2>
              <p className="text-gray-600 leading-relaxed">
                서로를 비추는 빛이 되어<br/>
                같은 곳을 바라보며 걸어가겠습니다.<br/>
                저희 두 사람이 사랑으로 만나<br/>
                인생이라는 여행을 함께 떠나려 합니다.<br/>
                귀한 걸음 하시어 축복해 주시면<br/>
                더없는 기쁨으로 간직하겠습니다.
              </p>
            </section>

            {/* WEDDING DAY 섹션 */}
            <section className="bg-[#F8F8F8] py-20 px-6 -mx-6">
              <h2 className="text-3xl tracking-wider text-center mb-8">
                WEDDING DAY
              </h2>
              <p className="text-center">2025년 11월 29일 토요일 | 오후 3시 40분</p>
            </section>

            {/* =============================
                4) 오시는 길(지도) 섹션
               ============================= */}
            <section className="bg-white text-center py-10">
              <h2 className="text-4xl tracking-wider opacity-90">
                LOCATION
              </h2>
              <div className="mt-6 flex flex-col gap-y-2 px-6">
                <span>스카이뷰관광호텔 웨딩홀 13층 </span>
                <button className="opacity-50" onClick={openKakaoMap}>
                  경남 창원시 마산합포구 해안대로 317 스카이뷰관광호텔 (지도 열기)
                </button>
              </div>

              {/* 실제 지도 표시 영역(카카오맵 / 네이버지도) */}
              <div className="w-full px-4 mt-4">
                <div style={{ width: "100%", height: "224px", position: "relative" }}>
                  <div
                    id="map"
                    className="absolute top-0 left-0 w-full h-full bg-gray-200"
                  >
                    {/* 지도 초기화 코드 (useEffect 등) */}
                  </div>
                </div>
              </div>

              {/* 네이버, 티맵, 구글맵 링크 버튼 */}
              <div className="flex justify-evenly mt-4">
                <a
                  href="https://map.naver.com/p/entry/place/13014656?c=18.00,0,0,0,dh"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white text-sm border rounded"
                >
                  네이버 지도
                </a>
                <a
                  href="tmap://route?goalname=스카이뷰관광호텔&goalx=128.57532711513025&goaly=35.20088411959797"
                  className="px-4 py-2 bg-white text-sm border rounded"
                >
                  T Map
                </a>
                <a
                  href="https://www.google.com/maps/@35.20088411959797,128.57532711513025,18z"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white text-sm border rounded"
                >
                  구글 지도
                </a>
              </div>
            </section>

            {/* =============================
                5) 연락처 / 계좌 안내 섹션
               ============================= */}
            <section className="bg-[#F8F8F8] py-10 px-4 text-center">
              <h2 className="text-xl">마음 전하실 곳</h2>
              <div className="mt-6 text-sm leading-6">
                <p>
                  신랑측: 기업은행{" "}
                  <b>01050489085 (구민재)</b>
                </p>
                <p>
                  신부측: 은행{" "}
                  <b>111 (손유나)</b>
                </p>
                <p className="mt-4 text-gray-500 text-xs">
                  * 화환은 정중히 사양합니다
                </p>
              </div>
            </section>

            {/* =============================
                6) 갤러리 섹션 (샘플)
               ============================= */}
            <section className="py-20 px-6">
              <h2 className="text-3xl tracking-wider text-center mb-8">
                GALLERY
              </h2>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square overflow-hidden rounded-lg relative">
                  <Image
                    src="https://raw.githubusercontent.com/kooroot/mobile-invitation/main/public/images/j.jpg"
                    alt="gallery-1"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 430px) 33vw, 143px"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg relative">
                  <Image
                    src="https://raw.githubusercontent.com/kooroot/mobile-invitation/main/public/images/j.jpg"
                    alt="gallery-2"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 430px) 33vw, 143px"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg relative">
                  <Image
                    src="https://raw.githubusercontent.com/kooroot/mobile-invitation/main/public/images/j.jpg"
                    alt="gallery-3"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 430px) 33vw, 143px"
                  />
                </div>
              </div>
            </section>

            {/* =============================
                7) 방명록 / 메시지 섹션
               ============================= */}
            <section className="bg-[#EFEFF0] py-10 px-4">
              <h2 className="text-4xl tracking-wider opacity-90">
                MESSAGE
              </h2>
              <p className="text-center mt-4">
                신랑 신부에게 축복의 마음을 전해주세요!
              </p>
              
              {/* 메시지 목록 */}
              <div className="mt-8 space-y-4">
                {messages.map(message => (
                  <div key={message.id} className="border rounded-lg p-4 bg-white relative">
                    <button
                      onClick={() => handleDeleteMessage(message.id, message.password)}
                      className="absolute top-4 right-4 text-gray-400 text-sm"
                    >
                      삭제
                    </button>
                    <p className="font-medium mb-2">{message.name}</p>
                    <p className="text-gray-600 mb-3 break-all">{message.content}</p>
                    <p className="text-sm text-gray-400">{message.createdAt}</p>
                  </div>
                ))}
              </div>

              {/* 메시지 작성 버튼 */}
              <button 
                onClick={() => setShowMessageForm(true)}
                className="w-full bg-[#AFC18B] text-white h-12 mt-8 rounded-lg hover:bg-[#9BAF77] transition-colors"
              >
                메시지 남기기
              </button>

              {/* 메시지 작성 모달 */}
              {showMessageForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h3 className="text-xl font-medium mb-4">축하 메시지 작성</h3>
                    <form onSubmit={handleSubmitMessage} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          이름
                        </label>
                        <input
                          type="text"
                          value={newMessage.name}
                          onChange={e => setNewMessage(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full border rounded-lg p-2"
                          maxLength={10}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          메시지
                        </label>
                        <textarea
                          value={newMessage.content}
                          onChange={e => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full border rounded-lg p-2 h-32"
                          maxLength={200}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          비밀번호
                        </label>
                        <input
                          type="password"
                          value={newMessage.password}
                          onChange={e => setNewMessage(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full border rounded-lg p-2"
                          maxLength={4}
                          required
                        />
                      </div>
                      <div className="flex gap-2 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowMessageForm(false)}
                          className="flex-1 h-12 rounded-lg bg-gray-200 text-gray-600"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="flex-1 h-12 rounded-lg bg-[#AFC18B] text-white"
                        >
                          작성완료
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* 하단 고정 버튼 */}
          <div className="sticky bottom-0 left-0 right-0 w-full bg-white border-t md:relative md:border-none md:mt-8">
            <div className="max-w-[430px] mx-auto py-4 px-6 space-y-3">
              <button 
                onClick={shareKakao}
                className="w-full h-12 rounded-xl bg-[#FEE500] text-[#392020] flex items-center justify-center gap-2 font-medium hover:bg-[#FEE500]/90 transition-colors"
              >
                카카오톡으로 공유하기
              </button>
              <button 
                onClick={copyUrl}
                className="w-full h-12 rounded-xl bg-[#F5F5F5] text-[#392020] flex items-center justify-center gap-2 font-medium hover:bg-[#F5F5F5]/90 transition-colors"
              >
                청첩장 주소 복사하기
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
