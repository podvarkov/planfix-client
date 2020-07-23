declare type PlanfixError = {
  statusCode: string
  code: string
  message: string
  description: string
}

declare type PlanfixParams = {
  [key: string]: any
}

declare type PlanfixResponse = {
  [key: string]: any
}

declare type PlanfixMethod = (params?: PlanfixParams) => Promise<PlanfixResponse>

declare type PlanfixClientOptions = {
  account: string
  privateKey: string
  apiKey: string
  url?: string
  token?: string
}

declare type PlanfixClient = {
  auth: { login: PlanfixMethod }
  project: {
    add: PlanfixMethod
    update: PlanfixMethod
    get: PlanfixMethod
    getList: PlanfixMethod
  }
  projectGroup: {
    add: PlanfixMethod
    update: PlanfixMethod
    move: PlanfixMethod
    get: PlanfixMethod
    getList: PlanfixMethod
  }
  task: {
    add: PlanfixMethod
    update: PlanfixMethod
    updateCustomData: PlanfixMethod
    get: PlanfixMethod
    getMulti: PlanfixMethod
    getList: PlanfixMethod
    accept: PlanfixMethod
    reject: PlanfixMethod
    changeExpectDate: PlanfixMethod
    changeStatus: PlanfixMethod
    getPossibleStatusToChange: PlanfixMethod
    changeWorkers: PlanfixMethod
    getFilterList: PlanfixMethod
  }
  taskStatus: {
    getSetList: PlanfixMethod
    getListOfSet: PlanfixMethod
  }
  action: {
    add: PlanfixMethod
    update: PlanfixMethod
    get: PlanfixMethod
    getList: PlanfixMethod
    getListByPeriod: PlanfixMethod
    getListWithAnalitic: PlanfixMethod
    delete: PlanfixMethod
  }
  analitic: {
    getGroupList: PlanfixMethod
    getList: PlanfixMethod
    getOptions: PlanfixMethod
    getHandbook: PlanfixMethod
    getData: PlanfixMethod
    getDataByCondition: PlanfixMethod
  }
  userGroup: {
    add: PlanfixMethod
    update: PlanfixMethod
    get: PlanfixMethod
    getList: PlanfixMethod
    getHeads: PlanfixMethod
  }
  user: {
    add: PlanfixMethod
    update: PlanfixMethod
    get: PlanfixMethod
    getList: PlanfixMethod
    updateGroupMembership: PlanfixMethod
    changeStatus: PlanfixMethod
    actionsAdded: PlanfixMethod
  }
  contact: {
    add: PlanfixMethod
    update: PlanfixMethod
    updateCustomData: PlanfixMethod
    get: PlanfixMethod
    getList: PlanfixMethod
    managePlanfixAccess: PlanfixMethod
    updateUserInfo: PlanfixMethod
    updateContractors: PlanfixMethod
    getPhoneTypes: PlanfixMethod
    getGroupList: PlanfixMethod
    delete: PlanfixMethod
  }
  file: {
    upload: PlanfixMethod
    download: PlanfixMethod
    get: PlanfixMethod
    getListForProject: PlanfixMethod
    getListForTask: PlanfixMethod
    getListForUser: PlanfixMethod
    getListForClient: PlanfixMethod
    getHistory: PlanfixMethod
    delete: PlanfixMethod
  }
  handbook: {
    getGroupList: PlanfixMethod
    getList: PlanfixMethod
    getStructure: PlanfixMethod
    getRecords: PlanfixMethod
    getRecord: PlanfixMethod
    getRecordMulti: PlanfixMethod
    addRecord: PlanfixMethod
    updateRecord: PlanfixMethod
  }
}

declare const factory: (opts: PlanfixClientOptions) => PlanfixClient

export = factory


