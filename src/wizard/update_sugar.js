import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export default view(() => ({

  render() {
    const checked = this.context.extra_sugar
    const label = this.context.drink
      ? `add extra sugar to your ${this.context.drink}`
      : "add extra sugar to your drink"
    return safeHtml`
      <input type="hidden" name="${this.pname('checkbox_action')}" />
      <label>
        <input
          class="auto-submit"
          ${checked ? 'checked' : ''}
          type="checkbox"
          name="${this.pname('extra_sugar')}"
        />
        ${label}
      </label>
    `
  },

  handle(params) {
    const extra_sugar = params['extra_sugar'] == "on"
    this.follow("updated", {...this.context, extra_sugar})
  }

}))
