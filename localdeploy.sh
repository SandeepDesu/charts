rm -rf dist*
rm -rf dist.tgz
npm run packagr

rm -rf ./node_modules/charts-d3/*
cp -r dist/bundles ./node_modules/charts-d3/
cp -r dist/esm2015 ./node_modules/charts-d3/
cp -r dist/esm5 ./node_modules/charts-d3/
cp -r dist/src ./node_modules/charts-d3/
cp dist/charts-d3.d.ts ./node_modules/charts-d3s/
cp dist/charts-d3.metadata.json ./node_modules/charts-d3/
cp dist/package.json ./node_modules/charts-d3/
cp dist/public_api.d.ts ./node_modules/charts-d3/
cp dist/README.md ./node_modules/charts-d3/