import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import make_lock from 'rosmaro-process-wide-lock'
import make_storage from 'rosmaro-in-memory-storage'
import rosmaro from 'rosmaro'
import make_wizard_graph from './wizard/graph'
import csrf from 'csurf'
import {render_model as render} from 'simple-server-side-rosmaro-forms'

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(csrf({ cookie: true }))
const wizard = rosmaro(make_wizard_graph(), make_storage(), make_lock())

app.get('/', async (req, res) => {
	const rendered_wizard = await render(wizard, req.csrfToken())

	res.send(`<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="utf-8">
	    <title>Example wizard implemented using Rosmaro</title>
	  </head>
	  <body>
			${rendered_wizard}
	    <script>
				const when_form_changed = e => e.target.form.submit()
				document.querySelectorAll(".auto-submit").forEach(
					elem => elem.addEventListener("change", when_form_changed)
				)
			</script>
	  </body>
	</html>`)
})

app.post('/', async (req, res) => {
	await wizard.handle(req)
	res.redirect('/')
})

app.listen(3000, () => console.log('Wizard listening on port 3000!'))
