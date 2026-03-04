import '../styles/style.scss';

const daProjectsThemeBtnRef = document.getElementById('theme_da_projects') as HTMLButtonElement;
const foodsThemeBtnRef = document.getElementById('theme_foods') as HTMLButtonElement;
const bluePlayerBtnRef = document.getElementById('player_blue') as HTMLButtonElement;
const orangePlayerBtnRef = document.getElementById('player_orange') as HTMLButtonElement;
const boardSizeSmallBtnRef = document.getElementById('board_size_16') as HTMLButtonElement;
const boardSizeMediumBtnRef = document.getElementById('board_size_24') as HTMLButtonElement;
const boardSizeBigBtnRef = document.getElementById('board_size_36') as HTMLButtonElement;
const noPlayerSvgRef = document.getElementById('no_player_svg') as HTMLElement;
const chosenPlayerSvgRef = document.getElementById('chosen_player_svg') as HTMLElement;
const noBoardSvgRef = document.getElementById('no_board_svg') as HTMLElement;
const chosenBoardSvgRef = document.getElementById('chosen_board_svg') as HTMLElement;
const visualChosenThemeRef = document.getElementById('visual_chose_theme') as HTMLElement;
const visualChosenPlayerRef = document.getElementById('visual_chose_player') as HTMLElement;
const visualChosenBoardRef = document.getElementById('visual_chosen_board') as HTMLElement;
const startGameBtnRef = document.getElementById('start_game_btn') as HTMLButtonElement;

type Theme = "da_projects" | "foods";
type PlayerID = "orange" | "blue";
type PlaySize = 16 | 24 | 36;

daProjectsThemeBtnRef?.addEventListener('click', () => {
    daProjectsThemeBtnRef.classList.add('chosen');
    foodsThemeBtnRef.classList.remove('chosen');
    choseTheme("da_projects");

})

foodsThemeBtnRef?.addEventListener('click', () => {
    daProjectsThemeBtnRef.classList.remove('chosen');
    foodsThemeBtnRef.classList.add('chosen');
    choseTheme("foods");

})

bluePlayerBtnRef?.addEventListener('click', () => {
    bluePlayerBtnRef.classList.add('chosen');
    orangePlayerBtnRef.classList.remove('chosen');
    visualChosenPlayerRef.innerText = "Blue";
    noPlayerSvgRef.classList.add('d_none');
    chosenPlayerSvgRef.classList.remove('d_none');
})

orangePlayerBtnRef?.addEventListener('click', () => {
    bluePlayerBtnRef.classList.remove('chosen');
    orangePlayerBtnRef.classList.add('chosen');
    visualChosenPlayerRef.innerText = "Orange";
    noPlayerSvgRef.classList.add('d_none');
    chosenPlayerSvgRef.classList.remove('d_none');
})

boardSizeSmallBtnRef?.addEventListener('click', () => {
    boardSizeSmallBtnRef.classList.add('chosen');
    boardSizeMediumBtnRef.classList.remove('chosen');
    boardSizeBigBtnRef.classList.remove('chosen');
    visualChosenBoardRef.innerText = "16";
    noBoardSvgRef.classList.add('d_none');
    chosenBoardSvgRef.classList.remove('d_none');
})

boardSizeMediumBtnRef?.addEventListener('click', () => {
    boardSizeSmallBtnRef.classList.remove('chosen');
    boardSizeMediumBtnRef.classList.add('chosen');
    boardSizeBigBtnRef.classList.remove('chosen');
    visualChosenBoardRef.innerText = "24";
    noBoardSvgRef.classList.add('d_none');
    chosenBoardSvgRef.classList.remove('d_none');
})

boardSizeBigBtnRef?.addEventListener('click', () => {
    boardSizeSmallBtnRef.classList.remove('chosen');
    boardSizeMediumBtnRef.classList.remove('chosen');
    boardSizeBigBtnRef.classList.add('chosen');
    visualChosenBoardRef.innerText = "36";
    noBoardSvgRef.classList.add('d_none');
    chosenBoardSvgRef.classList.remove('d_none');
})

startGameBtnRef?.addEventListener('click', () => {
    startGame();
})

function startGame() {
    let chosenTheme: Theme = visualChosenThemeRef.innerText.toLowerCase() as Theme;
    let chosenPlayer: PlayerID = visualChosenPlayerRef.innerText.toLowerCase() as PlayerID;
    let chosenBoard: PlaySize = Number(visualChosenBoardRef.innerText) as PlaySize;
    if (chosenPlayer && chosenBoard) {
        window.location.href = `/game.html?theme=${chosenTheme}&player=${chosenPlayer}&board=${chosenBoard}`;
    }
}

function choseTheme(theme: string) {
    updateSettingsDisplay(theme);
    if (theme == "da_projects") {
        visualChosenThemeRef.innerText = "Da_Projects";
    } else {
        visualChosenThemeRef.innerText = "Foods";
    }
}

function updateSettingsDisplay(theme: string) {
    let themeImgRef = document.getElementById('theme_img') as HTMLImageElement;
    themeImgRef.src = `/assets/img/${theme}_theme/${theme}-example.png`;
}