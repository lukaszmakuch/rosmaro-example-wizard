import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import price_service from './price'
import {safeHtml} from 'common-tags'

export default price_service => view(() => ({

  render() {
    const {drink, cooler, extra_sugar} = this.context
    const price = price_service.calculate(this.context)

    return safeHtml`
      Here goes the summary of your order:
      <ul>
        <li>${drink}</li>
        <li>${cooler}</li>
        <li>${extra_sugar ? "extra" : "standard"} amount of sugar</li>
      </ul>
      Price: ${price_service.render(price)}
      <br>
      <input type="submit" name="${this.pname('order')}" value="Place the order">
      <input type="submit" name="${this.pname('change')}" value="Change it">
    `
  },

  handle(params) {
    if (params['order']) return this.follow("ordered")
    if (params['change']) return this.follow("change_order")
  }

}))
