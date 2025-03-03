"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function Page() {
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
          {/* 상단 이미지 섹션 - 전체 화면 높이로 설정 */}
          <div className="relative h-[100vh] md:h-auto">
            <img
              src="/images/j.png"
              alt="cover_image"
              className="w-full h-full object-cover"
            />
            {/* 이미지 위에 오버레이와 텍스트 */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end pb-20 px-6 text-white">
              <h1 className="text-center animate-fade-in">
                <div className="text-2xl font-light mb-4">구민재 · 손유나</div>
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
          <div className="px-6 py-16 space-y-16">
            {/* 인사말 */}
            <section className="text-center space-y-6">
              <h2 className="text-2xl">결혼합니다</h2>
              <p className="text-gray-600 leading-relaxed">
                서로를 비추는 빛이 되어<br/>
                같은 곳을 바라보며 걸어가겠습니다.<br/>
                저희 두 사람이 사랑으로 만나<br/>
                인생이라는 여행을 함께 떠나려 합니다.<br/>
                귀한 걸음 하시어 축복해 주시면<br/>
                더없는 기쁨으로 간직하겠습니다.
              </p>
            </section>

            {/* =============================
                2) 안내 메시지 섹션
               ============================= */}
            <div className="px-4 py-8 text-center">
              <strong className="block text-lg">결혼식에 초대합니다</strong>
              <p className="mt-4 leading-7">
                안내문
              </p>
            </div>

            {/* =============================
                3) 예식 날짜 / 달력 / 디데이 등
               ============================= */}
            <section className="bg-[#F8F8F8] -mx-6 py-16 px-6">
              <h2 className="text-4xl tracking-wider opacity-90 text-center">
                WEDDING DAY
              </h2>
              <p className="mt-4 text-pretty">2025년 11월 29일 토요일 | 오후 3시 40분</p>
              {/* 달력, D-Day, Countdown 등 필요시 추가 */}
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
            <section className="bg-white py-10 px-4">
              <h2 className="text-4xl tracking-wider opacity-90">
                GALLERY
              </h2>
              <div className="grid grid-cols-3 gap-[1.5px] mt-6">
                {/* 실제 이미지 목록 반복 */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/images/j.png"
                    alt="gallery-1"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/images/j.png"
                    alt="gallery-2"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/images/j.png"
                    alt="gallery-3"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* ... */}
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
              {/* 방명록 목록 (예시) */}
              <div className="mt-8 space-y-4">
                <div className="border rounded p-4 bg-white relative">
                  <p className="mb-3 break-all">
                  </p>
                  <p className="text-sm text-gray-500">
                  </p>
                </div>
                {/* ... 더 많은 메시지 ... */}
              </div>
              <button className="w-full bg-[#AFC18B] text-white h-12 mt-8 rounded-lg">
                메시지 남기기
              </button>
            </section>
          </div>

          {/* 하단 고정 버튼 */}
          <div className="fixed bottom-0 left-0 right-0 md:relative md:mt-8">
            <div className="max-w-[430px] mx-auto bg-white py-4 px-6 space-y-3 border-t md:border-none">
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
