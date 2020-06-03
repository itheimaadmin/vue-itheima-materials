export interface PagelistResponseEntity {
    code: string;
    desc: string;
    data: Data;
}

export interface Data {
    counts: number;
    page: number;
    pagesize: number;
    items: Item[];
}

export interface Item {
    enterpriseId: string;
    enterpriseName: string;
    shopId: string;
    applicant: string;
    phone: string;
    applicationTime: Date;
    expireTime: Date;
    status: string;
    address: string;
    province: string;
    city: string;
    area: string;
}
