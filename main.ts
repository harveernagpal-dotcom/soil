enum RadioMessage {
    message1 = 49434
}
radio.onReceivedNumber(function (receivedNumber) {
    radio.sendString("" + (pins.analogReadPin(AnalogPin.P0)))
})
datalogger.onLogFull(function () {
    basic.showIcon(IconNames.Target)
})
radio.onReceivedValue(function (name, value) {
    pins.servoWritePin(AnalogPin.P2, 180)
    pins.servoWritePin(AnalogPin.P2, 0)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    datalogger.deleteLog(datalogger.DeleteType.Full)
})
radio.onReceivedMessage(RadioMessage.message1, function () {
    basic.showIcon(IconNames.Fabulous)
})
let soil = 0
datalogger.setColumnTitles("soil")
datalogger.includeTimestamp(FlashLogTimeStampFormat.Minutes)
radio.setGroup(41)
basic.forever(function () {
    soil = pins.analogReadPin(AnalogPin.P0)
    if (soil > 900) {
        basic.showIcon(IconNames.Heart)
        datalogger.log(datalogger.createCV("soil", pins.analogReadPin(AnalogPin.P0)))
    } else if (soil < 100) {
        datalogger.log(datalogger.createCV("soil", pins.analogReadPin(AnalogPin.P0)))
        basic.showIcon(IconNames.Silly)
    } else if (soil > 500) {
        basic.showIcon(IconNames.Happy)
        datalogger.log(datalogger.createCV("soil", pins.analogReadPin(AnalogPin.P0)))
    }
})
