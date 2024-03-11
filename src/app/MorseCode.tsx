'use client'

import React, { useState } from 'react'

const MorseCode = () => {
    const [audioCtx, setAudioCtx] = useState<AudioContext | undefined>(undefined)
    const [gainNode, setGainNode] = useState<GainNode | undefined>(undefined)
    const initAudioContext = React.useCallback(() => {
        if (audioCtx !== undefined) return
        const audio = new AudioContext()
        const oscillator = audio.createOscillator()
        oscillator.type = 'square'
        oscillator.frequency.value = 800
        oscillator.start()
        const gain = audio.createGain()
        gain.gain.value = 0.5
        oscillator.connect(gain)
        setGainNode(gain)
        setAudioCtx(audio)
    }, [audioCtx])

    const startAudio = React.useCallback(() => {
        if (audioCtx === undefined || gainNode === undefined) return
        gainNode.connect(audioCtx.destination)
    }, [audioCtx, gainNode])

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
            <div onClick={() => startAudio()}>Start Audio</div>
            <div onClick={() => stopAudio()}>Stop Audio</div>
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
