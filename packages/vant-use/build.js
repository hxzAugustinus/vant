const { build } = require('esbuild');

function bundleBundle(format) {
  const outfile = `dist/index.${format}.js`;
  const finish = () => console.log('Build finished:', outfile);
  const onRebuild = (error) => (error ? console.log(error) : finish());

  build({
    watch: process.argv.includes('-w') && { onRebuild },
    format,
    bundle: true,
    target: ['chrome53'],
    outfile,
    external: ['vue'],
    entryPoints: ['./src/index.ts'],
  }).then(finish);
}

bundleBundle('esm');
bundleBundle('cjs');
