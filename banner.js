// noinspection DuplicatedCode

document.addEventListener('DOMContentLoaded', () => {
    const boardWidth = 60;
    const boardHeight = 8;
    let onePixelMoveMode=false;

    const board = document.getElementById('game-board');
    const colLabels = document.getElementById('col-labels');
    const rowLabels = document.getElementById('row-labels');
    const messageEl = document.getElementById('message');
    const submitButton = document.getElementById('submit-button');
    const undoButton = document.getElementById('undo-button');
    const resetButton = document.getElementById('reset-button');
    const onePixelMoveModeCheckBox = document.getElementById('one-pixel-move-mode');

    let lights = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    ];
    let tz = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, ],
        [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, ],
        [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
        [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
        [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, ],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    ];
    let moves = [];
    let moveCount = 0;
    let labelChars = [];
    let charsToCol={};

    function initColumnLabels() {
        colLabels.innerHTML = '';
        labelChars = [];

        for (let i = 65; i <= 90; i++) {
            labelChars.push(String.fromCharCode(i));
        }

        for (let i = 97; i <= 122; i++) {
            labelChars.push(String.fromCharCode(i));
        }

        for (let i = 0; i <= 7; i++) {
            labelChars.push(i.toString());
        }

        for (let col = 0; col < boardWidth; col++) {
            let index=labelChars[col]
            charsToCol[index]= col;
            const label = document.createElement('div');
            label.classList.add('label');
            label.textContent = labelChars[col];
            colLabels.appendChild(label);
        }
    }

    function initRowLabels() {
        rowLabels.innerHTML = '';
        for (let row = 0; row < boardHeight; row++) {
            const label = document.createElement('div');
            label.classList.add('label');
            label.textContent = row.toString();
            rowLabels.appendChild(label);
        }
    }

    function initBoard() {
        board.innerHTML = '';
        moves = [];
        moveCount = 0;
        updateSubmitButton();

        for (let row = 0; row < boardHeight; row++) {
            for (let col = 0; col < boardWidth; col++) {
                const light = document.createElement('div');
                light.classList.add(
                    'light', 'off',
                    'rounded-sm',
                    'cursor-pointer'
                );
                light.dataset.row = row;
                light.dataset.col = col;
                light.addEventListener('click', pixelClickHandler.bind(null,row,col));
                board.appendChild(light);
            }
        }

        updateBoard();
        messageEl.textContent = '';
        messageEl.classList.add('text-transparent');
        messageEl.classList.remove('text-green-400');
    }

    function pixelClickHandler(row, col){

        if(onePixelMoveMode){
            toggleOnePixel(row, col);
        } else {
            makeMove(row, col);
        }

        updateSubmitButton();
        updateBoard();
        checkBoardMatchesTz();
    }

    function undoButtonClickHandler(){
        if(moves.length===0){
            alert("Нечего отменять");
            return;
        }

        if(onePixelMoveMode){
            for (let i = 0; i < 67; i++) {
                undoMove();
            }
        } else {
            undoMove();
        }

        updateSubmitButton();
        updateBoard();
        checkBoardMatchesTz();
    }

    function resetButtonClickHandler(){
        while (moves.length>0){
            undoMove();
        }
        updateSubmitButton();
        updateBoard();
        checkBoardMatchesTz();
    }

    function updateSubmitButton() {
        if (moveCount === 0) {
            submitButton.textContent = "Я починил";
        } else {
            const clickText = getClickText(moveCount);
            submitButton.textContent = `Я починил за ${moveCount} ${clickText}`;
        }
    }

    function getClickText(count) {
        if (count % 10 === 1 && count % 100 !== 11) {
            return "клик";
        } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            return "клика";
        } else {
            return "кликов";
        }
    }

    /**
     * Выполняет ход внутри данных программы.
     * Не изменяет историю.
     */
    function toggleLightInternal(row, col) {
        for (let c = 0; c < boardWidth; c++) {
            lights[row][c] = !lights[row][c];
        }

        for (let r = 0; r < boardHeight; r++) {
            if (r !== row) {
                lights[r][col] = !lights[r][col];
            }
        }
    }

    /**
     * Делает ход внутри данных программы, без отображения.
     * Изменяет историю ходов
     */
    function makeMove(row, col) {
        const moveNotation = labelChars[col] + row.toString();
        moves.push(moveNotation);
        moveCount++;
        toggleLightInternal(row, col);
    }

    /**
     * Отменяет последний ход внутри данных программы, без отображения.
     * Изменяет историю ходов
     */
    function undoMove() {
        let m=moves.pop();
        moveCount--;
        toggleLightInternal(textToRow(m),textToCol(m));
    }

    /**
     * Переключает 1 пиксель сделав 67 ходов
     */
    function toggleOnePixel(row, col){
        makeMove(row, col);
        for (let i = 0; i < boardWidth; i++) {
            if(i===col)
                continue;
            makeMove(row, i);
        }
        for (let i = 0; i < boardHeight; i++) {
            if(i===row)
                continue;
            makeMove(i, col);
        }
    }

    function updateBoard() {
        const lightElements = board.querySelectorAll('.light');
        for (let row = 0; row < boardHeight; row++) {
            for (let col = 0; col < boardWidth; col++) {
                const index = row * boardWidth + col;
                const light = lightElements[index];

                if (lights[row][col]) {
                    light.classList.add('on');
                    light.classList.remove('off');
                } else {
                    light.classList.add('off');
                    light.classList.remove('on');
                }
            }
        }
    }

    function checkBoardMatchesTz() {
        let matches = true;

        for (let row = 0; row < boardHeight; row++) {
            for (let col = 0; col < boardWidth; col++) {
                if (lights[row][col] != tz[row][col]) {
                    matches = false;
                    break;
                }
            }
            if (!matches) break;
        }

        const lightElements = board.querySelectorAll('.light.on');
        if (matches) {
            lightElements.forEach(light => light.classList.add('bright'));
        } else {
            lightElements.forEach(light => light.classList.remove('bright'));
        }

        return matches;
    }

    const tzButton = document.getElementById('tz-button');
    const tzPopup = document.getElementById('tz-popup');
    const successPopup = document.getElementById('success-popup');
    const errorPopup = document.getElementById('error-popup');
    const popupCloseButtons = document.querySelectorAll('.popup-close');

    tzButton.addEventListener('click', () => {
        tzPopup.style.display = 'flex';
    });

    popupCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            tzPopup.style.display = 'none';
            successPopup.style.display = 'none';
            errorPopup.style.display = 'none';
        });
    });

    [tzPopup, successPopup, errorPopup].forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    });

    undoButton.addEventListener('click',undoButtonClickHandler);
    resetButton.addEventListener('click',resetButtonClickHandler);

    function onePixelMoveModeCheckBoxHandler() {
        onePixelMoveMode=!onePixelMoveMode;

        let light=onePixelMoveModeCheckBox;
        if (light.classList.contains('off')) {
            light.classList.add('on');
            light.classList.remove('off');
        } else {
            light.classList.add('off');
            light.classList.remove('on');
        }
    }

    onePixelMoveModeCheckBox.addEventListener('click',onePixelMoveModeCheckBoxHandler);

    function textToCol(text) {
        let col=charsToCol[text[0]]
        return col;
    }

    function textToRow(text) {
        let row=parseInt(text[1])
        return row;
    }

    submitButton.addEventListener('click', () => {
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                moves: moves
            }),
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    document.getElementById('flag-text').textContent = result.flag;
                    successPopup.style.display = 'flex';
                    createConfetti();
                } else {
                    document.getElementById('error-message').textContent = result.message;
                    errorPopup.style.display = 'flex';
                }
            })
            .catch(error => {
                document.getElementById('error-message').textContent = 'Ошибка соединения: ' + error.message;
                errorPopup.style.display = 'flex';
            });
    });

    function createConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const myConfetti = confetti.create(canvas, { resize: true });

        const colors = ['#10b981', '#3b82f6', '#f9d65d', '#8b5cf6', '#f43f5e'];

        const duration = 5000;
        const interval = 250;
        const totalBursts = 10;

        function launchConfetti(i) {
            if (i >= totalBursts) return;

            setTimeout(() => {
                myConfetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { y: 0, x: Math.random() },
                    colors: colors,
                    gravity: 0.8,
                    scalar: 0.3,
                    ticks: 200,
                    startVelocity: 30,
                    shapes: ['circle', 'square']
                });

                launchConfetti(i + 1);
            }, interval);
        }

        launchConfetti(0);
    }

    initColumnLabels();
    initRowLabels();
    initBoard();
});