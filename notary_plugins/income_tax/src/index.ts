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

export function parseTaxDepositedResp() {
  const bodyString = Host.inputString()
  const params = JSON.parse(bodyString)

  if (params.lastThreeYearsReturn && Array.isArray(params.lastThreeYearsReturn)) {
    const revealed = params.lastThreeYearsReturn.map((entry) => {
      const taxDeposited = `"TaxDeposited":"${entry.TaxDeposited}"`
      const selectionStart = bodyString.indexOf(taxDeposited)
      const selectionEnd = selectionStart + taxDeposited.length

      return [bodyString.substring(0, selectionStart), bodyString.substring(selectionEnd, bodyString.length)]
    })

    // Output the revealed TaxDeposited data
    Host.outputString(JSON.stringify(revealed))
  } else {
    Host.outputString(JSON.stringify(false))
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
      getSecretResponse: 'parseTaxDepositedResp',
    }

    console.log('Request Data:', JSON.stringify(requestData, null, 2))

    const id = notarize(requestData)
    outputJSON(id)
  }
}
