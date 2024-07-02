window.onload = function () {
    const savedTermList = JSON.parse(localStorage.getItem('termList'));
    if (savedTermList) { // 저장된 용어 목록이 있으면 화면에 표시
        for (let i = 0; i < savedTermList.length; i++) {
            console.log(savedTermList[i]);
            addTerm(savedTermList[i]);
        }
    }

    // 용어 입력 필드와 추가 버튼을 선택
    const termInput = document.querySelector("#TermInput");
    const addBtn = document.querySelector("#addBtn");
    // 추가 버튼 클릭 시 용어를 추가하는 이벤트 리스너 등록
    addBtn.addEventListener("click", function () {
        if (termInput.value != "") addTerm();
    });
}

function saveItems() {    // 로컬 스토리지에 데이터 저장
    const saveItems = []; // 빈 배열 할당
    const listArea = document.querySelector(".listArea"); // 용어 목록이 표시될 영역 선택
    for (let node of listArea.children) {                 // 용어 목록의 각 항목을 순회하며 배열에 저장
        const textNode = node.querySelector('span');
        const termObj = {
            term: textNode.textContent,
            check: textNode.classList.contains('check')
        };
        saveItems.push(termObj);
    }
    console.log(JSON.stringify(saveItems));

    localStorage.setItem('termList', JSON.stringify(saveItems));
}

function addTerm(savedTerm) { // 새로운 용어 항목 추가
    const termInput = document.querySelector("#TermInput");
    if (savedTerm) {
        console.log(savedTerm);
    } else {
        console.log(termInput.value);
    }

    const listArea = document.querySelector(".listArea"); // 용어 목록이 표시될 영역 선택

    // 새로운 용어 항목을 구성할 DOM 요소 생성
    const liNode = document.createElement("li");
    const checkBtn = document.createElement("button");
    const termText = document.createElement("span");
    const delBtn = document.createElement("button");

    // 생성한 요소들을 liNode에 추가
    liNode.appendChild(checkBtn);
    liNode.appendChild(termText);
    liNode.appendChild(delBtn);
    listArea.appendChild(liNode);

    // 저장된 용어 항목이 있으면 해당 내용 사용, 없으면 입력 필드 값 사용
    if (savedTerm) {
        termText.innerText = savedTerm.term;
        if (savedTerm.check) {
            termText.classList.add("check");
        }
    } else {
        termText.innerText = termInput.value;
        termInput.value = "";
    }

    delBtn.innerText = "X"; // 삭제 버튼에 텍스트 추가

    // 클래스 추가
    checkBtn.classList.add("checkBtn");
    termText.classList.add("termText");
    delBtn.classList.add("delBtn");

    saveItems(); // 용어 목록 저장




    // 체크 버튼 클릭 이벤트
    checkBtn.addEventListener("click", function () {
        if (checkBtn.innerHTML == "") {
            checkBtn.innerHTML = "✔";
        } else {
            checkBtn.innerHTML = "";
        }
        termText.classList.toggle("check");
        saveItems();
    });

    // 삭제 버튼 클릭 이벤트
    delBtn.addEventListener("click", function () {
        liNode.remove();
        saveItems();
    });

    console.log(listArea.lastChild);
}
