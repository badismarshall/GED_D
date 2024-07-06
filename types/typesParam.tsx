export type EmployeParam = {
    params: {id : string}
}


export type INewEmploye = {
    firstname: string
    lastname: string
    rank: string
    registrationNumber: string
    job: string
    phoneNumber: string
    dateOfBridth: Date
    province: string
    address: string
    personalId: string
    healthInsuranceNumber: string
    sex: boolean
    portrait: File[]
    blood: string
}

export type IProvince = {
    id: string
    code: string
    name: string
    ar_name: string
}

export type IBlood = {
    id: string
    lib_fr: string
}

export type IRank = {
    id: string
    lib_fr: string
    lib_ar: string
    abr_fr: string
    abr_ar: string
    category: string
}