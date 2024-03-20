function checkWin () {
    W = 1
    for (let index = 0; index <= 8; index++) {
        L = sPattern.charAt(index)
        if (index == 4) {
            if (L == "1") {
                W = 0
                break;
            } else {
                W = 1
            }
        } else if (L == "0") {
            W = 0
            break;
        } else {
            W = 1
        }
    }
    return W
}
function blink () {
    led.toggle(X, Y)
    basic.pause(100)
}
input.onButtonPressed(Button.B, function () {
    upd = 0
    led.unplot(X, Y)
    X += 2
    K += 1
    if (X > 4) {
        X = 0
        Y += 2
    }
    if (Y > 4) {
        X = 0
        Y = 0
        K = 1
    }
    upd = 1
})
function displayG () {
    I2 = 1
    J2 = 1
    Tab = sPattern.split("")
    for (let value of Tab) {
        if (value == "1") {
            led.plotBrightness(I2, J2, 127)
        }
        I2 += 1
        if (I2 > 3) {
            I2 = 1
            J2 += 1
        }
    }
}
input.onButtonPressed(Button.A, function () {
    upd = 0
    nPattern = ""
    V = list[K - 1]
    for (let index = 0; index <= 8; index++) {
        A = parseFloat(V.charAt(index))
        B = parseFloat(sPattern.charAt(index))
        C = (A + B) % 2
        nPattern = "" + nPattern + convertToText(C)
    }
    sPattern = nPattern
    M += 1
    upd = 1
})
function makePattern () {
    sPattern = ""
    for (let index = 0; index < 9; index++) {
        sPattern = "" + sPattern + convertToText(randint(0, 1))
    }
    return sPattern
}
let M = 0
let C = 0
let B = 0
let A = 0
let V = ""
let nPattern = ""
let Tab: string[] = []
let J2 = 0
let I2 = 0
let upd = 0
let L = ""
let W = 0
let sPattern = ""
let Y = 0
let X = 0
let K = 0
let list: string[] = []
list = [
"110110000",
"111000000",
"011011000",
"100100100",
"010111010",
"001001001",
"000110110",
"000000111",
"000011011"
]
K = 0
X = -2
Y = 0
sPattern = makePattern()
displayG()
basic.forever(function () {
    if (upd == 1) {
        basic.clearScreen()
        displayG()
        if (checkWin() > 0) {
            basic.showIcon(IconNames.Heart)
            basic.pause(1000)
            basic.showNumber(M)
            basic.pause(1000)
        }
        upd = 0
    }
    blink()
})
