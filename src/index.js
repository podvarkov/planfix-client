const _ = require('lodash')
const debug = require('debug')('planfix-api')
const Promise = require('bluebird')
const request = Promise.promisify(require('request'))
const xml2js = Promise.promisifyAll(require('xml2js'))
const js2xmlparser = require('js2xmlparser')
const assert = require('assert')
const md5 = require('md5')
const checkErrors = require('./checkErrors')

let BASE_URL = 'https://api.planfix.ru/xml/'

const methods = [
  //auth
  'auth.login',
  //project
  'project.add',
  'project.update',
  'project.get ',
  'project.getList',
  //projectGroup
  'projectGroup.add',
  'projectGroup.update',
  'projectGroup.move',
  'projectGroup.get',
  'projectGroup.getList',
  //tasks
  'task.add',
  'task.update',
  'task.updateCustomData',
  'task.get',
  'task.getMulti',
  'task.getList',
  'task.accept',
  'task.reject',
  'task.changeExpectDate',
  'task.changeStatus',
  'task.getPossibleStatusToChange',
  'task.changeWorkers',
  'task.getFilterList',
  //taskStatus
  'taskStatus.getSetList',
  'taskStatus.getListOfSet',
  //actions
  'action.add',
  'action.update',
  'action.get',
  'action.getList',
  'action.getListByPeriod',
  'action.getListWithAnalitic',
  'action.delete',
  //analytics
  'analitic.getGroupList',
  'analitic.getList',
  'analitic.getOptions',
  'analitic.getHandbook',
  'analitic.getData',
  'analitic.getDataByCondition',
  //userGroup
  'userGroup.add',
  'userGroup.update',
  'userGroup.get',
  'userGroup.getList',
  'userGroup.getHeads',
  //user
  'user.add',
  'user.update',
  'user.get',
  'user.getList',
  'user.updateGroupMembership',
  'user.changeStatus',
  'user.actionsAdded',
  //contacts
  'contact.add',
  'contact.update',
  'contact.updateCustomData',
  'contact.get',
  'contact.getList',
  'contact.managePlanfixAccess',
  'contact.updateUserInfo',
  'contact.updateContractors',
  'contact.getPhoneTypes',
  'contact.getGroupList',
  'contact.delete',
  //file
  'file.upload',
  'file.download',
  'file.get',
  'file.getListForProject',
  'file.getListForTask',
  'file.getListForUser',
  'file.getListForClient',
  'file.getHistory',
  'file.delete',
  //handbook
  'handbook.getGroupList',
  'handbook.getList',
  'handbook.getStructure',
  'handbook.getRecords',
  'handbook.getRecord',
  'handbook.getRecordMulti',
  'handbook.addRecord',
  'handbook.updateRecord',
]

module.exports = function createApiClient(opts) {
  assert(opts.privateKey, 'privateKey param is required')
  assert(opts.apiKey, 'apiKey param is required')
  assert(opts.account, 'account param is required')

  BASE_URL = opts.url || BASE_URL
  let sid = null

  const client = {}
  methods.forEach(function (methodName) {
    _.set(client, methodName, createMethod(methodName))
  })

  function createMethod(methodName) {
    return function apiMethod(params) {
      params = _.extend({ account: opts.account }, params)

      const requestObject = _.extend({
        '@': { method: methodName },
      }, params)

      if (sid) {
        requestObject.sid = sid
        params.sid = sid
      }

      requestObject.signature = sign(methodName, params, opts.privateKey)

      const xmlRequest = js2xmlparser('request', requestObject)
      debug('xml request', xmlRequest)

      return request({
        url: BASE_URL,
        body: xmlRequest,
        auth: {
          user: opts.apiKey,
          password: opts.token || 'x',
        },
      }).then(function (res) {
        debug('xml response', res.body)
        return xml2js.parseStringAsync(res.body, { trim: true, explicitRoot: false, explicitArray: false })
      }).then(function (res) {
        if (res.sid) {
          sid = res.sid
        }

        return res
      }).then(checkErrors)
    }
  }

  return client
}

function sign(methodName, params, key) {
  return md5(methodName + implodeElements(params) + key)
}

function implodeElements(obj) {
  let result = ''
  const keys = Object.keys(obj)
  keys.sort()

  keys.forEach(function (key) {
    switch (true) {
      case Array.isArray(obj[key]):
        result += obj[key].map(implodeElements).join('')
        break

      case typeof obj[key] === 'object':
        result += implodeElements(obj[key])
        break

      default:
        result += obj[key]
    }
  })

  return result
}
