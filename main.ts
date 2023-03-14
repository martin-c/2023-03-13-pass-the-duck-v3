radio.onReceivedString(function (receivedString) {
    if (game_state == "scan") {
        if (player_list.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber)) == -1) {
            player_list.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
        }
    } else if (game_state == "play") {
        last_seen = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    } else if (game_state == "have_duck") {
    	
    } else if (game_state == "finished") {
    	
    } else {
    	
    }
})
input.onGesture(Gesture.Shake, function () {
    if (game_state == "have_duck") {
        radio.sendValue("send_duck", last_seen)
        game_state = "play"
    }
})
radio.onReceivedValue(function (name, value) {
    if (value == control.deviceSerialNumber()) {
        game_state = "have_duck"
    } else {
        game_state = "play"
        if (duck_list.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber)) == -1) {
            duck_list.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
        }
    }
})
let duck_list: number[] = []
let player_list: number[] = []
let last_seen = 0
let game_state = ""
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(6)
game_state = "scan"
let scan_count = 20
last_seen = 0
player_list = []
duck_list = []
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (game_state == "scan") {
        basic.showIcon(IconNames.Diamond)
    } else if (game_state == "play") {
        basic.showIcon(IconNames.Square)
    } else if (game_state == "have_duck") {
        basic.showIcon(IconNames.Duck)
    } else if (game_state == "finished") {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.No)
    }
})
basic.forever(function () {
    basic.pause(100)
    if (game_state == "scan") {
        scan_count += -1
        if (scan_count == 0) {
            radio.sendValue("send_duck", last_seen)
        }
    } else if (game_state == "play") {
    	
    } else if (game_state == "have_duck") {
    	
    } else if (game_state == "finished") {
    	
    } else {
    	
    }
})
loops.everyInterval(200, function () {
    if (game_state == "scan") {
        radio.sendString("ping")
    } else {
        radio.setTransmitPower(2)
        radio.sendString("ping")
        radio.setTransmitPower(6)
    }
})
