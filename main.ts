radio.onReceivedString(function (receivedString) {
    last_seen = radio.receivedPacket(RadioPacketProperty.SerialNumber)
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
})
let last_seen = 0
let have_duck = 0
radio.setTransmitSerialNumber(true)
have_duck = 0
last_seen = 0
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (have_duck) {
        basic.showIcon(IconNames.Duck)
    } else {
        basic.showIcon(IconNames.Square)
    }
})
basic.forever(function () {
    basic.pause(1000)
    if (last_seen == 0) {
        have_duck = 1
    }
})
loops.everyInterval(200, function () {
    radio.setTransmitPower(2)
    radio.sendString("ping")
})
