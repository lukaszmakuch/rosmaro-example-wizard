import fs from 'fs-promise'
import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export default view(() => ({

  render() {
    return safeHtml`
      Enter the promo code below:<br>
      <input type="text" name="${this.pname('code')}" />
      <input type="submit" name="${this.pname('check')}" value="Check" />
      <input type="submit" name="${this.pname('skip')}" value="Skip" />
    `
  },

  async handle(params) {
    if (params['skip']) return this.follow("skipped")

    const code = await fs.readFile(__dirname + "/../secret_code", {encoding: 'utf8'})
    const correct_promo_code = code == params['code']
    const arrow = correct_promo_code ? "ok" : "wrong"
    this.follow(arrow, {correct_promo_code})
  }

}))
