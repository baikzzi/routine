// document.addEventListener("DOMContentLoaded", () => {
//   const modal = document.getElementById("modalWrap");
//   const btn = document.getElementById("popupBtn");
//   const closeBtn = document.getElementById("closeBtn");
//   const modalContent = document.getElementById("modalContent");
//   const devices = ["가습기", "냉장고", "세탁기", "에어컨"]; // 장치 이름을 한국어로 변경

//   // 토글 버튼 상태를 불러오고 적용하는 함수 (기존 저장된 토글 상태 유지)
//   const loadToggles = () => {
//     modalContent.innerHTML = ""; // 내용 초기화
//     devices.forEach((device, index) => {
//       const contentDiv = document.createElement("div");
//       contentDiv.classList.add("content");

//       const textSpan = document.createElement("span");
//       textSpan.textContent = device;

//       const toggleButton = document.createElement("div");
//       toggleButton.classList.add("toggle-button");
//       toggleButton.onclick = function () {
//         toggleDevice(index);
//       };

//       if (localStorage.getItem(`device${index}`) === "true") {
//         toggleButton.classList.add("active");
//       }

//       contentDiv.appendChild(textSpan);
//       contentDiv.appendChild(toggleButton);
//       modalContent.appendChild(contentDiv);
//     });
//   };

//   // 장치 상태를 토글하고 로컬 스토리지를 업데이트하는 함수 (토글 상태 저장)
//   const toggleDevice = (index) => {
//     const currentState = localStorage.getItem(`device${index}`) === "true";
//     localStorage.setItem(`device${index}`, `${!currentState}`);
//     loadToggles(); // 토글 버튼 상태를 업데이트
//   };

//   // 모달을 보여주는 이벤트 핸들러
//   btn.onclick = () => {
//     modal.style.display = "block";
//     loadToggles(); // 토글 버튼 상태 불러오기 및 적용
//   };

//   // 모달을 닫는 이벤트 핸들러
//   closeBtn.onclick = () => {
//     modal.style.display = "none";
//   };

//   // 모달 밖 클릭 시 모달 닫기
//   window.onclick = (event) => {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   };
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const modal = document.getElementById("modalWrap");
//   const btns = document.querySelectorAll(".popupBtn"); // 클래스 선택자 사용
//   const closeBtn = document.getElementById("closeBtn");
//   const modalContent = document.getElementById("modalContent");
//   const devices = ["가습기", "냉장고", "세탁기", "에어컨"];

//   const loadToggles = () => {
//     modalContent.innerHTML = "";
//     devices.forEach((device, index) => {
//       const contentDiv = document.createElement("div");
//       contentDiv.classList.add("content");

//       const textSpan = document.createElement("span");
//       textSpan.textContent = device;

//       const toggleButton = document.createElement("div");
//       toggleButton.classList.add("toggle-button");
//       toggleButton.onclick = function () {
//         toggleDevice(index);
//       };

//       if (localStorage.getItem(`device${index}`) === "true") {
//         toggleButton.classList.add("active");
//       }

//       contentDiv.appendChild(textSpan);
//       contentDiv.appendChild(toggleButton);
//       modalContent.appendChild(contentDiv);
//     });
//   };

//   const toggleDevice = (index) => {
//     const currentState = localStorage.getItem(`device${index}`) === "true";
//     localStorage.setItem(`device${index}`, `${!currentState}`);
//     loadToggles();
//   };

//   // 각 버튼에 대해 이벤트 리스너 추가
//   btns.forEach((btn) => {
//     btn.onclick = () => {
//       modal.style.display = "block";
//       loadToggles();
//     };
//   });

//   closeBtn.onclick = () => {
//     modal.style.display = "none";
//   };

//   window.onclick = (event) => {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   };
// });

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalWrap");
  const btns = document.querySelectorAll(".popupBtn"); // 클래스 선택자 사용
  const closeBtn = document.getElementById("closeBtn");
  const modalContent = document.getElementById("modalContent");
  const devices = ["가습기", "냉장고", "세탁기", "에어컨"];
  let currentDeviceIndex = 0; // 현재 활성화된 디바이스 인덱스

  const loadToggles = () => {
    modalContent.innerHTML = "";
    devices.forEach((device, index) => {
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("content");

      const textSpan = document.createElement("span");
      textSpan.textContent = device;

      const toggleButton = document.createElement("div");
      toggleButton.classList.add("toggle-button");
      toggleButton.onclick = function () {
        toggleDevice(currentDeviceIndex, index); // 현재 디바이스 인덱스와 토글되는 디바이스 인덱스를 전달
      };

      if (
        localStorage.getItem(`device${currentDeviceIndex}_${index}`) === "true"
      ) {
        toggleButton.classList.add("active");
      }

      contentDiv.appendChild(textSpan);
      contentDiv.appendChild(toggleButton);
      modalContent.appendChild(contentDiv);
    });
  };

  const toggleDevice = (deviceIndex, index) => {
    const currentState =
      localStorage.getItem(`device${deviceIndex}_${index}`) === "true";
    localStorage.setItem(`device${deviceIndex}_${index}`, `${!currentState}`);
    loadToggles();
  };

  // 각 버튼에 대해 이벤트 리스너 추가하고 인덱스 부여
  btns.forEach((btn, index) => {
    btn.setAttribute("data-index", index);
    btn.onclick = () => {
      currentDeviceIndex = parseInt(btn.getAttribute("data-index")); // 클릭된 버튼의 인덱스를 현재 디바이스 인덱스로 설정
      modal.style.display = "block";
      loadToggles();
    };
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
