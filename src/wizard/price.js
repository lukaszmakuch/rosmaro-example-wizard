import {safeHtml} from 'common-tags'

const prices = {
  tea: 2.50,
  coffee: 3.00,
  lemonade: 1.20
}

const discount = 0.1

const regular_price_service = {
  calculate(order_context) {
    return prices[order_context.drink]
  },
  render(price) {
    return safeHtml`Regular price: ${price}`
  }
}

const promo_price_service = {
  calculate(order_context) {
    const original_price = prices[order_context.drink]
    const discount_value = original_price * discount
    return {
      price: original_price - discount_value,
      original_price,
      discount_value
    }
  },
  render(price_desc) {
    return safeHtml`
      Just ${price_desc.price} instead of ${price_desc.original_price}!
      Saving ${price_desc.discount_value}!
    `
  }
}

export {regular_price_service, promo_price_service}
