const express = require('express')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')

const path = require('path')
const app = express()

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.engine('hbs',
  expressHbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs'
  }))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Not Found', formsCSS: true, productsCSS: true, activeAddProduct: true })
})

app.listen(3000)
