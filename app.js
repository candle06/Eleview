    const firebaseConfig = {
    apiKey: "AIzaSyApdyHj-1DiEsOG7XZ6zmDLIEwtLJZ70Js",
    authDomain: "elev-5374e.firebaseapp.com",
    databaseURL: "https://elev-5374e-default-rtdb.firebaseio.com",
    projectId: "elev-5374e",
    storageBucket: "elev-5374e.firebasestorage.app",
    messagingSenderId: "265381396625",
    appId: "1:265381396625:web:5a3db379ef4a038ee43f30",
    measurementId: "G-6XPKDKFE9V"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const visitorRef = db.ref('visitors');
  const visitorId = Date.now() + '_' + Math.floor(Math.random() * 1000);
  function updateVisitor(){ visitorRef.child(visitorId).set({ lastActive: Date.now() }); }
  updateVisitor(); setInterval(updateVisitor, 5000);
  visitorRef.on('value', snapshot => {
    const now = Date.now();
    let count = 0;
    snapshot.forEach(child => { if(now - child.val().lastActive < 15000) count++; });
    document.getElementById('visitorCount').textContent = `접속자: ${count}명`;
  });
// ====== 저장된 커스텀 불러오기 ======
window.addEventListener("DOMContentLoaded", () => {
  // 이미지 먼저 적용
    const savedImg = localStorage.getItem("bgImage");
    if (savedImg) {
        document.body.style.background = `url(${savedImg}) center/cover no-repeat`;
        return; // 이미지 있으면 여기서 끝
    }

    // 그라데이션 불러오기
    const savedBg = localStorage.getItem("eleview_custom_bg");
    if (savedBg) {
        const bg = JSON.parse(savedBg);
        document.body.style.background =
          `linear-gradient(${bg.angle}deg, ${bg.start}, ${bg.end})`;

        document.getElementById("bgStartColor").value = bg.start;
        document.getElementById("bgEndColor").value = bg.end;
        document.getElementById("bgAngle").value = bg.angle;
    }

  // 글씨색
  const savedTextColor = localStorage.getItem("textColor");
  if (savedTextColor) {
    document.body.style.color = savedTextColor;
    document.getElementById('textColorPicker').value = savedTextColor;
  }
});

document.getElementById("bgStartColor").addEventListener("change", applyCustomGradient);
document.getElementById("bgEndColor").addEventListener("change", applyCustomGradient);
document.getElementById("bgAngle").addEventListener("input", applyCustomGradient);
function saveGradientSettings() {
    const start = document.getElementById("bgStartColor").value;
    const end = document.getElementById("bgEndColor").value;
    const angle = document.getElementById("bgAngle").value;

    const data = { start, end, angle };
    localStorage.setItem("eleview_custom_bg", JSON.stringify(data));
}
function applyCustomGradient() {
    const start = document.getElementById("bgStartColor").value;
    const end = document.getElementById("bgEndColor").value;
    const angle = document.getElementById("bgAngle").value;

    document.body.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;

    saveGradientSettings(); // ← 저장 추가
}
  // ==== 햄버거 메뉴 ====
  const menuBtn = document.getElementById('menuBtn');
  const menuPanel = document.getElementById('menuPanel');
  const customBtnMenu = document.getElementById('customBtnMenu');
  menuBtn.addEventListener('click', ()=>{ menuPanel.style.display = menuPanel.style.display === 'flex' ? 'none' : 'flex'; });
  customBtnMenu.addEventListener('click', ()=>{ document.getElementById('customModal').style.display='flex'; menuPanel.style.display='none'; });
  window.addEventListener('click', (e)=>{ if(!menuPanel.contains(e.target) && e.target!==menuBtn) menuPanel.style.display='none'; });
const ADMIN_EMAIL = "candle0627@gmail.com"; // 🔧 원하는 관리자 이메일로 변경

setTimeout(() => {
  const intro = document.getElementById("intro");
  if (intro) intro.style.display = "none";
}, 5000);
// =========================
// 📢 공지 팝업 기능 (최종버전)
// =========================

// 오늘 날짜 YYYY-MM-DD
function todayDate(){
  return new Date().toISOString().split("T")[0];
}

// 오늘 숨기기 저장 (공지 내용도 같이 저장)
function hideNoticeForToday(msg){
  localStorage.setItem("hideNoticeDate", todayDate());
  localStorage.setItem("hideNoticeMsg", msg);
}

// 오늘 숨기기 여부 확인
// 👉 날짜도 같고, 공지 내용도 같아야 숨김 유지
function isHiddenToday(currentMsg){
  const savedDate = localStorage.getItem("hideNoticeDate");
  const savedMsg = localStorage.getItem("hideNoticeMsg");

  return (savedDate === todayDate() && savedMsg === currentMsg);
}

// 공지 표시 함수
function showNotice(msg){
  if(!msg) return;

  // "오늘 하루 보지 않기"가 활성화되었는지 체크
  if(isHiddenToday(msg)) return;

  document.getElementById("noticeContent").textContent = msg;
  document.getElementById("noticeModal").style.display = "flex";
}

// ================================
// 📌 공지 모달 버튼 이벤트
// ================================

// 닫기 버튼
document.getElementById("closeNoticeBtn").addEventListener("click", ()=>{
  document.getElementById("noticeModal").style.display = "none";
});

// 오늘 하루 안보기 버튼
document.getElementById("hideTodayBtn").addEventListener("click", ()=>{
  const msg = document.getElementById("noticeContent").textContent.trim();
  hideNoticeForToday(msg);
  document.getElementById("noticeModal").style.display = "none";
});

// ================================
// 📡 Firebase 공지 자동 표시
// ================================
db.ref("notice/message").on("value", snap=>{
  const msg = snap.val();
  if(msg){
    showNotice(msg);
  }
});
document.getElementById("bgStartColor").addEventListener("change", applyCustomGradient);
document.getElementById("bgEndColor").addEventListener("change", applyCustomGradient);
document.getElementById("bgAngle").addEventListener("input", applyCustomGradient);
// 로그인 감지
firebase.auth().onAuthStateChanged((user)=>{
  const menuPanel = document.getElementById('menuPanel');

  // 기존 관리자/리뷰 버튼 삭제 후 재생성
  const oldAdmin = document.getElementById('adminBtn');
  const oldReview = document.getElementById('reviewBtn');
  if(oldAdmin) oldAdmin.remove();
  if(oldReview) oldReview.remove();

  if(user){
    // ⭐ 일반 유저용: 리뷰 작성
    const reviewBtn = document.createElement('button');
    reviewBtn.id = "reviewBtn";
    reviewBtn.textContent = "✏️ 리뷰 작성";
    reviewBtn.style.cssText = "padding:6px 0; font-weight:600; border-radius:8px; border:2px solid #66ff99; color:#66ff99; background:none; width:100%;";
    reviewBtn.onclick = ()=>{
      document.getElementById('reviewModal').style.display = 'flex';
    };
    menuPanel.appendChild(reviewBtn);

// 🔧 관리자 전용 메뉴 버튼
if (user && user.email === ADMIN_EMAIL) {
  const adminBtn = document.createElement('button');
  adminBtn.id = "adminBtn";
  adminBtn.textContent = "🔧 관리자 메뉴";
  adminBtn.style.cssText =
    "padding:6px 0; font-weight:600; border-radius:8px;" +
    "border:2px solid #ff4444; color:#ff4444;" +
    "background:none; width:100%;";

  adminBtn.onclick = () => {
    document.getElementById('adminModal').style.display = 'flex';
  };

  menuPanel.appendChild(adminBtn);
}

  }
});

function formatDate(dateString) {
  if (!dateString || dateString.length !== 8) return dateString;
  return `${dateString.slice(0,4)}.${dateString.slice(4,6)}.${dateString.slice(6,8)}`;
}
// 🔥 YYYY-MM-DD → YYYY.MM.DD
function formatDateDash(dateString) {
  if (!dateString) return dateString;
  return dateString.replace(/-/g, ".");
}
function formatElevatorNo(no) {
  if (!no) return no;
  if (no.length === 7) {
    return no.slice(0,4) + "-" + no.slice(4);
  }
  return no; // 다른 경우 그대로
}

// ===========================
// 리뷰 데이터 저장 (Firebase)
// ===========================
function saveReview() {
  const content = document.getElementById("reviewText").value.trim();
  const user = firebase.auth().currentUser;

  if (!user) return alert("로그인 후 작성하세요.");
  if (!content) return alert("리뷰를 입력하세요.");

  // 날짜 문자열 생성
  const now = new Date();
  const formatted = now.getFullYear() + "-" +
                    String(now.getMonth()+1).padStart(2,"0") + "-" +
                    String(now.getDate()).padStart(2,"0") + " " +
                    String(now.getHours()).padStart(2,"0") + ":" +
                    String(now.getMinutes()).padStart(2,"0");

  const ref = db.ref("reviews").push();
  ref.set({
    uid: user.uid,
    email: user.email,
    content: content,
    time: Date.now(),      // 최신순 정렬용
    dateString: formatted  // 화면에 표시용
  }).then(() => {
    alert("리뷰가 저장되었습니다!");
    document.getElementById("reviewModal").style.display = "none";
    document.getElementById("reviewText").value = "";
  });
}

// ===========================
// 관리자용 리뷰 목록 로드
// ===========================
function deleteReview(key){
  if(!confirm("정말 삭제하시겠습니까?")) return;
  db.ref('reviews/'+key).remove().then(()=>{
    loadAllReviews();
  });
}

function loadAllReviews() {
  const box = document.getElementById("reviewListBox");
  box.innerHTML = "불러오는 중...";

  db.ref("reviews").once("value", snap => {
    if (!snap.exists()) {
      box.innerHTML = "리뷰 없음";
      return;
    }

    let arr = [];
    snap.forEach(item => {
      arr.push({ key: item.key, ...item.val() });
    });

    // 🔥 최신순 정렬
    arr.sort((a, b) => b.time - a.time);

    let html = "";
    arr.forEach(v => {
      html += `
        <div style="
          padding:14px;
          border-radius:12px;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,88,88,0.25);
          margin-bottom:10px;">
          
          <div><strong>👤 작성자:</strong> ${v.email}</div>
          <div><strong>🕒 작성일:</strong> ${v.dateString}</div>

          <div style="margin-top:6px; white-space:pre-line;">
            <strong>📝 내용:</strong><br>${v.content}
          </div>

          <button onclick="deleteReview('${v.key}')"
            style="
              margin-top:10px; padding:6px 0;
              background:#ff4444; border:none;
              border-radius:8px; width:100%;
              color:white; font-weight:600;">
            삭제
          </button>
        </div>
      `;
    });
    box.innerHTML = html;
  });
}
const openSearchLogBtn = document.getElementById("openSearchLogBtn");
const searchLogModal = document.getElementById("searchLogModal");
const closeSearchLogBtn = document.getElementById("closeSearchLogBtn");
const searchLogList = document.getElementById("searchLogList");

// 모달 열기
openSearchLogBtn.addEventListener("click", () => {
  adminModal.style.display = "none";
  searchLogModal.style.display = "flex";
  loadSearchLogs();
});

// 모달 닫기
closeSearchLogBtn.addEventListener("click", () => {
  searchLogModal.style.display = "none";
});

// 모달 바깥 클릭 닫기
window.addEventListener("click", (e) => {
  if (e.target === searchLogModal) searchLogModal.style.display = "none";
});

// ========= 🔍 검색 기록 로딩 =========
function loadSearchLogs() {
  searchLogList.innerHTML = "불러오는 중...";

  db.ref("searchLogs").once("value", snap => {
    if (!snap.exists()) {
      searchLogList.innerHTML = "<p>검색 기록 없음</p>";
      return;
    }

    let arr = [];
    snap.forEach(item => {
      arr.push({ key: item.key, ...item.val() });
    });

    // 최신순 정렬
    arr.sort((a, b) => b.timestamp - a.timestamp);

    searchLogList.innerHTML = arr.map(v => {

  const time = new Date(v.timestamp);
  const dateString =
    `${time.getFullYear()}-${String(time.getMonth()+1).padStart(2,'0')}-${String(time.getDate()).padStart(2,'0')} ` +
    `${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}`;

  return `
    <div style="
      padding:12px; background:rgba(255,255,255,0.06);
      border-radius:10px; border:1px solid rgba(255,255,255,0.15);
    ">
      <p><strong>검색어:</strong> ${v.query}</p>
      <p><strong>검색 종류:</strong> ${v.type}</p>
      <p><strong>검색한 사용자:</strong> ${v.user || "비로그인"}</p>
      <p><strong>시간:</strong> ${dateString}</p>
    </div>
  `;
}).join('');

  });
}
function formatDateTime(ts) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm}`;
}

  // ==== 검색 & API & 결과 ====
  const inputNo=document.getElementById('elevatorNo');
  const inputAddr=document.getElementById('buldAddress');
  const btn=document.getElementById('searchBtn');
  const list=document.getElementById('result-list');
  const favModal = document.getElementById('favModal');
  const favList = document.getElementById('favList');
  const viewFavsBtn = document.getElementById('viewFavsBtn'); // 모달 열기 버튼
  const closeFavBtn = document.getElementById('closeFavBtn'); // 모달 닫기 버튼
  const serviceKey='6a8c61a1b9e03198dc42d9460e8bf434e703bc3d0989512930046a21a68e1432';
  const API_OPERATION='https://apis.data.go.kr/B553664/ElevatorOperationService/getOperationInfoListV1';
  const API_VIEW='https://apis.data.go.kr/B553664/ElevatorInformationService/getElevatorViewM';
  const API_HISTORY='https://apis.data.go.kr/B553664/ElevatorInformationService/getElvtrInspctInqireM';
// ========== 엔터 키로 검색 ==========
inputNo.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    btn.click();
  }
});

inputAddr.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    btn.click();
  }
});

btn.addEventListener('click', async ()=>{

  const query = inputNo.value.trim();          // 승강기 번호
  const addrValue = inputAddr.value.trim();    // 주소

  // 검색 로그
  function saveSearchLog(q, type, address = "") {
    const user = firebase.auth().currentUser;
    const userEmail = user ? user.email : "비로그인";

    db.ref("searchLogs").push({
      query: q || "",
      type: type || "",
      addressValue: address || "없음",
      user: userEmail,
      timestamp: Date.now()
    });
  }

  if (query) saveSearchLog(query, "elevatorNo", addrValue);
  if (addrValue) saveSearchLog(addrValue, "address", query);

  // 입력값 없음
  if (!query && !addrValue) {
    list.innerHTML = '<p>승강기 번호 또는 주소를 입력해주세요.</p>';
    return;
  }

  list.innerHTML = "";

  try {

    // ===============================
    // ⭐ 기본 OperationService 검색
    // ===============================
    const params = new URLSearchParams({
      serviceKey,
      pageNo: "1",
      numOfRows: "25"
    });

    if (query) params.append("elevator_no", query);
    if (addrValue) params.append("buld_address", addrValue);

    const res = await fetch(`${API_OPERATION}?${params.toString()}`);
    const xmlText = await res.text();
    const xml = new DOMParser().parseFromString(xmlText,"text/xml");

    let items = Array.from(xml.getElementsByTagName("item"));

    // 결과 없음
    if (items.length === 0) {
      list.innerHTML = '<p>검색 결과가 없습니다.</p>';
      return;
    }

// ===============================
// ⭐ Firebase 자동 백업 저장 함수
// ===============================
async function saveBackup(elevatorNo, basic, history) {
  try {
    await db.ref("backup/" + elevatorNo).set({
      basic,
      history,
      savedAt: Date.now()
    });
    console.log(`🔥 백업 저장 완료 → ${elevatorNo}`);
  } catch (e) {
    console.warn("백업 저장 실패:", e);
  }
}

// ===============================
// ⭐ 결과 카드 생성 + 백업 저장
// ===============================
for (const item of items) {

  const get = (t)=> item.getElementsByTagName(t)[0]?.textContent || '';
  const elevatorNo = get("elevatorNo");
  const kind = get("elvtrKindNm");

  // ===========================
  // 📌 View API
  // ===========================
  const viewUrl = `${API_VIEW}?serviceKey=${serviceKey}&elevator_no=${elevatorNo}`;
  const viewRes = await fetch(viewUrl);
  const viewXml = await viewRes.text();
  const viewDoc = new DOMParser().parseFromString(viewXml,"text/xml");
  const viewItem = viewDoc.getElementsByTagName("item")[0];
  const v = (t)=> viewItem?.getElementsByTagName(t)[0]?.textContent || '';

  // ===========================
  // 📌 History API
  // ===========================
  const historyUrl = `${API_HISTORY}?serviceKey=${serviceKey}&elevator_no=${elevatorNo}`;
  const hisRes = await fetch(historyUrl);
  const hisXml = await hisRes.text();
  const hisDoc = new DOMParser().parseFromString(hisXml,"text/xml");
  const historyItems = Array.from(hisDoc.getElementsByTagName("item"));

  // 가장 최근 검사일
  let latestHistoryDate = "정보 없음";
  if (historyItems.length > 0) {
    const parsed = historyItems.map(h =>
      h.getElementsByTagName("inspctDt")[0]?.textContent || ""
    );
    parsed.sort((a,b)=>b.localeCompare(a));
    latestHistoryDate = formatDate(parsed[0]);
  }

  // ===========================
  // 📌 기본 스펙 계산
  // ===========================
  const shuttleFloor = get("shuttleFloorCnt") || v("shuttleFloorCnt") || 'N/A';
  const speed = get("ratedSpeed") || v("ratedSpeed");
  const speedMMin = speed ? (parseFloat(speed) * 60).toFixed(1) : 'N/A';
  const liveLoad = get("liveLoad") || v("liveLoad");
  const liveLoadDisplay = liveLoad ? `${liveLoad} kg` : 'N/A';

  // ===========================
  // 📌 Firebase 자동 백업 저장
  // ===========================
  const basicData = {
    buldNm: get("buldNm") || v("buldNm"),
    address1: get("address1"),
    address2: get("address2"),
    mnfcturCpnyNm: get("mnfcturCpnyNm"),
    elvtrModel: get("elvtrModel"),
    elvtrForm: get("elvtrForm"),
    elvtrDetailForm: get("elvtrDetailForm"),
    frstInstallationDe: get("frstInstallationDe"),
    installationDe: get("installationDe"),
    elvtrSttsNm: get("elvtrSttsNm"),
    liveLoad: get("liveLoad") || v("liveLoad"),
    ratedSpeed: get("ratedSpeed") || v("ratedSpeed"),
    shuttleFloorCnt: shuttleFloor,
    applcBeDt: get("applcBeDt"),
    applcEnDt: get("applcEnDt"),
  };

  const historyData = historyItems.map(h => {
    const hget = (t)=> h.getElementsByTagName(t)[0]?.textContent || "";
    return {
      inspctDt: hget("inspctDt"),
      inspctInsttNm: hget("inspctInsttNm"),
      inspctKind: hget("inspctKind"),
      psexamYn: hget("psexamYn")
    };
  });

  // 🔥 저장 실행
  saveBackup(elevatorNo, basicData, historyData);

  // ===========================
  // 📌 카드 UI 렌더링
  // ===========================
  const div = document.createElement('div');
  div.className = 'card';

  const stts = get("elvtrSttsNm");
  if (stts.includes("운행중지")) div.classList.add("stopped");

  div.innerHTML = `
    <div class="card-header">
      <h3>${get("buldNm") || v("buldNm")}</h3>
      <div class="sub">${formatElevatorNo(elevatorNo)} • ${get("elvtrDiv")} • ${kind}</div>
    </div>

    <div class="simple-info clean">
      <div class="section-title">기본 정보</div>
      <p>제조업체 : <strong>${get("mnfcturCpnyNm")}</strong></p>
      <p>모델명 : <strong>${get("elvtrModel")}</strong></p>
      <p>구동형식 : <strong>${get("elvtrForm")} / ${get("elvtrDetailForm")}</strong></p>
      <p>최초설치일자 : <strong>${formatDate(get("frstInstallationDe"))}</strong></p>
      <p>최근설치일자 : <strong>${formatDate(get("installationDe"))}</strong></p>
      <p>승강기 상태 : <strong>${get("elvtrSttsNm")}</strong></p>

      <div class="section-title">성능 및 스펙 정보</div>
      <p>정격속력 : <strong>${speedMMin} m/min</strong></p>
      <p>적재하중 : <strong>${liveLoadDisplay}</strong></p>
      <p>최대정원 : <strong>${get("ratedCap")}</strong></p>
      <p>운행층수 : <strong>${shuttleFloor}층</strong></p>

      <div class="section-title">설치 정보</div>
      <p>설치 장소 : <strong>${get("installationPlace")}</strong></p>
      <p>설치 호기 : <strong>${get("elvtrAsignNo")}</strong></p>
      <p>주소 : <strong>${get("address1")} / ${get("address2")}</strong></p>

      <div class="section-title">관리 및 유지보수 정보</div>
      <p>보수업체 : <strong>${get("companyNm")}</strong></p>
      <p>관리기관 : <strong>${get("inspctInsttNm")}</strong></p>
      <p>최종 검사일 : <strong>${formatDateDash(latestHistoryDate)}</strong></p>
      <p>운행 유효기간 : <strong>${formatDate(get("applcBeDt"))} ~ ${formatDate(get("applcEnDt"))}</strong></p>

      <div class="btn-row-simple">
        <button class="btn bottom-btn fav-btn" data-elevator='${elevatorNo}'>⭐ 즐겨찾기</button>
        <button class="btn bottom-btn view-history-btn"
          data-history='${encodeURIComponent(JSON.stringify(historyData))}'>
          📌 검사이력 보기
        </button>
      </div>
    </div>
  `;

  list.appendChild(div);

  // 즐겨찾기 적용
  const favBtn = div.querySelector(".fav-btn");
  const favs = getFavorites();
  if (favs.some(f=>f.elevatorNo===elevatorNo)) favBtn.textContent = "★";
}


  }catch (err) {
  console.warn("🚨 API 장애 → 비상백업 로딩");

  const fbSnap = await db.ref("backup/" + query).once("value");

  if (!fbSnap.exists()) {
      list.innerHTML = "<p>API 장애 + 백업 없음</p>";
      return;
  }

  const fb = fbSnap.val();

  // 1) 기본정보 페이크 item 객체
  items = [{
    getElementsByTagName: (tag) => [{
      textContent: fb.basic[tag] || ""
    }],
    address1: fb.basic.address1,
    address2: fb.basic.address2
  }];

  // 2) 검사이력 historyItems 덮어쓰기
  historyItems = fb.history.map(h=>{
    return {
      getElementsByTagName: (tag)=>[{ textContent: h[tag] }]
    };
  });

  console.log("🔥 백업데이터로 모두 재구성 완료");
}}
);


  // ==== 검사이력 모달 ====
  document.addEventListener('click', e=>{
    if(e.target.classList.contains('view-history-btn')){
        const data=JSON.parse(decodeURIComponent(e.target.dataset.history));
        const content=document.getElementById('historyContent');
        content.innerHTML = data.map(h=>{ 
        const exam=h.psexamYn;
        let bgColor='rgba(255,255,255,0.05)';
        if(exam.includes('불합격')) bgColor='rgba(255,0,0,0.4)';
        else if(exam.includes('조건부합격')) bgColor='rgba(255,255,0,0.4)';
        else if(exam.includes('합격')) bgColor='rgba(0,255,0,0.3)';
        else if(exam.includes('보완') || exam.includes('차기안전검사')) bgColor='rgba(255,165,0,0.4)';
        return `<div style="margin:4px 0; padding:6px; background:${bgColor}; border-radius:6px;">
          <strong>검사일자:</strong> ${h.inspctDt}<br>
          <strong>검사기관:</strong> ${h.inspctInsttNm}<br>
          <strong>검사종류:</strong> ${h.inspctKind}<br>
          <strong>합격여부:</strong> ${h.psexamYn}
        </div>`;
      }).join('');
        document.getElementById('historyModal').style.display='flex';
    }
})
  document.getElementById('closeHistoryBtn').addEventListener('click', ()=>{ document.getElementById('historyModal').style.display='none'; });

// ===============================
// Firebase Auth
// ===============================
const auth = firebase.auth();
const favCloudRef = (uid) => db.ref("favorites/" + uid);

// 글씨 색 적용
const textColorPicker = document.getElementById('textColorPicker');
const applyTextColorBtn = document.getElementById('applyTextColorBtn');

// 저장된 값 적용 (초기 로드)
document.addEventListener('DOMContentLoaded', () => {
  const elevatorNoInput = document.getElementById('elevatorNo');

elevatorNoInput.addEventListener('input', () => {
  elevatorNoInput.value = elevatorNoInput.value.replace(/[^0-9]/g, '');
});
  const savedTextColor = localStorage.getItem('textColor');
  if (savedTextColor) {
    document.body.style.color = savedTextColor;
    textColorPicker.value = savedTextColor;
  }
});

// 버튼 클릭 시 글씨 색 변경
applyTextColorBtn.addEventListener('click', () => {
  const selectedColor = textColorPicker.value;
  document.body.style.color = selectedColor;
  localStorage.setItem('textColor', selectedColor);
});

// 로그인 모달 요소
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const loginDoBtn = document.getElementById("loginDoBtn");
const signupDoBtn = document.getElementById("signupDoBtn");
const closeLoginModal = document.getElementById("closeLoginModal");

// 로그인 버튼 클릭 → 모달 열기
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

// 모달 닫기
closeLoginModal.addEventListener("click", () => {
  loginModal.style.display = "none";
});

// ===============================
// 회원가입
// ===============================
signupDoBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const pw = document.getElementById("loginPw").value.trim();

  auth.createUserWithEmailAndPassword(email, pw)
    .then(() => {
      alert("회원가입 완료! 자동 로그인됩니다.");
    })
    .catch(err => alert(err.message));
});

// ===============================
// 로그인
// ===============================
loginDoBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const pw = document.getElementById("loginPw").value.trim();

  auth.signInWithEmailAndPassword(email, pw)
    .then(() => {
      loginModal.style.display = "none";
    })
    .catch(err => alert(err.message));
});

// ===============================
// 자동 로그인 감지 + 즐겨찾기 동기화
// ===============================
auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log("로그인됨:", user.email);

    // 로그인 버튼 → 로그아웃 버튼으로 변경
    loginBtn.textContent = "🚪 로그아웃";
    loginBtn.style.borderColor = "#ff4444";
    loginBtn.style.color = "#ff4444";

    loginBtn.onclick = () => {
      auth.signOut();
    };

    // 🔥 서버의 즐겨찾기 가져오기
    const snap = await favCloudRef(user.uid).once("value");
    let cloudFavs = snap.val() || [];

    // 🔧 데이터 정리
    cloudFavs = cloudFavs.map(f => {
      if (typeof f === "string") return { elevatorNo: f, buldNm: "" };
      return f;
    });

    // 🚫 병합은 이제 필요 없음
    // let merged = [...localFavs, ...normalizedCloud];
    // merged = merged.filter(...)

    // 🔥 서버 데이터 그대로 로컬 저장
    saveFavorites(cloudFavs);

    // UI 업데이트
    renderFavorites();
    updateCardStars();

  } else {
    console.log("로그아웃됨");

    loginBtn.textContent = "🔐 로그인";
    loginBtn.style.borderColor = "#4da3ff";
    loginBtn.style.color = "#4da3ff";

    loginBtn.onclick = () => {
      loginModal.style.display = 'flex';
    };
  }
});


  // ==== 파티클 ====
  const c=document.getElementById('particle-wrap'); const ctx=c.getContext('2d'); let w,h;
  function resize(){ w=c.width=innerWidth; h=c.height=innerHeight; } addEventListener('resize',resize); resize();
  let p=[]; function initParticles(count=80,color='#9b5cff'){ p.length=0; for(let i=0;i<count;i++) p.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,s:Math.random()*2+1,color:color}); }
  function draw(){ ctx.clearRect(0,0,w,h); for(const a of p){ a.x+=a.vx; a.y+=a.vy; if(a.x<0)a.x=w;if(a.x>w)a.x=0;if(a.y<0)a.y=h;if(a.y>h)a.y=0; const g=ctx.createRadialGradient(a.x,a.y,0,a.x,a.y,10); g.addColorStop(0,a.color); g.addColorStop(1,'transparent'); ctx.fillStyle = "rgba(150, 200, 255, 0.85)"; ctx.beginPath(); ctx.arc(a.x,a.y,a.s,0,Math.PI*2); ctx.fill(); } requestAnimationFrame(draw);}
  draw();

  // ==== 커스터마이징 모달 ====
  const customModal=document.getElementById('customModal');
  const closeModal=document.getElementById('closeModal');
  const applyBtn=document.getElementById('applyBtn');
  const bgImageInput=document.getElementById('bgImage');
  const particleColorInput=document.getElementById('particleColor');
  const particleCountInput=document.getElementById('particleCount');
  const searchTextInput=document.getElementById('searchText');
  const searchColorInput=document.getElementById('searchColor');
function applyCustomGradient() {
    const start = document.getElementById("bgStartColor").value;
    const end = document.getElementById("bgEndColor").value;
    const angle = document.getElementById("bgAngle").value;

    document.body.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;
}
  closeModal.addEventListener('click', ()=>customModal.style.display='none');

  window.addEventListener('load', ()=>{
    const particleColor=localStorage.getItem('particleColor');
    const particleCount=localStorage.getItem('particleCount');
    const searchText=localStorage.getItem('searchText');
    const searchColor=localStorage.getItem('searchColor');
    if(bgImage) document.body.style.background=`url(${bgImage}) center/cover no-repeat`;
    else if(bgColor) document.body.style.background=bgColor;
    initParticles(particleCount?parseInt(particleCount):80, particleColor||'#9b5cff');
    if(searchText) btn.textContent=searchText;
    if(searchColor) btn.style.background=`linear-gradient(180deg, ${searchColor} 0%, ${searchColor} 100%)`;
  });

// 후원 모달
const donateBtn = document.getElementById('donateBtn');
const donateModal = document.getElementById('donateModal');
const closeDonateModal = document.getElementById('closeDonateModal');

donateBtn.addEventListener('click', () => {
  donateModal.style.display = 'flex';
});

closeDonateModal.addEventListener('click', () => {
  donateModal.style.display = 'none';
});

// 모달 바깥 클릭 시 닫기
window.addEventListener('click', (e) => {
  if(e.target === donateModal) donateModal.style.display = 'none';
});

  applyBtn.addEventListener('click', ()=>{
    const file=bgImageInput.files[0];
    if(file){
      const reader=new FileReader();
      reader.onload=function(e){
        document.body.style.background=`url(${e.target.result}) center/cover no-repeat`;
        localStorage.setItem('bgImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }else{
      localStorage.removeItem('bgImage');
    }
    const pCount=parseInt(particleCountInput.value);
    const pColor=particleColorInput.value;
    initParticles(pCount,pColor);
    localStorage.setItem('particleCount',pCount);
    localStorage.setItem('particleColor',pColor);
    const sColor=searchColorInput.value;
    btn.style.background=`linear-gradient(180deg, ${sColor} 0%, ${sColor} 100%)`;
    localStorage.setItem('searchColor',sColor);
    customModal.style.display='none';
  });

// ================================
// 검색/조회 캐시
// ================================
function getCache(key) {
  return JSON.parse(localStorage.getItem(key) || 'null');
}

function setCache(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ================================
// 하루 단위 캐시 초기화
// ================================
function resetDailyCache() {
  const lastReset = localStorage.getItem('lastResetDate');
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if (lastReset !== today) {
    // 검색/조회 관련 캐시만 삭제
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('search_') || key.startsWith('history_')) {
        localStorage.removeItem(key);
      }
    });
    localStorage.setItem('lastResetDate', today);
    console.log('하루 캐시 초기화 완료!');
  }
}

// ================================
// 즐겨찾기 관련 함수
// ================================

document.addEventListener('DOMContentLoaded', () => {
  const viewFavsBtn = document.getElementById('viewFavsBtn');
  const favModal = document.getElementById('favModal');
  const closeFavModal = document.getElementById('closeFavModal');
  const favList = document.getElementById('favList');

  // 즐겨찾기 모달 열기
  viewFavsBtn.addEventListener('click', () => {
    favModal.style.display = 'flex';
    renderFavorites();
  });

  // 즐겨찾기 모달 닫기
  closeFavModal.addEventListener('click', () => {
    favModal.style.display = 'none';
  });

  // 카드 즐겨찾기 + 모달 삭제 버튼 이벤트 위임
  document.addEventListener('click', (e) => {

    // 카드 별표 클릭
    if (e.target.classList.contains('fav-btn')) {
      const card = e.target.closest('.card');
      if (!card) return;

      const elevatorNo = e.target.dataset.elevator;
      const buldNm = card.querySelector('h3')?.textContent || '';
      
      let favs = getFavorites();
      const index = favs.findIndex(f => f.elevatorNo === elevatorNo);
      
      if (index === -1) {
        favs.push({ elevatorNo, buldNm });
      } else {
        favs.splice(index, 1);
      }
      saveFavorites(favs);
      renderFavorites();
      updateCardStars();
    }

    // 즐겨찾기 모달 내 삭제 버튼 클릭
    if (e.target.classList.contains('remove-fav-btn')) {
  e.stopPropagation();

  const parent = e.target.closest('.fav-item');
  const elevatorNo = parent.dataset.elevator;

  // 항상 최신 로컬 데이터 가져오기
  let favs = getFavorites();

  // 삭제
  favs = favs.filter(f => f.elevatorNo !== elevatorNo);

  // 로컬 저장
  saveFavorites(favs);

  // 서버 저장
  const user = firebase.auth().currentUser;
  if (user) {
    favCloudRef(user.uid).set(favs);
  }

  // UI 업데이트
  renderFavorites();
  updateCardStars();
}


  });

  // 즐겨찾기 클릭 -> 검색
  favList.querySelectorAll('.fav-name').forEach(el => {
    el.addEventListener('click', (e) => {
      const parent = el.closest('.fav-item');
      const elevatorNo = parent.dataset.elevator;
      if (elevatorNo) {
        inputNo.value = elevatorNo;
        favModal.style.display = 'none';
        searchBtn.click();
      }
    });
  });

  // 초기 로드 시 카드 별표 상태 적용
  updateCardStars();

});


// ================================
// 즐겨찾기 가져오기 / 저장
// ================================
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));

  // 로그인 상태면 클라우드에도 저장
  const user = firebase.auth().currentUser;
  if (user) {
    favCloudRef(user.uid).set(favs);
  }
}

// ================================
// 즐겨찾기 렌더링
// ================================
function renderFavorites(){
  const favs = getFavorites().filter(f=>f.elevatorNo||f.buldNm);

  if(favs.length===0){
    favList.innerHTML='<p>즐겨찾기 없음</p>';
    return;
  }

  favList.innerHTML = favs.map(f => {
  let text = f.buldNm || '';
  if (f.buldNm && f.elevatorNo) text += ` (${f.elevatorNo})`;
  else if (!f.buldNm && f.elevatorNo) text = f.elevatorNo;

  return `
    <div class="fav-item" data-elevator="${f.elevatorNo}" style="
         display:flex; 
         align-items:center; 
         padding:6px 8px; 
         background:rgba(255,215,0,0.1); 
         border-radius:6px; 
         margin-bottom:4px; 
         cursor:pointer;">
      <span class="fav-name"><strong>${text}</strong></span>
      <button class="remove-fav-btn" style="
         margin-left:auto;
         background:red; 
         border:none; 
         color:#fff; 
         border-radius:4px; 
         padding:2px 6px;">삭제</button>
    </div>
  `;
}).join('');

  // 즐겨찾기 클릭 -> 검색
  favList.querySelectorAll('.fav-name').forEach(el=>{
    el.addEventListener('click',()=>{
      const parent = el.closest('.fav-item');
      const elevatorNo = parent.dataset.elevator;
      if(elevatorNo){
        inputNo.value = elevatorNo;
        favModal.style.display='none';
        searchBtn.click();
      }
    });
  });

  // 삭제 버튼
  favList.querySelectorAll('.remove-fav-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      const parent = btn.closest('.fav-item');
      const elevatorNo = parent.dataset.elevator;
      let favs = getFavorites();
      favs = favs.filter(f=>f.elevatorNo!==elevatorNo);
      saveFavorites(favs);
      renderFavorites();
      updateCardStars();
    });
  });
}

// ================================
// 카드 별표 상태 업데이트
// ================================
function updateCardStars(){
  const favs = getFavorites();
  document.querySelectorAll('.card .fav-btn').forEach(btn=>{
    const elNo = btn.dataset.elevator;
    btn.textContent = favs.find(f=>f.elevatorNo===elNo)?'★':'☆';
  });
}

// ================================
// 즐겨찾기 모달 열기/닫기
// ================================
viewFavsBtn.addEventListener('click', ()=>{
  renderFavorites();
  favModal.style.display='flex';
});
closeFavModal.addEventListener('click', ()=>{ favModal.style.display='none'; });

// ================================
// 초기 로드
// ================================
updateCardStars();

// ================================
// 카드 별표 상태 업데이트
// ================================
function updateCardStars() {
  const favs = getFavorites();
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const elNo = btn.dataset.elevator;
    if (favs.find(f => f.elevatorNo === elNo)) {
      btn.textContent = '★'; // 즐겨찾기 있음
    } else {
      btn.textContent = '☆'; // 즐겨찾기 없음
    }
  });
}

// 모달 바깥 클릭 시 닫기
window.addEventListener('click', (e) => {
  if(e.target === donateModal) donateModal.style.display = 'none';
});

// 🔧 관리자 모달 요소
const adminModal = document.getElementById("adminModal");
const closeAdminModal = document.getElementById("closeAdminModal");
const saveNoticeBtn = document.getElementById("saveNoticeBtn");
const adminNoticeInput = document.getElementById("adminNoticeInput");
const openReviewList = document.getElementById("openReviewList");

// 모달 닫기
closeAdminModal.addEventListener("click", () => {
  adminModal.style.display = "none";
});

// 📢 공지 등록 처리
saveNoticeBtn.addEventListener("click", async () => {
  const msg = adminNoticeInput.value.trim();
  if (!msg) return alert("공지 내용을 입력하세요!");

  await db.ref("notice/message").set(msg);
  alert("공지 등록 완료!");
  adminModal.style.display = "none";
});

// 📝 리뷰 목록 열기
openReviewList.addEventListener("click", () => {
  adminModal.style.display = "none";
  document.getElementById("reviewListModal").style.display = "flex";
  loadAllReviews();
});

// 바깥 클릭 시 닫기
window.addEventListener("click", (e) => {
  if (e.target === adminModal) adminModal.style.display = "none";
});


// 바깥 클릭 닫기
window.addEventListener("click", (e)=>{
  if(e.target === searchLogModal){
    searchLogModal.style.display = "none";
  }
});

(function loadCustomGradient() {
    const saved = localStorage.getItem("eleview_custom_bg");
    if (!saved) return;

    const data = JSON.parse(saved);

    // 필드에 값 채우기
    document.getElementById("bgStartColor").value = data.start;
    document.getElementById("bgEndColor").value = data.end;
    document.getElementById("bgAngle").value = data.angle;

    // 배경 적용
    document.body.style.background = `linear-gradient(${data.angle}deg, ${data.start}, ${data.end})`;
})();
// ================================
// 초기화 및 렌더
// ================================
resetDailyCache();
renderFavorites();
updateCardStars();