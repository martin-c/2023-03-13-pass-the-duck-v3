radio.onReceivedString(function (receivedString) {
    last_seen = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (player_list.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber)) == -1) {
        player_list.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
    }
})
input.onGesture(Gesture.Shake, function () {
    if (have_duck) {
        radio.setTransmitPower(6)
        radio.sendValue("send_duck", last_seen)
        have_duck = 0
    }
})
radio.onReceivedValue(function (name, value) {
    if (value == control.deviceSerialNumber()) {
        have_duck = 1
    } else {
        have_duck = 0
    }
    if (duck_list.indexOf(value) == -1) {
        duck_list.push(value)
    }
})
let player_list: number[] = []
let duck_list: number[] = []
let last_seen = 0
let have_duck = 0
radio.setTransmitSerialNumber(true)
have_duck = 0
last_seen = 0
duck_list = []
player_list = [control.deviceSerialNumber()]
radio.sendString("ping")
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    basic.pause(1000)
    if (last_seen == 0) {
        have_duck = 1
    } else if (player_list.length > 1) {
        if (player_list.length == duck_list.length) {
            game.setScore(duck_list.length)
            game.gameOver()
        }
    }
})
basic.forever(function () {
    if (have_duck) {
        basic.showIcon(IconNames.Duck)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
loops.everyInterval(200, function () {
    radio.setTransmitPower(2)
    radio.sendString("ping")
})
