import { defineConfig, presetAttributify, presetWind } from 'unocss'

export default defineConfig({
    presets: [
        presetWind(),
        presetAttributify()
    ],
    rules: [
        ['font-rounded', { 'font-family': 'Varela Round, sans-serif' }],
        ['bg-shadow', { 'filter': 'drop-shadow(0px 0px 54px #f2ecde66)' }]
    ],
    theme: {
        colors: {
            'slateGray': '#1C1C1C',
            'gainsboro': '#ededef',
            'sliverSand': '#f2ecde',
            'darkBrown': '#4d4030',
            'rosyBrown': '#4f383e'
        }
    }
})