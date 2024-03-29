'use client'

import React, { useState } from 'react'

const MorseCode = () => {
    const [audioCtx, setAudioCtx] = useState<AudioContext | undefined>(undefined)
    const [gainNode, setGainNode] = useState<GainNode | undefined>(undefined)

    // used to create the AudioContext and the GainNode
    // which is used to make the tone play when the button is pressed
    const initAudioContext = React.useCallback(() => {
        if (audioCtx !== undefined) return
        const audio = new AudioContext()
        const oscillator = audio.createOscillator()
        oscillator.type = 'square'
        oscillator.frequency.value = 800
        oscillator.start()
        const gain = audio.createGain()
        gain.gain.value = 0.2
        oscillator.connect(gain)
        setGainNode(gain)
        setAudioCtx(audio)
    }, [audioCtx])

    // start the tone
    const startAudio = React.useCallback(() => {
        if (audioCtx === undefined || gainNode === undefined) return
        gainNode.connect(audioCtx.destination)
    }, [audioCtx, gainNode])

    // stop the tone
    const stopAudio = React.useCallback(() => {
        if (audioCtx === undefined || gainNode === undefined) return
        gainNode.disconnect(audioCtx.destination)
    }, [audioCtx, gainNode])


    // Initial Screen
    if (audioCtx === undefined) {
        return (
            <div onClick={initAudioContext}>
                <div>Start</div>
            </div>
        )
    }

    return (
        <div>
            Morse code app goes here.
        </div>
    )
}

const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
]

const morseCode = [
    '•-',
    '-•••',
    '-•-•',
    '-••',
    '•',
    '••-•',
    '--•',
    '••••',
    '••',
    '•---',
    '-•-',
    '•-••',
    '--',
    '-•',
    '---',
    '•--•',
    '--•-',
    '•-•',
    '•••',
    '-',
    '••-',
    '•••-',
    '•--',
    '-••-',
    '-•--',
    '--••',
    '-----',
    '•----',
    '••---',
    '•••--',
    '••••-',
    '•••••',
    '-••••',
    '--•••',
    '---••',
    '----•'
]

export default MorseCode
