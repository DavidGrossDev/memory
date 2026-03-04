

export function showWinningScreen(winner:string, playTheme:string, winnerSvg:string) {
    return `<section class="winner-screen__header--${playTheme}">
                <p>The winner is</p>
                <h1>${winner} Player</h1>
            </section>
            ${winnerSvg}
            <a class="winner-screen__home-btn winner-screen__home-btn--${playTheme}" href="index.html">
                <p class="winner-screen__home-btn__title--${playTheme}">Home</p>
            </a>`
}