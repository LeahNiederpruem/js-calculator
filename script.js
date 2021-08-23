const calcButtons = document.querySelectorAll(".calcButton");

calcButtons.forEach((button) => {
    button.onclick = () =>  {
        console.log(button.dataset.calcChar)
    }
})