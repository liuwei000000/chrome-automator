const chrome = require('..')

chrome.action('log', function (msg, pipe) {
  const args = [msg]
  if (pipe) {
    args.push(pipe)
  }
  console.log.apply(console, args)
})
try {
  chrome({ show: true })
  .viewport(1900, 1000)
  .useragent('Mozilla/5.0 Chrome/59.0.3071.115 Mobile Safari/537.36')
  .goto('https://www.baidu.com/')
  .wait('body')
  .url()
  .log('url:')
  .log('start get html')
  .html('fixtures/1.html')
  .insert('input#kw', 'hello world\r')
  .log('capture jpg')
  .screenshot('fixtures/1.jpg')
  .wait('.c-container a')
  .click('.c-container a')
  // .evaluate(() => document.querySelector('.c-container a').href)
  // .pipe(function (url) {
  //   console.log(url)
  //   return chrome().goto(url).viewport(1900, 1000)
  // })
  .wait('[id^="highlighter_"]')
  .log('print webpage')
  .pdf('fixtures/1.pdf')
  .log('capture png')
  .screenshot('fixtures/1.png')
  .evaluate(() => document.querySelectorAll('.para-title.level-3')[9].nextElementSibling.querySelector('.code').textContent)
  .pipe((code) => console.log(code))
  .url()
  .end()
  .then((url) => console.log(url))
} catch (e) {
  console.log(e)
}
