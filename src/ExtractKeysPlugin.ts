class ExtractKeysPlugin {
    static defaultOptions = {
        outputFile: 'assets.md'
    }

    options: { outputFile: string }

    constructor(options = {}) {
        this.options = { ...ExtractKeysPlugin.defaultOptions, ...options }
    }

    apply(compiler: any) {
        const pluginName = ExtractKeysPlugin.name;

        const { webpack } = compiler;

        const { Compilation } = webpack;

        const { RawSource } = webpack.sources;

        compiler.hooks.thisCompilation.tap(pluginName, (compilation: any) => {
            compilation.hooks.processAssets.tap({
                name: pluginName,
                stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
            },
                (assets: any) => {
                    const content = '# In this build:\n\n' +
                        Object.keys(assets).map(filename => `- ${filename}`)
                            .join('\n')
                    compilation.emitAsset(
                        this.options.outputFile,
                        new RawSource(content)
                    )
                }
            )
        })
    }
}

export default ExtractKeysPlugin 