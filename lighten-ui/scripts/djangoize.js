const fs = require('fs-extra')

const djangoStaticPath = 'static/'
const indexHtmlFile = 'index.html'
const staticDir = __dirname + '/../django/'
const distDir = __dirname + '/../dist/'

// TODO: remove once using with django
fs.mkdirsSync(staticDir)

console.log('copy all files in the bundle to django\'s static directory')
fs.readdirSync(distDir).forEach((file) => {
  // except for index.html
  if (file === indexHtmlFile) return
  fs.copySync(distDir + file, staticDir + file)
})

console.log('prefix paths in index.html to files with django\'s static path')
const contents = ['src="', 'href="'].reduce((acc, str) => {
  return acc.replace(new RegExp(str, 'g'), str + djangoStaticPath)
}, fs.readFileSync(distDir + indexHtmlFile, 'utf8'))

console.log('write the modified index.html file to django\'s static directory')
fs.writeFileSync(staticDir + indexHtmlFile, contents, 'utf8')
