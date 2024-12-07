import icon from '../assets/icon.png'
import config_json from '../config.json'
import { redirect, notarize, outputJSON, getCookiesByHost } from './utils/hf.js'

export function config() {
  outputJSON({
    ...config_json,
    icon: icon,
  })
}

function isValidHost(urlString: string) {
  const url = new URL(urlString)
  return url.hostname === 'eportal.incometax.gov.in'
}

/**
 * Redirect to income tax portal
 */
export function start() {
  if (!isValidHost(Config.get('tabUrl'))) {
    redirect('https://eportal.incometax.gov.in')
    outputJSON(false)
    return
  }
  outputJSON(true)
}

/**
 * Collect credentials
 */
export function two() {
  const cookies = getCookiesByHost('eportal.incometax.gov.in')

  if (!cookies.AuthToken || !cookies.dtCookie) {
    outputJSON(false)
    return
  }

  console.log(`cookies: ${JSON.stringify(cookies, null, 2)}`)

  const cookieHeader = `AuthToken=${cookies.AuthToken}; dtCookie=${cookies.dtCookie};`
  console.log(`cookieHeader: ${cookieHeader}`)

  outputJSON({
    url: 'https://eportal.incometax.gov.in/iec/itrweb/auth/v0.1/returns/previous',
    method: 'POST',
    headers: {
      Cookie: cookieHeader,
      Connection: 'close',
      'Content-Type': 'application/json',
    },
    secretHeaders: [`cookie: ${cookieHeader}`],
    body: {
      pan: 'BMHPJ9991B',
    },
  })
}

export function parseResponse() {
  console.log('Reached here #1')
  const bodyString = Host.inputString()
  const params = JSON.parse(bodyString)

  if (params.lastThreeYearsReturn) {
    outputJSON(bodyString)
  } else {
    outputJSON(false)
  }
}

/**
 * Notarize
 */
export function three() {
  const params = JSON.parse(Host.inputString())

  if (!params) {
    outputJSON(false)
  } else {
    const requestData = {
      ...params,
      getSecretResponse: 'parseResponse',
    }

    console.log('Request Data:', JSON.stringify(requestData, null, 2))

    const id = notarize(requestData)
    outputJSON(id)
  }
}
