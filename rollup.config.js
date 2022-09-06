import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
    // The file which will be taken by rollup
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: true
        }
    ],
    plugins: [typescript({ objectHashIgnoreUnknownHack: true })],
    external: ['react', 'react-dom']
}
