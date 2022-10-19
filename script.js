// Position Size Elements
let accountSizeElm = document.querySelector("#accountSize")

let riskPercentageElm = document.querySelector("#riskPercentage")

let stopLossElm = document.querySelector("#stopLoss")

let calcButton = document.querySelector("#calcPositionBtn")

let resultPosition = document.querySelector("#resultPosition")

let resultRisk = document.querySelector("#resultRisk")

let rewardOne = document.querySelector("#ratio1")

let rewardTwo = document.querySelector("#ratio2")

// Losing Streak Elements
let numOfTradesElm = document.querySelector("#numOfTrades")

let winRateElm = document.querySelector("#winRate")

let calcLosingBtn = document.querySelector("#calcLosingStreakBtn")

let losingStreakElm = document.querySelector("#losingStreakResult")

//General Variables
let currentDiv = "Position Size Calculator"
let switchButton = document.querySelector("#switch")
let positionSizeDiv = document.querySelector("#positionSizeCalculator")
let losingStreakDiv = document.querySelector("#losingStreakCalculator")
let t1 = gsap.timeline({defaults: {duration: 1, ease: "power4.out"}})
let t2 = gsap.timeline({defaults: {duration: 1, ease: "power4.out"}})
active = false

calcButton.addEventListener("click", function(){
    let accountSize = accountSizeElm.value.replace("$", '');

    let riskPercentage = parseFloat(riskPercentageElm.value.replace('%', '')) / 100

    let RPT = (accountSize * riskPercentage).toFixed(2)

    let stopLoss = parseFloat(stopLossElm.value) / 100

    let positionSize = (RPT / stopLoss).toFixed(2)

    resultPosition.textContent = `Position Size: $${positionSize}`
    
    resultRisk.textContent = `Risk Amount: $${RPT}`

    ratioResult1 = (parseFloat(stopLossElm.value) * 2).toFixed(2)

    ratioResult2 = (parseFloat(stopLossElm.value) * 3).toFixed(2)

    rewardOne.textContent = `1:2 ratio profit: ${ratioResult1}%`

    rewardTwo.textContent = `1:3 ratio profit: ${ratioResult2}%`
})

calcLosingBtn.addEventListener("click", function(){
    let numOfTrades = parseInt(numOfTradesElm.value)

    let winRate = 1 - parseFloat(winRateElm.value.replace("%", '')) / 100

    let LosingStreak = Math.round(Math.abs(Math.log(numOfTrades)/Math.log(winRate)))

    losingStreakElm.textContent = `The longest likely losing streak is ${LosingStreak} losses in a row`
})


switchButton.addEventListener("click", function(){

    if (!active){

        active = true

        if (currentDiv == "Position Size Calculator"){

            let tl = gsap.timeline({defaults: {duration: 1, ease: "power4.out"}})
    
            losingStreakDiv.style.display = "flex"
    
            tl.fromTo('#positionSizeCalculator', {opacity:1},{opacity:0, x:-500, onComplete: disablePositionCalc})
    
            tl.fromTo('#losingStreakCalculator', {opacity:0, x:600},{opacity:1, x:0,}, "<0.01%")
    
            currentDiv = "Losing Streak Calculator"
    
            
            
        }
    
        else{

            let t2 = gsap.timeline({defaults: {duration: 1, ease: "power4.out"}})
    
            positionSizeDiv.style.display = "flex"
    
            t2.fromTo('#losingStreakCalculator', {opacity:1},{opacity:0, x:500, onComplete: disableLosingCalc})
    
            t2.fromTo('#positionSizeCalculator', {opacity:0, x:-600},{opacity:1, x:0}, "<0.01%")
    
            currentDiv = "Position Size Calculator"
        }

    }
})

function disablePositionCalc(){
    active = false
    positionSizeDiv.style.display = "none"
    accountSizeElm.value = ''
    riskPercentageElm.value = ''
    stopLossElm.value = ''
    rewardOne.textContent = ''
    rewardTwo.textContent = ''
    resultPosition.textContent = ''
    resultRisk.textContent = ''
    resultRisk.textContent = ''
}

function disableLosingCalc(){
    active = false
    losingStreakDiv.style.display = "none"
    losingStreakElm.textContent = ''
    numOfTradesElm.value = ''
    winRateElm.value = ''
    numOfTradesElm.value = ''
    winRateElm.value = ''
}