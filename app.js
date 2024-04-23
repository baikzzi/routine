// 루틴 선택 및 최대 하나의 토글만 허용
document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    let activeIndex = localStorage.getItem("activeToggleButtonIndex");

    // 페이지 로딩 시 로컬 스토리지에 저장된 활성화된 토글 버튼 상태 복원
    if (activeIndex !== null) {
        toggleButtons[activeIndex].classList.add("active");
    }

    toggleButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            // 현재 활성화된 버튼의 인덱스를 확인
            const currentlyActiveIndex = localStorage.getItem(
                "activeToggleButtonIndex"
            );

            // 같은 버튼을 다시 클릭하면 비활성화
            if (currentlyActiveIndex === index.toString()) {
                button.classList.remove("active");
                localStorage.removeItem("activeToggleButtonIndex");
            } else {
                // 모든 버튼의 'active' 클래스 제거
                toggleButtons.forEach((btn) => btn.classList.remove("active"));
                // 클릭된 버튼에만 'active' 클래스 추가
                button.classList.add("active");
                // 로컬 스토리지에 활성화된 버튼의 인덱스 저장
                localStorage.setItem("activeToggleButtonIndex", index);
            }
        });
    });
});

// 루틴 수정 화면
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
                localStorage.getItem(`device${currentDeviceIndex}_${index}`) ===
                "true"
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
        localStorage.setItem(
            `device${deviceIndex}_${index}`,
            `${!currentState}`
        );
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
