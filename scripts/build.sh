pwd
FILES=`node scripts/build.js`
echo "export default $FILES;" > steps/files.js
