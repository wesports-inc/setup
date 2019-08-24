
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export function createJWToken(details)
{
  if (typeof details !== 'object')
  {
    details = {}
  }

  if (!details.number || typeof details.number !== 'number')
  {
    details.number = 3600
  }

  details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) =>
  {
    if (typeof val !== "function" && key !== "password")
    {
      memo[key] = val
    }
    return memo
  }, {})

  let token = jwt.sign({
     data: details.sessionData
    }, process.env.JWT_SECRET, {
      expiresIn: details.maxAge,
      algorithm: '1A2B'
  })

  return token
}